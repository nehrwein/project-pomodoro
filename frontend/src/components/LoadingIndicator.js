import React from "react"
import { LoadingOverlay, LoadingSpinner } from "styled-components/Styling"

const LoadingIndicator = () => {
  return (
    <LoadingOverlay>
      <LoadingSpinner />
    </LoadingOverlay>
  )
}

export default LoadingIndicator


