import React, { useEffect, useState } from 'react';

const PreviousGame = ({ userId }) => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(`/api/games?userId=${userId}`); // Query parameter to filter by userId

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error('Error fetching games:', error);
        setError(error.message);
      }
    };

    fetchGames();
  }, [userId]);

  return (
    <div>
      <h1>Previous Poker Games for {userId}</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <ul>
        {games.map((game) => (
          <li key={game._id}>
            <h2>Date: {new Date(game.date).toLocaleDateString()}</h2>
            <p>Location: {game.location}</p>
            <p>Game Type: {game.gameType}</p>
            <p>Buy-In: ${game.buyIn}</p>
            <p>Cash-Out: ${game.cashOut}</p>
            <p>Notes: {game.notes}</p>
            <p>Net Profit: ${game.cashOut - game.buyIn}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PreviousGame;
