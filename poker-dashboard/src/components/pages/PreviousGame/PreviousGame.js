import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '../../common/Table/Table';

const PreviousGame = ({ userId }) => {
  const [games, setGames] = useState([]);
  const [selectedGames, setSelectedGames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/games`, {
          params: { userId },
        });
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching games:', error);
        setError(error.message);
      }
    };

    fetchGames();
  }, [userId]);

  const handleCheckboxChange = (gameId) => {
    setSelectedGames((prevSelected) =>
      prevSelected.includes(gameId)
        ? prevSelected.filter((id) => id !== gameId)
        : [...prevSelected, gameId]
    );
  };

  const handleDeleteGames = async () => {
    try {
      await Promise.all(
        selectedGames.map((gameId) =>
          axios.delete(`http://localhost:5001/api/games/delete/${gameId}`)
        )
      );
      setGames((prevGames) =>
        prevGames.filter((game) => !selectedGames.includes(game._id))
      );
      setSelectedGames([]);
    } catch (error) {
      console.error('Error deleting games:', error);
      setError('Failed to delete selected games');
    }
  };

  // Define the columns for the MyTable component
  const columns = React.useMemo(
    () => [
      {
        Header: 'Select',
        accessor: 'select',
        Cell: ({ row }) => (
          <input
            type="checkbox"
            checked={selectedGames.includes(row.original._id)}
            onChange={() => handleCheckboxChange(row.original._id)}
          />
        ),
        id: 'select',
        disableSortBy: true,
      },
      {
        Header: 'Date',
        accessor: 'date',
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: 'Buy-In',
        accessor: 'buyIn',
        Cell: ({ value }) => `$${value.toFixed(2)}`,
      },
      {
        Header: 'Cash-Out',
        accessor: 'cashOut',
        Cell: ({ value }) => `$${value.toFixed(2)}`,
      },
      {
        Header: 'Net Profit',
        accessor: 'netEarnings',
        Cell: ({ row }) => {
          const profit = row.original.cashOut - row.original.buyIn;
          const formattedProfit = profit >= 0 ? `+$${profit.toFixed(2)}` : `-$${Math.abs(profit).toFixed(2)}`;
          return <span>{formattedProfit}</span>;
        },
      },
    ],
    [selectedGames] // Recompute columns if selectedGames changes
  );

  // Transform games data to fit MyTable format
  const data = React.useMemo(() => {
    return games.map((game) => ({
      _id: game._id,
      date: game.date,
      buyIn: game.buyIn,
      cashOut: game.cashOut,
      netEarnings: game.cashOut - game.buyIn,
    }));
  }, [games]);

  return (
    <div>
      <h1>Previous Poker Games for {userId}</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <button onClick={handleDeleteGames} disabled={selectedGames.length === 0}>
        Delete Selected Games
      </button>
      {/* Pass columns and data to MyTable component */}
      <Table columns={columns} data={data} />
    </div>
  );
};

export default PreviousGame;
