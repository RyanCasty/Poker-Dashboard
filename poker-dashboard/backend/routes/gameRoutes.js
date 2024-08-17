// backend/routes/gameRoutes.js

const express = require('express');
const GameEntry = require('../models/GameEntry');
const router = express.Router();

// Add a new game entry
router.post('/add', async (req, res) => {
    const { user, buyIn, cashOut, date, location, gameType, notes } = req.body;

    try {
        const newGame = new GameEntry({
            user,
            buyIn,
            cashOut,
            date,
            location,
            gameType,
            notes
        });

        const savedGame = await newGame.save();
        res.status(201).json(savedGame);
    } catch (error) {
        res.status(500).json({ message: 'Error adding game entry', error });
    }
});

// Get all game entries for a user
router.get('/', async (req, res) => {
    const { userId } = req.query;

    try {
        const games = await GameEntry.find({ user: userId });
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching games', error });
    }
});

// Get statistics for a user
router.get('/stats', async (req, res) => {
    const { userId } = req.query;

    try {
        const games = await GameEntry.find({ user: userId });

        const totalGames = games.length;
        const totalProfit = games.reduce((acc, game) => acc + game.netProfit, 0);
        const winRate = totalGames ? (games.filter(game => game.netProfit > 0).length / totalGames) * 100 : 0;
        const averageBuyIn = totalGames ? (games.reduce((acc, game) => acc + game.buyIn, 0) / totalGames) : 0;

        res.status(200).json({
            totalGames,
            totalProfit,
            winRate,
            averageBuyIn,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats', error });
    }
});

module.exports = router;
