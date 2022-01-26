import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { user } from "../reducers/user";
import TaskList from "../components/TaskList";
import PomodoroTimer from "../components/PomodoroTimer";
import LoadingIndicator from "../components/LoadingIndicator";

import { MainContainer, FormWrapper } from "styled-components/Styling";

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
{/*       {!loading && (
        
      )} */}
      <MainContainer>
        <PomodoroTimer />
        <FormWrapper>
          <TaskList />
        </FormWrapper>
        {/* add hamburger menu and put log out button there? */ }
        <button onClick={() => dispatch(user.actions.setAccessToken(null))}>
            Log out
          </button>
       </MainContainer>   
    </>
  );
};

export default Main;



