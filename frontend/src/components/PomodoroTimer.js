// TODO:
// -Connect buttons to the timer so that the user can start, pause, refresh and stop it
// -Implement an animated progressbar (maybe this one: https://www.npmjs.com/package/react-native-progress-bar-modest)

import React from "react"
import { useState, useEffect } from "react"
import { TimerContainer } from "styled-components/Styling"

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [displayMessage, setDisplayMessage] = useState(false)
  // const [isPaused, setIsPaused] = useState(true)
  // const [secondsLeft, setSecondsLeft] = useState(0)

  useEffect(() => {
    let interval = setInterval(() => {
      clearInterval(interval)

      // To make the counter for the seconds work properly
      // if seconds are equal to 0 we check if there are minutes left or if the timer has come to an end
      if (seconds === 0) {
        if (minutes !== 0) {
          setSeconds(59)
          setMinutes(minutes - 1)
        } else {
          let minutes = displayMessage ? 24 : 4
          let seconds = 59

          setSeconds(seconds)
          setMinutes(minutes)
          setDisplayMessage(!displayMessage)
        }
      } else {
        // if seconds are not equal to 0 we lower them by 1
        setSeconds(seconds - 1)
      }
    }, 1000)
  }, [displayMessage, minutes, seconds])

  // In order to always show two digits for minutes and seconds
  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds

  return (
    <TimerContainer>
      <div>
        {timerMinutes}:{timerSeconds}
      </div>
      <p>Tap on a task to start</p>
      <div>
        <button>Refresh</button>
        <button>Play</button>
        <button>Pause</button>
        <button>Stop</button>
      </div>
    </TimerContainer>
  )
}

export default PomodoroTimer
