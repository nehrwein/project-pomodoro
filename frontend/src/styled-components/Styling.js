import styled from "styled-components/macro"
import ReactSlider from "react-slider"
import { Link } from "react-router-dom"

/***** PAGES *****/
/*** About.js ***/
export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 30px;

  @media (min-width: 768px) {
    gap: 10px;
  }
`

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  border: 1px solid lightgray;
  padding: 18px;
  border-radius: 10px;
  margin: 10px 0;

  p {
    font-size: 16px;
  }
`

export const Image = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
`

export const AboutLink = styled.a`
  color: var(--lightRed);
  font-weight: bold;
  font-size: 20px;

  :hover {
    color: var(--red);
    text-decoration: none;
  }
`

/*** Login.js ***/
export const LoginContainer = styled.main`
  height: 100vh;
  width: 100%;
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("/assets/tomato-background.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`

export const FormWrapper = styled.div`
  width: 60%;
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--lightRed);

  @media (min-width: 768px) {
    width: auto;
    font-size: 20px;

    h3 {
      font-size: 22px;
    }
  }

  @media (min-width: 1024px) {
    font-size: 23px;
    padding: 70px;

    h3 {
      font-size: 25px;
    }
  }
`

export const UserInfoWrapper = styled.fieldset`
  border: 2px solid var(--lightRed);
  border-radius: 7px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
  margin-bottom: 10px;
  margin-top: 3px;
`

export const UserInput = styled.input`
  border: 1px solid transparent;
  width: 100%;
  height: 100%;
  border: none transparent;
  outline: none;
  font-size: 20px;
`

export const LoginButton = styled.button`
  background-color: var(--lightRed);
  width: 100px;
  display: flex;
  justify-content: center;
  border: none;
  cursor: pointer;
  color: var(--beige);
  font-size: 20px;
  font-weight: 500;
  padding: 10px;
  margin: 20px auto;
  border-radius: 6px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);

  &:hover {
    background-color: var(--red);
  }

  @media (min-width: 768px) {
    font-size: 22px;
    width: 120px;
  }

  @media (min-width: 1024px) {
    font-size: 25px;
    width: 150px;
  }
`

export const LinkText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
  border-top: 1px solid #b4b2b2;
  padding: 10px;
  p {
    margin: 5px;
  }
`

/*** Main.js ***/
export const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 0 auto;
  background-color: var(--beige);
`

/*** NotFound.js ***/
export const NotFoundContainer = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  background-image: url("/assets/tomato-background.jpg");
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: center;
  padding-bottom: 50px;
`

export const NotFoundChild = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;

  background-color: white;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.15);
`

/*** Report.js, Settings.js ***/
export const PagesContainer = styled.div`
  margin: 0 auto;
  width: 80%;
  max-width: 1100px;
  padding-top: 50px;
  text-align: center;
  background-color: var(--beige);

  h2 {
    margin-bottom: 20px;
  }

  @media (min-width: 768px) {
    h2 {
      font-size: 30px;
    }

    h3 {
      font-size: 25px;
    }

    label {
      font-size: 18px;
    }

    p,
    span {
      font-size: 20px;
    }
  }

  @media (min-width: 1024px) {
    h2 {
      font-size: 40px;
    }

    h3 {
      font-size: 35px;
    }

    label {
      font-size: 25px;
    }

    p,
    span {
      font-size: 25px;
    }
  }
`

export const Slider = styled(ReactSlider)`
  height: 40px;
  border: 2px solid;
  border-color: ${(props) =>
    props.lightBlue
      ? "var(--lightBlue)"
      : props.blue
      ? "var(--blue)"
      : "var(--lightRed)"};
  border-radius: 20px;
`

export const SettingsPagesContainer = styled(PagesContainer)`
  max-width: 600px;
`

export const SettingsButton = styled(LoginButton)`
  width: 250px;
`

/***** COMPONENTS *****/
/*** AddTask.js ***/
export const AddTaskContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 2px solid ${(props) => props.taskColor};
  padding: 20px 0;
  gap: 10px;
`

export const AddButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 15px;
  cursor: pointer;
`

export const AddInput = styled.input`
  border: none;
  outline: none;
  font-size: 20px;
  color: ${(props) => props.taskColor};
  width: 144px;
  text-align: center;
  background-color: var(--beige);

  ::placeholder {
    color: ${(props) => props.taskColor};
  }

  @media (min-width: 768px) {
    font-size: 30px;
    width: 240px;
  }

  @media (min-width: 1024px) {
    font-size: 40px;
    width: 400px;
  }
`

export const AddIcon = styled.i`
  color: #747171;
  font-size: 20px;

  @media (min-width: 768px) {
    font-size: 23px;
  }

  @media (min-width: 1024px) {
    font-size: 30px;
  }
`

/*** LoadingIndicator.js ***/
export const LoadingOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 5px solid #dcdcdc;
  border-radius: 50%;
  border-left: 5px solid var(--lightRed);
  animation: spinner infinite 0.5s;

  @media (min-width: 768px) {
    height: 80px;
    width: 80px;
    border: 10px solid #dcdcdc;
    border-left: 10px solid var(--lightRed);
  }

  @media (min-width: 1024px) {
    height: 100px;
    width: 100px;
    border: 15px solid #dcdcdc;
    border-left: 15px solid var(--lightRed);
  }

  @keyframes spinner {
    0% {
      transform: rotate(0);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

/*** Navigation.js ***/
export const NavBar = styled.div`
  height: 30px;
  padding: 5px 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  top: 0;
  position: absolute;
`

export const NavIcon = styled.i`
  margin-right: 15px;
  color: ${(props) =>
    props.orange
      ? "var(--lightRed)"
      : window.location.pathname === "/"
      ? "var(--beige)"
      : "var(--lightRed)"};
  font-size: 28px;
  background: none;
  z-index: 3;
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 10px;
  margin-top: 5px;

  @media (min-width: 768px) {
    font-size: 40px;
    margin-right: 20px;
  }

  @media (min-width: 768px) {
    font-size: 50px;
    margin-right: 30px;
    margin-top: 20px;
  }
`

export const SideMenu = styled.nav`
  background-color: var(--beige);
  border-left: 2px solid var(--lightRed);
  width: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 0;
  right: ${(props) => (props.sidebar ? 0 : "-100%")};
  transition: ${(props) => (props.sidebar ? "350ms" : "850ms")};
  z-index: 3;

  @media (min-width: 768px) {
    width: 400px;
  }

  @media (min-width: 1024px) {
    width: 500px;
  }
`

export const NavList = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 0px 8px 32px;
  list-style: none;
  height: 60px;

  @media (min-width: 1024px) {
    padding-left: 80px;
    height: 80px;
  }
`

export const NavLink = styled(Link)`
  text-decoration: none;
  color: var(--lightRed);
  font-size: 18px;
  width: 95%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-radius: 4px;

  :hover {
    background-color: var(--lightRed);
    color: var(--beige);
  }

  @media (min-width: 768px) {
    font-size: 30px;
  }

  @media (min-width: 1024px) {
    font-size: 35px;
  }
`

export const StyledUl = styled.ul`
  width: 100%;
`

export const StyledLi = styled.ul`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export const LogOutButton = styled.button`
  width: 110px;
  border: 2px solid var(--lightRed);
  cursor: pointer;
  color: var(--lightRed);
  padding: 10px;
  margin: 50px auto;
  border-radius: 4px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  font-size: 14px;
  display: flex;
  justify-content: space-evenly;
  background: transparent;

  p {
    margin: 0;
    display: inline;
  }

  &:hover {
    background-color: var(--lightRed);
    color: var(--beige);
  }

  @media (min-width: 768px) {
    font-size: 20px;
    width: 150px;
  }

  @media (min-width: 768px) {
    font-size: 25px;
    width: 200px;
  }
`
/*** PomodoroButtons.js ***/
export const ButtonsContainer = styled.div`
  background: ${(props) => props.buttonBackgroundColor};
  display: flex;
  justify-content: center;
`

export const InnerButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;
  max-width: 800px;
  padding: 20px 0;
`

export const TimerIcon = styled.i`
  color: ${(props) => props.iconColor};
  font-size: 28px;

  :hover {
    color: white;
    transition: ease 0.5s;
  }

  @media (min-width: 768px) {
    font-size: 40px;
  }

  @media (min-width: 1024px) {
    font-size: 50px;
  }
`

export const BigIcon = styled(TimerIcon)`
  font-size: 50px;

  @media (min-width: 768px) {
    font-size: 62px;
  }

  @media (min-width: 1024px) {
    font-size: 75px;
  }
`

export const TimerButton = styled.button`
  border: none;
  background-color: transparent;
`

/*** PomodoroTimer.js ***/
export const TimerContainer = styled.div`
  width: 100%;
  margin: 0;
  color: var(--beige);
  background-image: ${(props) =>
    props.work
      ? `url("/assets/timer-work-background.png")`
      : `url("/assets/timer-break-background.png")`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  h1 {
    font-size: 48px;
    margin: 0;

    @media (min-width: 768px) {
      font-size: 60px;
    }

    @media (min-width: 1024px) {
      font-size: 80px;
    }
  }

  p {
    color: #ffffff99;

    @media (min-width: 768px) {
      font-size: 25px;
    }

    @media (min-width: 1024px) {
      font-size: 40px;
    }
  }
`

export const TimerWrapper = styled.div`
  display: flex;
`

export const SlidingAnimation = styled.div`
  padding: 20px 0;
  width: ${(props) => props.percentage}%;
  background: ${(props) => props.animationColor};
  position: relative;
  z-index: 1;
  height: 15vh;

  @media (min-width: 768px) {
    height: 25vh;
  }

  @media (min-width: 1024px) {
    height: 30vh;
  }
`

export const TimeAndTaskContainer = styled.div`
  position: absolute;
  z-index: 2;
  align-self: center;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  top: 0;
  padding-top: 30px;

  @media (min-width: 768px) {
    padding-top: 90px;
  }

  @media (min-width: 992px) {
    padding-top: 50px;
  }
`

/*** TaskList.js ***/
export const TaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 30px;
  padding-bottom: 30px;
  width: 95%;
  min-height: 45%;
  overflow-y: auto;

  @media (min-width: 768px) {
    max-width: 550px;
  }

  @media (min-width: 1024px) {
    max-width: 1000px;
    min-height: 30vh;
    display: grid;
    grid-template-columns: ${(props) =>
      props.loadingAnimation ? "1fr" : "1fr 1fr"};
    justify-items: center;
    align-content: start;
  }
`

export const Task = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 5px;

  @media (min-width: 1024px) {
    padding: 6px 20px;
  }
`

export const TaskSettings = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 20px;
`

export const TaskIcon = styled.i`
  color: #b4b2b2;
  font-size: 16px;

  @media (min-width: 768px) {
    font-size: 20px;
  }

  @media (min-width: 1024px) {
    font-size: 25px;
  }
`

export const CheckContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
`

export const EditInput = styled.input`
  border: none;
  border-bottom: 1px solid red;
  outline: none;
  font-size: 20px;
  color: var(--lightRed);
  width: 67%;
  background-color: transparent;
`

export const SaveButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 15px;
  cursor: pointer;
`

export const TaskLabel = styled.label`
  color: ${(props) => props.taskColor};
  padding-left: 8px;

  @media (min-width: 768px) {
    font-size: 20px;
    padding-bottom: 6px;
  }

  @media (min-width: 1024px) {
    font-size: 25px;
  }
`
