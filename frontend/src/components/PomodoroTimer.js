// TODO:
// -Mode for timer? useRef hook: useRef is like a “box” that can hold a mutable value in its .current property.
// -Implement an animated progressbar (maybe this one: https://www.npmjs.com/package/react-native-progress-bar-modest)

import React from "react"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"


const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [work, setWork] = useState(false)
  const [isRunning, setIsRunning] = useState(false)

  const hamburgerIcon = <FontAwesomeIcon icon={faBars} />

  useEffect(() => {
    // If the timer is running we want to run this code
    if (isRunning) {
      // The setInterval() method calls a function at specified intervals (in milliseconds).
      let interval = setInterval(() => {
        // clearInterval(interval)

        // To make the countdown for the seconds work properly

        // If seconds are equal to 0 we check if there are minutes left or if the timer has come to an end
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59)
            setMinutes(minutes - 1)
          } else {
            let minutes = work ? 24 : 4
            let seconds = 59

            setSeconds(seconds)
            setMinutes(minutes)
            setWork(!work)
          }
        } else {
          // if seconds are not equal to 0 we lower them by 1
          setSeconds(seconds - 1)
        }
      }, 1000)
      // clearInterval clears the timer set (stops setInterval)
      return () => clearInterval(interval)
    }
  }, [isRunning, work, minutes, seconds])

  // In order to always show two digits for minutes and seconds
  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds

  return (
    <TimerContainer>
      <nav>{hamburgerIcon}</nav>
      <h1>
        {timerMinutes}:{timerSeconds}
      </h1>
      <p>Tap on a task to start</p>
      <div>
        <button
          onClick={() => {
            setIsRunning(false)
            setSeconds(0)
            setMinutes(25)
          }}
        >
          Reset
        </button>
        {isRunning ? (
          <button onClick={() => setIsRunning(false)}> Pause</button>
        ) : (
          <button onClick={() => setIsRunning(true)}>Play</button>
        )}
        {/* By pressing this stop button user returns to mode: Mobile-02 (see Figma sketch) */}
        <button>Stop</button>
      </div>
    </TimerContainer>
  )
}

export default PomodoroTimer

const TimerContainer = styled.div`
	height: 30vh;
  width: 100%;
  background: linear-gradient(270.42deg, #D75004 0.3%, #8A3403 99.58%);
  text-align: center;
  margin: 0;
  color: white;
  nav {
    text-align: right;
    padding-right: 5px;
    font-size: 20px;
  }
  h1 {
    font-size: 48px;
`