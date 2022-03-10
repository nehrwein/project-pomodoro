import React from 'react'
import { NotFoundContainer, NotFoundChild } from "styled-components/Styling"

const NotFound = () => {
  return (
    <NotFoundContainer>
      <NotFoundChild>
        <p>Oops! PAGE NOT FOUND</p>
        <h1>404</h1>
        <h3>WE ARE SORRY. BUT THE PAGE YOU REQUESTED WAS NOT FOUND</h3>
      </NotFoundChild>
    </NotFoundContainer>
  )
}

export default NotFound

