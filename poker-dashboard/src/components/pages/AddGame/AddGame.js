import React, { useState } from 'react';
import axios from 'axios';
import './AddGame.css'; // Make sure to import the CSS file

const AddGameEntry = ({ userId }) => {
    const [buyIn, setBuyIn] = useState('');
    const [cashOut, setCashOut] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const gameData = {
            user: userId,
            buyIn: parseFloat(buyIn),
            cashOut: parseFloat(cashOut),
            date: date || new Date(),
        };
    
        try {
            // Update the URL to point to the correct backend server
            const response = await axios.post('http://localhost:5001/api/games/add', gameData);
            console.log('Game added:', response.data);
            // Optionally reset the form
            setBuyIn('');
            setCashOut('');
            setDate('');
        } catch (error) {
            console.error('Error adding game:', error.response ? error.response.data : error.message);
            // Additional error details
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                console.error('Request data:', error.request);
            }
        }
    };
    
    
    return (
        <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
                <label className="label">Buy-In:</label>
                <input
                    type="number"
                    value={buyIn}
                    onChange={(e) => setBuyIn(e.target.value)}
                    required
                    className="input"
                />
            </div>
            <div className="form-group">
                <label className="label">Cash-Out:</label>
                <input
                    type="number"
                    value={cashOut}
                    onChange={(e) => setCashOut(e.target.value)}
                    required
                    className="input"
                />
            </div>
            <div className="form-group">
                <label className="label">Date:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="input"
                />
            </div>
            <button type="submit" className="button">Add Game Entry</button>
        </form>
    );
};

export default AddGameEntry;
