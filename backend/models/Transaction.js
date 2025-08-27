const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
  type: { type: String, enum: ["income","expense"], required: true }
});

module.exports = mongoose.model("Transaction", TransactionSchema);
