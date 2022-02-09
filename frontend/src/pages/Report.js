import React from 'react';
import { useSelector } from 'react-redux';
import Chart from '../components/Chart'
import { sub, format } from 'date-fns'
import { PagesContainer } from "styled-components/Styling"

var style = getComputedStyle(document.body);
var lightRed = style.getPropertyValue('--lightRed');
var lightBlue = style.getPropertyValue('--lightBlue');

const Report = () => {
  const allTasks = useSelector((store) => store.tasks.items.tasks)
  const allPomodoros = useSelector((store) => store.tasks.items.pomodoros)

  // create an array with the last 7 days' dates
  let sevenDays = []
  for(let i = 6; i >= 0; i--) {
    const daysDate = sub(new Date(), {days: i})
    sevenDays.push(format(daysDate,'dd.MM.yyyy'))
  }

  // We need to filter out completed tasks and pomodoros that were completed within the last seven days
  const allCompletedTasks = allTasks.filter(item => item.completed === true && sevenDays.includes(item.completedAt))
  const sevenDaysPomodoros = allPomodoros.filter(item => sevenDays.includes(item.completedAt))
  
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
  sevenDaysPomodoros.forEach(item => {
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

  // The two datasets for ChartJs
  const userData = {
    labels: sevenDays,
    datasets: [
      {
        label: "No of completed tasks per day",
        data: tasksPerDay.map((data) => ({ x: data.completedAt, y: data.count})),
        backgroundColor: [
          lightBlue,
        ],
        borderColor: "grey",
        borderWidth: 1,     
      },
      {
        label: "Pomodoros per day",
        data: pomoData.map((data) => ({ x: data.completedAt, y: data.pomodoro})),
        backgroundColor: [
          lightRed,
        ],
        borderColor: "grey",
        borderWidth: 1,     
      }
    ]
  }

  return (
    <PagesContainer>
      <h2>Productivity Report</h2>
      <h3>See your results of the last 7 days</h3>
      <Chart chartData={userData}/>
    </PagesContainer>
  );
};

export default Report;

