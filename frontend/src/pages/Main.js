import React from "react";
import TaskList from "../components/TaskList";
import PomodoroTimer from "../components/PomodoroTimer";

import styled from "styled-components";

const Main = () => {

  return (
		<Wrapper>
			<MainContainer>
				<PomodoroTimer />
				<TaskList />
			</MainContainer>  
		</Wrapper>
  );
};

export default Main;

const Wrapper = styled.div`
  background-image: url("/assets/tomato-background.jpg");
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: center;
	height:100vh;
`


const MainContainer = styled.div `
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding-bottom: 50px;



  @media (min-width: 768px) {
    width: 400px;
    align-items: center;
		border-radius: 10px;
		margin-top:30px;
  }
`
