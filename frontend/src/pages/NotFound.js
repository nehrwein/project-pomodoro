import React from 'react'
import styled from 'styled-components'


 
const NotFound = () => {
  return (
    <CenterContainer>
      <Child>
        <p>Oops! PAGE NOT FOUND</p>
        <h1>404</h1>
        <h3>WE ARE SORRY. BUT THE PAGE YOU REQUESTED WAS NOT FOUND</h3>
      </Child>
    </CenterContainer>
  )
}

export default NotFound

const CenterContainer = styled.main`
  width:100%;
  height:100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  background-image: url("/assets/tomato-background.jpg");
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: center;
  padding-bottom: 50px;
`

const Child = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;

  background-color: white;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.15);
`