const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for all origins
app.use(cors({
    origin: 'http://localhost:3000', // Allow only this origin
    methods: 'GET,POST',
    credentials: true,
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(`MongoDB connection error: ${err}`));

// Define the GameEntry model (Ensure this matches your schema)
const gameEntrySchema = new mongoose.Schema({
    user: { type: String, required: true },
    buyIn: { type: Number, required: true },
    cashOut: { type: Number, required: true },
    date: { type: Date, required: true },
    location: { type: String }, // Added additional fields if they exist in your model
    gameType: { type: String },
    notes: { type: String },
});

const GameEntry = mongoose.model('GameEntry', gameEntrySchema);

// Define a simple route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// POST route to add a game entry
app.post('/api/games/add', async (req, res) => {
    try {
        const { user, buyIn, cashOut, date, location, gameType, notes } = req.body;

        // Create and save the new game entry
        const newGame = new GameEntry({ user, buyIn, cashOut, date, location, gameType, notes });
        await newGame.save();

        res.status(201).json(newGame);
    } catch (error) {
        res.status(500).json({ message: 'Error adding game entry', error });
    }
});

// GET route to fetch all games for a specific user
app.get('/api/games', async (req, res) => {
    const { userId } = req.query;

    try {
        const games = await GameEntry.find({ user: userId });
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching games', error });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
