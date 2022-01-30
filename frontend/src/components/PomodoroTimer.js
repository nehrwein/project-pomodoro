// TODO:
// -Mode for timer? useRef hook: useRef is like a “box” that can hold a mutable value in its .current property.

import React from "react"
import { useState, useEffect } from "react"
import styled from "styled-components"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo, faPlayCircle, faTimes, faPauseCircle } from '@fortawesome/free-solid-svg-icons'

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [work, setWork] = useState(false)
  const totalSeconds = !work ? 24 * 60 : 4 * 60
  const [isRunning, setIsRunning] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds)

  const ReplayIcon = <FontAwesomeIcon icon={faRedo} />
  const PlayIcon = <FontAwesomeIcon icon={faPlayCircle} />
  const StopIcon = <FontAwesomeIcon icon={faTimes} />
  const PauseIcon = <FontAwesomeIcon icon={faPauseCircle} />

  const percentage = Math.round(secondsLeft / totalSeconds * 100) 

  useEffect(() => {
    // If the timer is running we want to run this code
    if (isRunning) {
      console.log(percentage)
      console.log(secondsLeft)
      // The setInterval() method calls a function at specified intervals (in milliseconds).
      let interval = setInterval(() => {
        // clearInterval(interval)

        // To make the countdown for the seconds work properly

        // If seconds are equal to 0 we check if there are minutes left or if the timer has come to an end
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59)
            setMinutes(minutes - 1)
            setSecondsLeft(secondsLeft - 1)
          } else {
            let minutes = work ? 24 : 4
            let seconds = 59

            setSeconds(seconds)
            setMinutes(minutes)
            setWork(!work)
            setSecondsLeft(totalSeconds)
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
      <TimeAndTaskContainer percentage={percentage}>
        <h1>
          {timerMinutes}:{timerSeconds}
        </h1>
        <p>Tap on a task to start</p>
      </TimeAndTaskContainer>
      <ButtonsContainer>
        <Button
          onClick={() => {
            setIsRunning(false)
            setSeconds(0)
            setMinutes(25)
          }}
        >
          <Icon active>{ReplayIcon}</Icon>
        </Button>
        {isRunning ? (
          <Button onClick={() => setIsRunning(false)}><BigIcon>{PauseIcon}</BigIcon></Button>
        ) : (
          <Button onClick={() => setIsRunning(true)}><BigIcon>{PlayIcon}</BigIcon></Button>
        )}
        {/* By pressing this stop button user returns to mode: Mobile-02 (see Figma sketch) */}
        <Button><Icon>{StopIcon}</Icon></Button>
      </ButtonsContainer>
    </TimerContainer>
  )
}

export default PomodoroTimer

const TimerContainer = styled.div`
  /*height: 30vh;*/
  width: 100%;
  background: linear-gradient(270.42deg, #D75004 0.3%, #8A3403 99.58%);
  text-align: center;
  margin: 0;
  color: white;

  h1 {
    font-size: 48px;
    margin: 0;
`

const TimeAndTaskContainer = styled.div`
  padding: 20px 0;
  width: ${props => props.percentage}%;
  background-color: grey;

  p {
    color: #FFFFFF99;
  }
`

const ButtonsContainer = styled.div`
  background: #4E1E04;
  padding: 20px 0;

  display: flex; 
  justify-content: space-evenly;
`

const Icon = styled.i`
  color: #D75004;
  font-size: 28px;
`

const BigIcon = styled(Icon)`
  font-size: 50px;
`

const Button = styled.button`
  border: none;
  background-color: transparent;
`



