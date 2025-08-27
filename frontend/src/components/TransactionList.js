import React from "react";

const TransactionList = ({ transactions }) => {
  return (
    <div>
      <h3>Transactions</h3>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Type</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t._id}>
              <td>{t.title}</td>
              <td>{t.amount}</td>
              <td>{t.category}</td>
              <td>{t.type}</td>
              <td>{new Date(t.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
