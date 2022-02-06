import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TaskList from "../components/TaskList";
import PomodoroTimer from "../components/PomodoroTimer";

import styled from "styled-components";

const Main = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

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
