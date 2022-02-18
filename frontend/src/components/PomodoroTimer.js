import React from "react"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { ButtonsContainer, TimeAndTaskContainer, SlidingAnimation, TimerWrapper, InnerButtonContainer, TimerContainer, TimerButton, TimerIcon, BigIcon } from "styled-components/Styling"
import { timer, addPomodoro } from "../reducers/timer"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faRedo,
  faPlayCircle,
  faTimes,
  faPauseCircle,
} from "@fortawesome/free-solid-svg-icons"

const PomodoroTimer = () => {
  const [counter, setCounter] = useState(1)
  const workMinutes = useSelector((state) => state.settings.workMinutes)
  const shortBreakMinutes = useSelector(
    (state) => state.settings.shortBreakMinutes
  )
  const longBreakMinutes = useSelector(
    (state) => state.settings.longBreakMinutes
  )
  const longBreakTime = counter % 4 === 0
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
            setBreakMinutes(
              longBreakTime ? longBreakMinutes : shortBreakMinutes
            )
            setCounter(work ? counter + 1 : counter)
            work && dispatch(addPomodoro(accessToken, userId))
            setWork(work ? false : true)
            dispatch(timer.actions.setMode(work ? "break" : "work"))
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
    longBreakTime,
  ])

  // In order to always show two digits for minutes and seconds
  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds

  return (
    <TimerContainer work={work}>
      <TimerWrapper>
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
      </TimerWrapper>
      <ButtonsContainer buttonBackgroundColor={buttonBackgroundColor}>
        <InnerButtonContainer>
          <TimerButton
            disabled={!activatedButton}
            onClick={() => {
              setIsRunning(false)
              setSeconds(0)
              setMinutes(workMinutes)
              setSecondsLeft(totalSeconds)
            }}
          >
            <TimerIcon iconColor={iconColor} active>
              {ReplayIcon}
            </TimerIcon>
          </TimerButton>
          {isRunning ? (
            <TimerButton
              disabled={!activatedButton}
              onClick={() => setIsRunning(false)}
            >
              <BigIcon iconColor={iconColor}>{PauseIcon}</BigIcon>
            </TimerButton>
          ) : (
            <TimerButton
              disabled={!activatedButton}
              onClick={() => setIsRunning(true)}
            >
              <BigIcon iconColor={iconColor}>{PlayIcon}</BigIcon>
            </TimerButton>
          )}
          <TimerButton
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
            <TimerIcon iconColor={iconColor}>{StopIcon}</TimerIcon>
          </TimerButton>
        </InnerButtonContainer>
      </ButtonsContainer>
    </TimerContainer>
  )
}

export default PomodoroTimer
