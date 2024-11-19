import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(
  CategoryScale,  
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = ({ data }) => {
  console.log(data);
  const chartData = {
    labels: data
      .filter((point) => point.mu != null && point.pu != null) 
      .map((point) => point.mu.toFixed(2)), 
    datasets: [
      {
        label: "pu vs mu",
        data: data
          .filter((point) => point.mu != null && point.pu != null) 
          .map((point) => parseFloat(point.pu.toFixed(2))), 
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(255, 255, 255)", 
        fill: true, 
        tension: 0.4,
      },
    ],
  };

 
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "نمودار pu و mu",
        font: {
          size: 18,
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `pu: ${tooltipItem.raw} | mu: ${tooltipItem.label}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: 'category', 
        title: {
          display: true,
          text: "mu",
        },
      },
      y: {
        title: {
          display: true,
          text: "pu",
        },
      },
    },
  };

  return (
    <div className="chart-container flex justify-center items-center" style={{ width: "100%", height: "400px" }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default ChartComponent;
