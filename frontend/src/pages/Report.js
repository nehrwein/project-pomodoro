import React from 'react';
import { useSelector } from 'react-redux';
import Chart from '../components/Chart'

const Report = () => {
  const allTasks = useSelector((store) => store.tasks.items)
  let tempResult = {}

  for (let { completedAt } of allTasks) 
    tempResult[completedAt] = {
      completedAt,
      count: tempResult[completedAt] ? tempResult[completedAt].count + 1 : 1
    }

  const tasksPerDay = Object.values(tempResult) 
  console.log('Result: ', tasksPerDay)

  const userData = {
    labels: tasksPerDay.map((data) => data.completedAt),
    datasets: [{
      label: "No of completed tasks per day",
      data: tasksPerDay.map((data) => data.count),
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

