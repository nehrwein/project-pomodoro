import React from 'react';
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({chartData}) => {
  return (
    <div>
      <div style={{ width: 400 }}>
        <Bar
          data={chartData}
        />
      </div>
    </div>
  );
};

export default Chart;
