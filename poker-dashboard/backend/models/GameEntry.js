// backend/models/GameEntry.js

const mongoose = require('mongoose');

const gameEntrySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    buyIn: {
        type: Number,
        required: true
    },
    cashOut: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    location: {
        type: String,
        default: 'Unknown'
    },
    gameType: {
        type: String,
        default: 'No Limit Hold’em'
    },
    notes: {
        type: String,
        default: ''
    },
    netProfit: {
        type: Number,
        default: function() {
            return this.cashOut - this.buyIn;
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const GameEntry = mongoose.model('GameEntry', gameEntrySchema);

module.exports = GameEntry;
