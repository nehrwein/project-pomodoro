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
      <Bar 
        data={chartData}
        height={500}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
};

export default Chart;


