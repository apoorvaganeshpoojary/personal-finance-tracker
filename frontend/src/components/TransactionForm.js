import React, { useState } from "react";

const TransactionForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !category) return;
    onAdd({ title, amount: Number(amount), category, type });
    setTitle(""); setAmount(""); setCategory(""); setType("expense");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <input placeholder="Amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} required />
      <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} required />
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
