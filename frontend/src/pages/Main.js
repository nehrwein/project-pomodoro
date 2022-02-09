import React from "react";
import TaskList from "../components/TaskList";
import PomodoroTimer from "../components/PomodoroTimer";
import AddTask from "../components/AddTask";

import styled from "styled-components";

const Main = () => {
  return (
		<MainContainer>
      <PomodoroTimer />
      <TaskList />
      <AddTask />
    </MainContainer>  

  );
};

export default Main;

const MainContainer = styled.div `
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 0 auto;
  background-color: #fff9f5;

/*   @media (min-width: 768px) {
    width: 400px;
    align-items: center;
		border-radius: 10px;
		margin-top:30px;
  } */
`
