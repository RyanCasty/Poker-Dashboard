import React, { useEffect, useState } from 'react';
import './home.css';
import AreaChart from '../../common/AreaChart/AreaChart';
import Table from '../../common/Table/Table';
import axios from 'axios';

function Dashboard({ userId }) {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [lastTenGames, setLastTenGames] = useState([]);
  const [averageWinnings, setAverageWinnings] = useState(0);
  const [averageBuyIns, setAverageBuyIns] = useState(0);
  const [biggestWin, setBiggestWin] = useState(0);
  const [biggestLoss, setBiggestLoss] = useState(0);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/games`, {
          params: { userId },
        });
        let gamesData = response.data;
  
        gamesData.sort((a, b) => new Date(a.date) - new Date(b.date));
  
        setGames(gamesData);
  
        let cumulativeEarnings = 0;
        let totalWinnings = 0;
        let totalBuyIns = 0;
        let maxWin = Number.NEGATIVE_INFINITY;
        let maxLoss = Number.POSITIVE_INFINITY;
  
        const chartData = gamesData.map((game) => {
          const netEarnings = game.cashOut - game.buyIn;
          cumulativeEarnings += netEarnings;
          totalWinnings += game.cashOut;
          totalBuyIns += game.buyIn;
  
          if (netEarnings > maxWin) {
            maxWin = netEarnings;
          }
          if (netEarnings < maxLoss) {
            maxLoss = netEarnings;
          }
  
          return {
            name: formatDate(game.date),
            uv: cumulativeEarnings,
          };
        });
  
        setData(chartData);
        setBiggestWin(maxWin);
        setBiggestLoss(maxLoss);
  
        const total = gamesData.reduce((acc, game) => acc + (game.cashOut - game.buyIn), 0);
  
        setTotalEarnings(total);
  
        const averageWinningsCalc = totalWinnings / gamesData.length;
        const averageBuyInsCalc = totalBuyIns / gamesData.length;
  
        setAverageWinnings(averageWinningsCalc);
        setAverageBuyIns(averageBuyInsCalc);
  
        const lastGames = gamesData.slice(-10);
        setLastTenGames(lastGames);
  
      } catch (error) {
        console.error('Error fetching games:', error);
        setError(error.message);
      }
    };
  
    fetchGames();
  }, [userId]);

  // Define the columns for the table
  const columns = React.useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date', // accessor is the "key" in the data
      },
      {
        Header: 'Buy-In',
        accessor: 'buyIn',
      },
      {
        Header: 'Cash Out',
        accessor: 'cashOut',
      },
      {
        Header: 'Net Earnings',
        accessor: 'netEarnings',
      },
    ],
    []
  );

  // Prepare the data for the table
  const tableData = React.useMemo(
    () =>
      lastTenGames.map((game) => ({
        date: formatDate(game.date),
        buyIn: `$${game.buyIn.toFixed(2)}`,
        cashOut: `$${game.cashOut.toFixed(2)}`,
        netEarnings: `$${(game.cashOut - game.buyIn).toFixed(2)}`,
      })),
    [lastTenGames]
  );

  return (
    <div className="dashboard-container">
      {error && <p className="error">Error: {error}</p>}

      <div className="total-earnings">
        <h2>Total Earnings: ${totalEarnings.toFixed(2)}</h2>
      </div>

      <div className="average-stats">
        <h3>Average Winnings: ${averageWinnings.toFixed(2)}</h3>
        <h3>Average Buy-Ins: ${averageBuyIns.toFixed(2)}</h3>
      </div>

      <div className="biggest-stats">
        <h3>Biggest Win: ${biggestWin.toFixed(2)}</h3>
        <h3>Biggest Loss: ${biggestLoss.toFixed(2)}</h3>
      </div>

      <div className="last-games">
        <h3>Last 10 Games:</h3>
        {lastTenGames.length > 0 ? (
          <Table columns={columns} data={tableData} />
        ) : (
          <p>No games available.</p>
        )}
      </div>

      <div className="chart-container">
        <AreaChart data={data} />
      </div>
    </div>
  );
}

export default Dashboard;
