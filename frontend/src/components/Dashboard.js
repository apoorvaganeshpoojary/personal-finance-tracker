import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = ({ transactions }) => {
  const categoryData = {};
  transactions.forEach(t => {
    if(t.type === "expense") {
      categoryData[t.category] = (categoryData[t.category] || 0) + t.amount;
    }
  });

  const data = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: "Expenses by Category",
        data: Object.values(categoryData),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#8BC34A","#FF9800"]
      }
    ]
  };

  const options = {
  maintainAspectRatio: false,
  responsive: true
};

<div style={{ height: "300px", width: "300px" }}>
  <Pie data={data} options={options} />
</div>


  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Analytics</h3>
      {Object.keys(categoryData).length > 0 ? <Pie data={data} /> : <p>No expense data yet.</p>}
    </div>
  );
};

export default Dashboard;
