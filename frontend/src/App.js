import React, { useState, useEffect } from "react";
import "./App.css";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Dashboard from "./components/Dashboard";
import Recommendations from "./components/Recommendations";
import { getTransactions, addTransaction } from "./utils/api";

function App() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const res = await getTransactions();
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchTransactions(); }, []);

  const handleAdd = async (transaction) => {
    try {
      const res = await addTransaction(transaction);
      setTransactions([res.data, ...transactions]);
    } catch (err) { console.error(err); }
  };

  return (
    <div className="container">
      <h1>Personal Finance Tracker</h1>
      <TransactionForm onAdd={handleAdd} />
      <Dashboard transactions={transactions} />
      <TransactionList transactions={transactions} />
      <Recommendations />
    </div>
  );
}

export default App;
