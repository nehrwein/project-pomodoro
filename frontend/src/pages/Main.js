import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { user } from "../reducers/user";
import styled from "styled-components";
import TaskList from "../components/TaskList";
import LoadingIndicator from "../components/LoadingIndicator";

const Main = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const loading = useSelector((state) => state.ui.loading)
  console.log('Loading:', loading)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  return (
    <>
      <LoadingIndicator />
      <MainContainer>
        <TimerContainer>
          Pomodoro timer goes here
        </TimerContainer>
        <TaskList />
        <button onClick={() => dispatch(user.actions.setAccessToken(null))}>
          Log out
        </button>
       </MainContainer>   
    </>
  );
};

export default Main;

const MainContainer = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  background: #202D48;
`;

const TimerContainer = styled.div`
  background: linear-gradient(270.42deg, #D75004 0.3%, #8A3403 99.58%);
  width:100%;
  height: auto;
  text-align:center;
`; 



