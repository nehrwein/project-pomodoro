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
  const sevenDaysTasks = allTasks.filter(item => item.completed === true && sevenDays.includes(item.completedAt))
  const sevenDaysPomodoros = allPomodoros.filter(item => sevenDays.includes(item.completedAt))
  
  // completed tasks per day
  // https://stackoverflow.com/questions/53280115/how-to-count-unique-value-from-object-of-array-in-javascript
  // https://stackoverflow.com/questions/24444738/sum-similar-keys-in-an-array-of-objects
  let taskResult = {}
  sevenDaysTasks.forEach(item => {
    if (taskResult.hasOwnProperty(item.completedAt)) {
      taskResult[item.completedAt] = {
        completedAt: item.completedAt,
        count: taskResult[item.completedAt].count + 1
      }
    } else {
      taskResult[item.completedAt] = {
        completedAt: item.completedAt,
        count: 1
      }
    }
  })
  // The Object.values() method returns an array of a given object's own enumerable property values, 
  // in the same order as that provided by a for...in loop.  
  const tasksPerDay = Object.values(taskResult) 
  
  // no of pomodoros per day
  let pomoResult = {}
  sevenDaysPomodoros.forEach(item => {
    if (pomoResult.hasOwnProperty(item.completedAt)) {
      pomoResult[item.completedAt] = {
        completedAt: item.completedAt,
        count: pomoResult[item.completedAt].count + 1
      }
    } else {
      pomoResult[item.completedAt] = {
        completedAt: item.completedAt,
        count: 1
      }
    }
  })
  const pomoData = Object.values(pomoResult)

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
        data: pomoData.map((data) => ({ x: data.completedAt, y: data.count})),
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
      <Chart 
        chartData={userData}/>
    </PagesContainer>
  );
};

export default Report;

