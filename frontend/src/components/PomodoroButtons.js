import React from 'react'
import { useSelector, useDispatch, batch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRedo, faPlayCircle, faTimes, faPauseCircle } from "@fortawesome/free-solid-svg-icons"

import { timer } from "../reducers/timer"
import { ButtonsContainer, InnerButtonContainer, TimerButton, TimerIcon, BigIcon } from "../styled-components/Styling"

const PomodoroButtons = ({ 
  setSeconds,
  setMinutes,
  workMinutes,
  setSecondsLeft,
  totalSeconds,
  work}) => {
  const dispatch = useDispatch()

  const isRunning = useSelector((state) => state.timer.isRunning)
  const activatedButton = useSelector((state) => state.timer.items._id)

  const ReplayIcon = <FontAwesomeIcon icon={faRedo} />
  const PlayIcon = <FontAwesomeIcon icon={faPlayCircle} />
  const StopIcon = <FontAwesomeIcon icon={faTimes} />
  const PauseIcon = <FontAwesomeIcon icon={faPauseCircle} />

  const buttonBackgroundColor = work ? "var(--red)" : "var(--blue)"
  const iconColor = work ? "var(--lightRed)" : "var(--lightBlue)"
  
  const onClickReplay = () => {
    dispatch(timer.actions.setisRunning(false))
    setSeconds(0)
    setMinutes(workMinutes)
    setSecondsLeft(totalSeconds)
  }

  const onClickDelete = () => {
    batch(() => {
      dispatch(timer.actions.setisRunning(false))
      dispatch(timer.actions.deleteItems())
      dispatch(timer.actions.setDescription())
    })
    setSeconds(0)
    setMinutes(workMinutes)
    setSecondsLeft(workMinutes * 60)
  }

  return (
    <>
      <ButtonsContainer buttonBackgroundColor={buttonBackgroundColor}>
        <InnerButtonContainer>
          <TimerButton
            disabled={!activatedButton}
            onClick={onClickReplay}
          >
            <TimerIcon iconColor={iconColor} active>
              {ReplayIcon}
            </TimerIcon>
          </TimerButton>
          {isRunning ? (
            <TimerButton
              disabled={!activatedButton}
              onClick={() => dispatch(timer.actions.setisRunning(false))}
            >
              <BigIcon iconColor={iconColor}>{PauseIcon}</BigIcon>
            </TimerButton>
          ) : (
            <TimerButton
              disabled={!activatedButton}
              onClick={() => dispatch(timer.actions.setisRunning(true))}
            >
              <BigIcon iconColor={iconColor}>{PlayIcon}</BigIcon>
            </TimerButton>
          )}
          <TimerButton
            disabled={!activatedButton}
            onClick={onClickDelete}
          >
            <TimerIcon iconColor={iconColor}>{StopIcon}</TimerIcon>
          </TimerButton>
        </InnerButtonContainer>
      </ButtonsContainer>
    </>
  )
}

export default PomodoroButtons