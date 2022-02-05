import React from 'react';
import { useSelector } from 'react-redux';
import Chart from '../components/Chart'

const Report = () => {
  const allTasks = useSelector((store) => store.tasks.items.tasks)
  const allCompletedTasks = allTasks.filter(item => item.completed === true)
  const allPomodoros = useSelector((store) => store.tasks.items.pomodoros)
 
  // completed tasks per day
  // https://stackoverflow.com/questions/53280115/how-to-count-unique-value-from-object-of-array-in-javascript
  let tempResult = {}
  for (let { completedAt } of allCompletedTasks) 
    tempResult[completedAt] = {
      completedAt,
      count: tempResult[completedAt] ? tempResult[completedAt].count + 1 : 1
    }

  const tasksPerDay = Object.values(tempResult) 
  
  // no of pomodoros per day
  // https://stackoverflow.com/questions/24444738/sum-similar-keys-in-an-array-of-objects
  let pomoResult = {}
  allPomodoros.forEach(item => {
    if (pomoResult.hasOwnProperty(item.completedAt)) {
      pomoResult[item.completedAt] = pomoResult[item.completedAt] + item.pomodoro
    } else {
      pomoResult[item.completedAt] = item.pomodoro
    }
  })

  let pomoData = []

  for (let prop in pomoResult) {
    pomoData.push({ completedAt: prop, pomodoro: pomoResult[prop]})
  }
  pomoData.sort((a,b) => a.completedAt > b.completedAt)


  console.log('Ergebnis Pomo: ', pomoData)

  const userData = {
    labels: tasksPerDay.map((data) => data.completedAt),
    datasets: [
      {
        label: "No of completed tasks per day",
        data: tasksPerDay.map((data) => data.count),
        backgroundColor: [
          "#d75004",
        ],
        borderColor: "grey",
        borderWidth: 1,     
      },
      {
        label: "Pomodoros per day",
        data: pomoData.map((data) => data.pomodoro),
        backgroundColor: [
          "red",
        ],
        borderColor: "grey",
        borderWidth: 1,     
      }
    ]
  }

  return (
    <div>
      <h2>Productivity Report</h2>
      <Chart chartData={userData}/>
    </div>
  );
};

export default Report;

