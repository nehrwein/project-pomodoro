import React from 'react';
import { useSelector } from 'react-redux';
import Chart from '../components/Chart'

const Report = () => {
  const allTasks = useSelector((store) => store.tasks.items)

  const userData = {
    labels: allTasks.map((data) => data.completedAt),
    datasets: [{
      label: "No of Pomodoros",
      data: allTasks.map((data) => data.pomodoros),
      backgroundColor: [
        "#d75004",
      ],
      borderColor: "grey",
      borderWidth: 1,     
    }]
  }

  return (
    <div>
      <h2>Productivity Report</h2>
      <Chart chartData={userData}/>
    </div>
  );
};

export default Report;

