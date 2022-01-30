import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { user } from "../reducers/user";
//import Header from "../components/Header"
import TaskList from "../components/TaskList";
import PomodoroTimer from "../components/PomodoroTimer";

import styled from "styled-components";

const Main = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  return (
    <MainContainer>
      {/*<Header />*/}
      <PomodoroTimer />
      <TaskList />
      {/* add hamburger menu and put log out button there? */ }
      <button type='submit' onClick={() => dispatch(user.actions.setAccessToken(null))}
      >Log out
      </button>
    </MainContainer>   
  );
};

export default Main;


const MainContainer = styled.div `
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  /*background-image: url("/assets/tomato-background.jpg");*/
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: center;
  padding-bottom: 50px;

  @media (min-width: 992px) {
    width: 400px;
    align-items: center;
  }
`
