import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import ReactSlider from 'react-slider'
import { user } from '../reducers/user'
import { settings, deleteAccount } from '../reducers/settings'
import { PagesContainer, LoginButton } from "styled-components/Styling"
import styled from 'styled-components'
import './Slider.css'

const Settings = () => {
  const workMinutes = useSelector((state) => state.settings.workMinutes)
  const shortBreakMinutes = useSelector((state) => state.settings.shortBreakMinutes)
  const longBreakMinutes = useSelector((state) => state.settings.longBreakMinutes)
  const accessToken = useSelector((store) => store.user.accessToken)
  const userId = useSelector((store) => store.user.userId)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!accessToken) {
      navigate("/login")
    }
  }, [accessToken, navigate])

  const onDeletingAccount = (accessToken, userId) => {
    dispatch(deleteAccount(accessToken, userId))
    dispatch(user.actions.setAccessToken(null))
  }

  return (
    <SettingsPagesContainer>
      <h2>Settings</h2>
      <h3>Pomodoro-Timer</h3>
      <div>
        <div style={{textAlign:'left'}}>
        <label>Time for work: {workMinutes} {workMinutes > 1 ? 'minutes' : 'minute'}</label>
          <ReactSlider
            className='slider'
            thumbClassName='thumb'
            trackClassName='track'
            value={workMinutes}
            onChange={newValue => dispatch(settings.actions.setWorkMinutes(newValue))}
            min={0}
            max={60}
          />
        <label>Time for short breaks: {shortBreakMinutes} {shortBreakMinutes > 1 ? 'minutes' : 'minute'}</label>
          <ReactSlider
            className='slider blue'
            thumbClassName='thumb'
            trackClassName='track'
            value={shortBreakMinutes}
            onChange={newValue => dispatch(settings.actions.setShortBreakMinutes(newValue))}
            min={0}
            max={60}
          />
        <label>Time for long breaks: {longBreakMinutes} {longBreakMinutes > 1 ? 'minutes' : 'minute'}</label>
          <ReactSlider
            className='slider blue'
            thumbClassName='thumb'
            trackClassName='track'
            value={longBreakMinutes}
            onChange={newValue => dispatch(settings.actions.setLongBreakMinutes(newValue))}
            min={0}
            max={60}
          />
        </div>
       </div>
       <h3>Delete account</h3>
       <p>By clicking on 'Delete Account' you can delete your user account including all the stored data.</p>
       <DeleteButton type='submit' onClick={() => onDeletingAccount(accessToken, userId)}>Delete Account</DeleteButton>
    </SettingsPagesContainer>
  );
};

export default Settings;

/* const Slider = styled(ReactSlider)`
  height: 40px;
  border: 2px solid var(--lightRed);
  border-radius: 20px;
` */

const SettingsPagesContainer = styled(PagesContainer)`
  max-width: 600px;
`

const DeleteButton = styled(LoginButton)`
  width: 250px;
`
