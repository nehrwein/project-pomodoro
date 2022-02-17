import React from "react"
import TaskList from "../components/TaskList"
import PomodoroTimer from "../components/PomodoroTimer"
import AddTask from "../components/AddTask"
import { MainContainer } from "styled-components/Styling"


const Main = () => {
  return (
    <MainContainer>
      <PomodoroTimer />
      <TaskList />
      <AddTask />
    </MainContainer>
  )
}

export default Main

