// TODO:
// -Mode for timer? useRef hook: useRef is like a “box” that can hold a mutable value in its .current property.

import React from "react"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"

import { timer } from "../reducers/timer"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faRedo,
  faPlayCircle,
  faTimes,
  faPauseCircle,
} from "@fortawesome/free-solid-svg-icons"

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [work, setWork] = useState(true)
  const totalSeconds = work ? 25 * 60 : 5 * 60
  const [isRunning, setIsRunning] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds)
  const ReplayIcon = <FontAwesomeIcon icon={faRedo} />
  const PlayIcon = <FontAwesomeIcon icon={faPlayCircle} />
  const StopIcon = <FontAwesomeIcon icon={faTimes} />
  const PauseIcon = <FontAwesomeIcon icon={faPauseCircle} />

  const description = useSelector((store) => store.timer.items.description)

  const percentage = Math.round((secondsLeft / totalSeconds) * 100)

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
            const newMinutes = work ? 4 : 24
            const newSeconds = 59

            setSeconds(newSeconds)
            setMinutes(newMinutes)
            setSecondsLeft(work ? 5 * 60 : 25 * 60)
            setWork(work ? !work : work)
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
  }, [isRunning, work, minutes, seconds, secondsLeft, percentage, totalSeconds])

  // In order to always show two digits for minutes and seconds
  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds

  return (
    <TimerContainer>
      <Wrapper>
        <SlidingAnimation percentage={percentage}></SlidingAnimation>
        <TimeAndTaskContainer>
          <h1>
            {timerMinutes}:{timerSeconds}
          </h1>
          <p>{description}</p>
        </TimeAndTaskContainer>
      </Wrapper>
      <ButtonsContainer>
        <Button
          onClick={() => {
            setIsRunning(false)
            setSeconds(0)
            setMinutes(25)
            setSecondsLeft(totalSeconds)
          }}
        >
          <Icon active>{ReplayIcon}</Icon>
        </Button>
        {isRunning ? (
          <Button onClick={() => setIsRunning(false)}>
            <BigIcon>{PauseIcon}</BigIcon>
          </Button>
        ) : (
          <Button onClick={() => setIsRunning(true)}>
            <BigIcon>{PlayIcon}</BigIcon>
          </Button>
        )}
        {/* By pressing this stop button user returns to mode: Mobile-02 (see Figma sketch) */}
        <Button onClick={() => dispatch(timer.actions.setDescription())}>
          <Icon>{StopIcon}</Icon>
        </Button>
      </ButtonsContainer>
    </TimerContainer>
  )
}

export default PomodoroTimer

const TimerContainer = styled.div`
  /*height: 30vh;*/
  /* Add some shadow for the background img */
  width: 100%;
  margin: 0;
  color: white;
  background-image: url("/assets/tomato-background-timer.jpg");
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

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
  background: linear-gradient(270.42deg, #d75004 0.3%, #8a3403 99.58%);
  position: relative;
  z-index: 1;
  height: 15vh;
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
`

const ButtonsContainer = styled.div`
  background: #4e1e04;
  padding: 20px 0;

  display: flex;
  justify-content: space-evenly;
`

const Icon = styled.i`
  color: #d75004;
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
