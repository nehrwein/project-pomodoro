import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactSlider from 'react-slider'
import { pomosettings } from '../reducers/pomosettings'
import './Slider.css'

const Settings = () => {
  const workMinutes = useSelector((state) => state.pomosettings.workMinutes)
  const breakMinutes = useSelector((state) => state.pomosettings.breakMinutes)
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
      <label>break: {breakMinutes} minutes</label>
        <ReactSlider
          className='slider blue'
          thumbClassName='thumb'
          trackClassName='track'
          value={breakMinutes}
          onChange={newValue => dispatch(pomosettings.actions.setBreakMinutes(newValue))}
          min={0}
          max={60}
        />
    </div>
    </div>
  );
};

export default Settings;
