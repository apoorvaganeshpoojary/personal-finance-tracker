const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// Get all transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new transaction
router.post("/", async (req, res) => {
  const { title, amount, category, type } = req.body;
  try {
    const transaction = new Transaction({ title, amount, category, type });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET spending recommendations
router.get("/recommendations", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    const expenseByCategory = {};

    // Sum expenses by category
    transactions.forEach(t => {
      if(t.type === "expense") {
        expenseByCategory[t.category] = (expenseByCategory[t.category] || 0) + t.amount;
      }
    });

    const totalExpense = Object.values(expenseByCategory).reduce((a,b) => a+b, 0) || 1; // avoid division by 0
    const recommendations = [];

    for(const [category, amount] of Object.entries(expenseByCategory)) {
      const percent = (amount / totalExpense) * 100;
      let message = `You spend ${percent.toFixed(0)}% on ${category}.`;
      if(percent > 50) message += " Consider reducing it.";
      else if(percent > 30) message += " Try budgeting carefully.";
      recommendations.push({ message, percent });
    }

    res.json({ recommendations });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
