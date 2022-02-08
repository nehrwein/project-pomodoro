import React from "react"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import { timer, addPomodoro } from "../reducers/timer"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faRedo,
  faPlayCircle,
  faTimes,
  faPauseCircle,
} from "@fortawesome/free-solid-svg-icons"

const PomodoroTimer = () => {
  const [counter, setCounter] = useState(0)
  const workMinutes = useSelector((state) => state.settings.workMinutes)
  const shortBreakMinutes = useSelector(
    (state) => state.settings.shortBreakMinutes
  )
  const longBreakMinutes = useSelector(
    (state) => state.settings.longBreakMinutes
  )
  const activatedButton = useSelector((state) => state.timer.items._id)
  const accessToken = useSelector((state) => state.user.accessToken)
  const userId = useSelector((state) => state.user.userId)
  const [breakMinutes, setBreakMinutes] = useState(shortBreakMinutes)
  const [minutes, setMinutes] = useState(workMinutes)
  const [seconds, setSeconds] = useState(0)
  const [work, setWork] = useState(true)
  const totalSeconds = work ? workMinutes * 60 : breakMinutes * 60
  const [isRunning, setIsRunning] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds)
  const ReplayIcon = <FontAwesomeIcon icon={faRedo} />
  const PlayIcon = <FontAwesomeIcon icon={faPlayCircle} />
  const StopIcon = <FontAwesomeIcon icon={faTimes} />
  const PauseIcon = <FontAwesomeIcon icon={faPauseCircle} />
  const description = useSelector((store) => store.timer.items.description)

  const percentage = Math.round((secondsLeft / totalSeconds) * 100)

  const animationColor = work ? "var(--gradientRed)" : "var(--gradientBlue)"
  const buttonBackgroundColor = work ? "var(--red)" : "var(--blue)"
  const iconColor = work ? "var(--lightRed)" : "var(--lightBlue)"

  const dispatch = useDispatch()

  // When user enters the page we want the timer to display "tap on a task to start"
  useEffect(() => {
    dispatch(timer.actions.setDescription())
  }, [dispatch])

  useEffect(() => {
    // If the timer is running we want to run this code
    if (isRunning) {
      // The setInterval() method calls a function at specified intervals (in milliseconds).
      const interval = setInterval(() => {
        // If seconds are equal to 0 we check if there are minutes left or if the timer has come to an end
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59)
            setMinutes(minutes - 1)
            setSecondsLeft(secondsLeft - 1)
          } else {
            const newMinutes = work ? breakMinutes - 1 : workMinutes - 1
            const newSeconds = 59
            setSeconds(newSeconds)
            setMinutes(newMinutes)
            setSecondsLeft(work ? breakMinutes * 60 : workMinutes * 60)
            setBreakMinutes(counter % 4 ? longBreakMinutes : shortBreakMinutes)
            setCounter(work ? counter + 1 : counter)
            work && dispatch(addPomodoro(accessToken, userId))
            setWork(work ? false : true)
            work && dispatch(timer.actions.setMode("break"))
            !work && dispatch(timer.actions.setMode("work"))
          }
        } else {
          // if seconds are not equal to 0 we lower them by 1
          setSeconds(seconds - 1)
          setSecondsLeft(secondsLeft - 1)
        }
      }, 1000)
      // clearInterval clears the timer set (stops setInterval)
      return () => clearInterval(interval)
    }
  }, [
    isRunning,
    work,
    minutes,
    seconds,
    secondsLeft,
    percentage,
    totalSeconds,
    breakMinutes,
    workMinutes,
    counter,
    longBreakMinutes,
    shortBreakMinutes,
    dispatch,
    accessToken,
    userId,
  ])

  // In order to always show two digits for minutes and seconds
  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds

  return (
    <TimerContainer>
      <Wrapper>
        <SlidingAnimation
          percentage={percentage}
          animationColor={animationColor}
        ></SlidingAnimation>
        <TimeAndTaskContainer>
          <h1>
            {timerMinutes}:{timerSeconds}
          </h1>
          <p>{description}</p>
        </TimeAndTaskContainer>
      </Wrapper>
      <ButtonsContainer buttonBackgroundColor={buttonBackgroundColor}>
        <Button
          disabled={!activatedButton}
          onClick={() => {
            setIsRunning(false)
            setSeconds(0)
            setMinutes(workMinutes)
            setSecondsLeft(totalSeconds)
          }}
        >
          <Icon iconColor={iconColor} active>
            {ReplayIcon}
          </Icon>
        </Button>
        {isRunning ? (
          <Button
            disabled={!activatedButton}
            onClick={() => setIsRunning(false)}
          >
            <BigIcon iconColor={iconColor}>{PauseIcon}</BigIcon>
          </Button>
        ) : (
          <Button
            disabled={!activatedButton}
            onClick={() => setIsRunning(true)}
          >
            <BigIcon iconColor={iconColor}>{PlayIcon}</BigIcon>
          </Button>
        )}
        {/* By pressing this stop button user returns to mode: Mobile-02 (see Figma sketch) */}
        <Button
          disabled={!activatedButton}
          onClick={() => {
            setIsRunning(false)
            setSeconds(0)
            setMinutes(workMinutes)
            setSecondsLeft(workMinutes * 60)
            dispatch(timer.actions.deleteItems())
            dispatch(timer.actions.setDescription())
          }}
        >
          <Icon iconColor={iconColor}>{StopIcon}</Icon>
        </Button>
      </ButtonsContainer>
    </TimerContainer>
  )
}

export default PomodoroTimer

const TimerContainer = styled.div`
  width: 100%;
  margin: 0;
  color: white;
  background-image: url("/assets/tomato-background-timer.jpg");
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 25px;

  h1 {
    font-size: 48px;
    margin: 0;
  }

  p {
    color: #ffffff99;
  }
`

const Wrapper = styled.div`
  display: flex;
`

const SlidingAnimation = styled.div`
  padding: 20px 0;
  width: ${(props) => props.percentage}%;
  background: ${(props) => props.animationColor};
  position: relative;
  z-index: 1;
  height: 15vh;

  @media (min-width: 768px) {
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
  }

  /* Maybe add some transition here to make it more smooth */
`

const TimeAndTaskContainer = styled.div`
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
    padding-top: 65px;
  }
`

const ButtonsContainer = styled.div`
  background: ${(props) => props.buttonBackgroundColor};
  padding: 20px 0;
  display: flex;
  justify-content: space-evenly;
`

const Icon = styled.i`
  color: ${(props) => props.iconColor};
  font-size: 28px;

  :hover {
    color: white;
    transition: ease 0.5s;
  }
`

const BigIcon = styled(Icon)`
  font-size: 50px;
`

const Button = styled.button`
  border: none;
  background-color: transparent;
`
