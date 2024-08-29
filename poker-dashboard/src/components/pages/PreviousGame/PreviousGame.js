import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
  

  return (
    <div>
      <h1>Previous Poker Games for {userId}</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <button onClick={handleDeleteGames} disabled={selectedGames.length === 0}>
        Delete Selected Games
      </button>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Date</th>
            <th>Game Type</th>
            <th>Buy-In ($)</th>
            <th>Cash-Out ($)</th>
            <th>Notes</th>
            <th>Net Profit ($)</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedGames.includes(game._id)}
                  onChange={() => handleCheckboxChange(game._id)}
                />
              </td>
              <td>{new Date(game.date).toLocaleDateString()}</td>
              <td>{game.location}</td>
              <td>{game.gameType}</td>
              <td>{game.buyIn}</td>
              <td>{game.cashOut}</td>
              <td>{game.notes}</td>
              <td>{game.cashOut - game.buyIn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PreviousGame;
