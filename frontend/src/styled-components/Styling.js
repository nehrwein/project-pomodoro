import styled from "styled-components/macro"

export const MainContainer = styled.main`
  height: 100vh;
  width: 100%;
  display: flex;
  position: absolute;
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

export const FormWrapper = styled.div`
  width: 60%;
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--lightRed);

  @media (min-width: 992px) {
    width: auto;
  }
`

export const TaskWrapper = styled(FormWrapper)`
  border-radius: 0 0 10px 10px;
`

export const PomodoroTimerWrapper = styled(FormWrapper)`
  border-radius: 10px 10px 0 0;
  background: var(--gradientRed);

  @media (min-width: 992px) {
    width: 297px;
  }
`

export const UserInfoWrapper = styled.fieldset`
  border: 2px solid var(--lightRed);
  border-radius: 7px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
  margin-bottom: 10px;
  margin-top: 3px;
`

export const UserInput = styled.input`
  border: 1px solid transparent;
  width: 100%;
  height: 100%;
  border: none transparent;
  outline: none;
  font-size: 20px;
`

export const LoginButton = styled.button`
  background-color: var(--lightRed);
  width: 100px;
  display: flex;
  justify-content: center;
  border: none;
  cursor: pointer;
  color: #fff9f5;
  font-size: 20px;
  font-weight: 500;
  padding: 10px;
  margin: 20px auto;
  border-radius: 6px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);

  &:hover {
    background-color: var(--red);
  }
`

export const LinkText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
  border-top: 1px solid #b4b2b2;
  padding: 10px;
  p {
    margin: 5px;
  }
`

export const Icon = styled.i`
  color: var(--lightRed);
  font-size: 20px;
`

export const PagesContainer = styled.div`
  margin: 0 auto;
  width: 80%;
  max-width: 1000px;
  padding-top: 50px;
  text-align: center;
`
