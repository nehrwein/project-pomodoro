import React, { useState } from "react"
import styled from "styled-components/macro"

  //This is the "original" checkbox, hidden outside the screen
  const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    border: 0;
    clip: rect(0 0 0 0);
    clippath: inset(50%);
    height: 10px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 10px;
  `

  // This is the checkmark
  const Icon = styled.svg`
    fill: none;
    stroke: white;
    stroke-width: 2px;
  `

  //Custom checkbox that will show on screen
  const StyledCheckbox = styled.div`
    display: inline-block;
    width: 16px;
    height: 16px;
    padding: 2px;
    margin-right: 6px;
    border-radius: 20px;
    border: ${(props) => (props.checked ? "none" : "1px solid var(--lightRed);")};
    background: ${(props) => (props.checked ? "var(--lightRed)" : "white")};

    ${Icon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
    color: ${(props) => (props.checked ? "var(--lightRed)" : "white")}
    }
  `

  const CheckboxContainer = styled.div`
    display: inline-block;
    vertical-align: middle;
  `

export const Checkbox = ({ isChecked, onChange, itemDescription, onClick }) => {
  const [checked, setChecked] = useState(isChecked)

  const handleOnChange = (event) => {
    onChange()
    setChecked(event.target.checked);
  }

  const handleOnClick = () => {
    onClick()
  }

  const Checkbox = ({ className, checked, ...props }) => (
    <CheckboxContainer>
      <HiddenCheckbox checked={checked} {...props}></HiddenCheckbox>
      <StyledCheckbox checked={checked}>
        <Icon viewBox="0 0 24 24">
          <polyline points="20 4 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
  )

  return (
    <div>
      <label onClick={handleOnClick}> 
        <Checkbox checked={checked} onChange={handleOnChange}></Checkbox>
        {itemDescription}
      </label>
    </div>
  )
}