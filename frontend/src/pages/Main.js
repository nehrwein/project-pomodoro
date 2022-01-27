import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { user } from "../reducers/user";
import TaskList from "../components/TaskList";
import PomodoroTimer from "../components/PomodoroTimer";

import { MainContainer, FormWrapper, PomodoroTimerWrapper, TaskWrapper } from "styled-components/Styling";

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
			<PomodoroTimerWrapper >
				<PomodoroTimer />
      </PomodoroTimerWrapper>
      <TaskWrapper>
        <TaskList />
      </TaskWrapper>
      {/* add hamburger menu and put log out button there? */ }
      <button type='submit' onClick={() => dispatch(user.actions.setAccessToken(null))}
      >Log out
      </button>
    </MainContainer>   
  );
};

export default Main;



