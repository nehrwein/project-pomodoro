import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactSlider from 'react-slider'
import { pomosettings } from '../reducers/pomosettings'
import './Slider.css'

const Settings = () => {
  const workMinutes = useSelector((state) => state.pomosettings.workMinutes)
  const shortBreakMinutes = useSelector((state) => state.pomosettings.shortBreakMinutes)
  const longBreakMinutes = useSelector((state) => state.pomosettings.longBreakMinutes)
  const dispatch = useDispatch()

  return (
    <div>
      <h2>Settings for pomodoro and user</h2>
      <div style={{textAlign:'left'}}>
      <label>work: {workMinutes} minutes</label>
        <ReactSlider
          className='slider'
          thumbClassName='thumb'
          trackClassName='track'
          value={workMinutes}
          onChange={newValue => dispatch(pomosettings.actions.setWorkMinutes(newValue))}
          min={0}
          max={120}
        />
      <label>short break: {shortBreakMinutes} minutes</label>
        <ReactSlider
          className='slider blue'
          thumbClassName='thumb'
          trackClassName='track'
          value={shortBreakMinutes}
          onChange={newValue => dispatch(pomosettings.actions.setShortBreakMinutes(newValue))}
          min={0}
          max={60}
        />
      <label>long break: {longBreakMinutes} minutes</label>
        <ReactSlider
          className='slider blue'
          thumbClassName='thumb'
          trackClassName='track'
          value={longBreakMinutes}
          onChange={newValue => dispatch(pomosettings.actions.setLongBreakMinutes(newValue))}
          min={0}
          max={60}
        />
    </div>
    </div>
  );
};

export default Settings;
