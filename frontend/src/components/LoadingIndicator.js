import React from 'react';
import styled from 'styled-components/macro'

const LoadingIndicator = () => {
  return (
    <LoadingOverlay>
      <LoadingSpinner />
    </LoadingOverlay>
  )		
};

export default LoadingIndicator;

const LoadingOverlay = styled.div`
  /*position: absolute;
  top: 0;
  right: 0;
  bottom: 40%;
  left: 0;*/
  display: flex;
  justify-content: center;
  align-items: center;

`

const LoadingSpinner = styled.div`
  width: 25px;
  height: 25px;
  border: 5px solid #dcdcdc;
  border-radius: 50%;
  border-left: 5px solid #D75004;
  animation: spinner infinite 0.5s;

  @keyframes spinner {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`
