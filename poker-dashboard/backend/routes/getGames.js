// /backend/routes/getgames.js

const express = require('express');
const router = express.Router();
const GameEntry = require('../models/GameEntry');

// Fetch all poker games for a specific user, aggregated by date
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const games = await GameEntry.aggregate([
      {
        $match: { user: userId } // Filter games by the provided userId
      },
      {
        $group: {
          _id: "$date",
          totalBuyIn: { $sum: "$buyIn" },
          totalCashOut: { $sum: "$cashOut" },
          players: {
            $push: {
              user: "$user",
              buyIn: "$buyIn",
              cashOut: "$cashOut",
              profit: { $subtract: ["$cashOut", "$buyIn"] },
            }
          }
        }
      },
      {
        $sort: { _id: -1 } // Sort by date in descending order
      }
    ]);

    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
