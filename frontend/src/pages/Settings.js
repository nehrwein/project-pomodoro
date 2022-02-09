import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactSlider from 'react-slider'
import { settings } from '../reducers/settings'
import { PagesContainer } from "styled-components/Styling"
// import styled from 'styled-components'
import './Slider.css'

const Settings = () => {
  const workMinutes = useSelector((state) => state.settings.workMinutes)
  const shortBreakMinutes = useSelector((state) => state.settings.shortBreakMinutes)
  const longBreakMinutes = useSelector((state) => state.settings.longBreakMinutes)
  const dispatch = useDispatch()

  return (
    <PagesContainer>
      <h2>Setttings</h2>
      <h3>Pomodoro-Timer</h3>
      <div>
        <div style={{textAlign:'left'}}>
        <label>Set time for work: {workMinutes} {workMinutes > 1 ? 'minutes' : 'minute'}</label>
          <ReactSlider
            className='slider'
            thumbClassName='thumb'
            trackClassName='track'
            value={workMinutes}
            onChange={newValue => dispatch(settings.actions.setWorkMinutes(newValue))}
            min={0}
            max={60}
          />
        <label>Set time for short breaks: {shortBreakMinutes} {shortBreakMinutes > 1 ? 'minutes' : 'minute'}</label>
          <ReactSlider
            className='slider blue'
            thumbClassName='thumb'
            trackClassName='track'
            value={shortBreakMinutes}
            onChange={newValue => dispatch(settings.actions.setShortBreakMinutes(newValue))}
            min={0}
            max={60}
          />
        <label>Set time for long breaks after 4 pomodoros: {longBreakMinutes} {longBreakMinutes > 1 ? 'minutes' : 'minute'}</label>
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
    </PagesContainer>
  );
};

export default Settings;

/* const Slider = styled(ReactSlider)`
  height: 40px;
  border: 2px solid var(--lightRed);
  border-radius: 20px;
` */
