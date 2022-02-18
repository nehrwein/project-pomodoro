import React from "react"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { TimeAndTaskContainer, SlidingAnimation, TimerWrapper, TimerContainer } from "styled-components/Styling"
import { timer, addPomodoro } from "../reducers/timer"
import PomodoroButtons from "./PomodoroButtons"

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
  const accessToken = useSelector((state) => state.user.accessToken)
  const userId = useSelector((state) => state.user.userId)
  const [breakMinutes, setBreakMinutes] = useState(shortBreakMinutes)
  const [minutes, setMinutes] = useState(workMinutes)
  const [seconds, setSeconds] = useState(0)
  const [work, setWork] = useState(true)
  const totalSeconds = work ? workMinutes * 60 : breakMinutes * 60
  const isRunning = useSelector((state) => state.timer.isRunning)
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds)
  const description = useSelector((state) => state.timer.items.description)
  const percentage = Math.round((secondsLeft / totalSeconds) * 100)

  const animationColor = work ? "var(--gradientRed)" : "var(--gradientBlue)"

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
      <PomodoroButtons 
        setSeconds={setSeconds}
        setMinutes={setMinutes}
        setSecondsLeft={setSecondsLeft}
        workMinutes={workMinutes}
        totalSeconds={totalSeconds}
        work={work}
      />
    </TimerContainer>
  )
}

export default PomodoroTimer
