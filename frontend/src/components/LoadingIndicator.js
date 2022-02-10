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
  width: 40px;
  height: 40px;
  border: 5px solid #dcdcdc;
  border-radius: 50%;
  border-left: 5px solid var(--lightRed);
  animation: spinner infinite 0.5s;

  @media (min-width: 768px) {
    height: 80px;
    width: 80px;
    border: 10px solid #dcdcdc;
    border-left: 10px solid var(--lightRed);
  }

  @media (min-width: 1024px) {
    height: 100px;
    width: 100px;
    border: 15px solid #dcdcdc;
    border-left: 15px solid var(--lightRed);
  }

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
