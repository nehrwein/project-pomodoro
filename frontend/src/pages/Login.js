import React, { useState, useEffect } from "react"
import { useSelector, useDispatch, batch } from "react-redux"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

import { API_URL } from "../utils/constants"
import user from "../reducers/user"

const MainContainer = styled.main`
  height: 100%;
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

const FormWrapper = styled.div`
  width: 60%;
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #d75004;

  @media (min-width: 992px) {
    width: auto;
  }
`

const UserInfoWrapper = styled.fieldset`
  border: 2px solid #d75004;
  border-radius: 7px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
  margin-bottom: 10px;
  margin-top: 3px;
`

const UserInput = styled.input`
  border: 1px solid transparent;
  width: 100%;
  height: 100%;
  border: none transparent;
  outline: none;
  font-size: 20px;
`
const LoginButton = styled.button`
  background-color: #d75004;
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
    background-color: #592101;
  }
`

const LinkText = styled.div`
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

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [mode, setMode] = useState("signin")

  const accessToken = useSelector((store) => store.user.accessToken)
  const error = useSelector((store) => store.user.error)
  console.log('Error: ', error)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (accessToken) {
      navigate("/")
    }
  }, [accessToken, navigate])

  const onFormSubmit = (event) => {
    event.preventDefault()

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }

    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        console.log('data:', data)
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId))
            dispatch(user.actions.setUsername(data.response.username))
            dispatch(user.actions.setAccessToken(data.response.accessToken))
            dispatch(user.actions.setError(null))
          })
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null))
            dispatch(user.actions.setUsername(null))
            dispatch(user.actions.setAccessToken(null))
            dispatch(user.actions.setError(data.response))
          })
        }
      })
  }

  return (
    <>
      <MainContainer>
        <FormWrapper>
          <h3 style={{ color: "#592101" }}>
            {mode === "signin"
              ? "Log in to your account"
              : "Create new account"}
          </h3>
          <form onSubmit={onFormSubmit}>
            <UserInfoWrapper>
              <legend>Username:</legend>
              <UserInput
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </UserInfoWrapper>
            <UserInfoWrapper>
              <legend>Password:</legend>
              <UserInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </UserInfoWrapper>
            {error && (
              <div>
                <p
                  style={{
                    color: "red",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {error}
                </p>
              </div>
            )}
            <LoginButton type="submit">
              {mode === "signup" ? "Submit" : "Log in"}
            </LoginButton>
            <div>
              {mode === "signin" ? (
                <LinkText>
                  <p>New to our app? </p>
                  <p
                    onClick={() => setMode("signup")}
                    style={{
                      fontWeight: "700",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Create an account
                  </p>
                </LinkText>
              ) : (
                <LinkText>
                  <p>Already have an account? </p>
                  <p
                    onClick={() => {
                      setMode("signin")
                      dispatch(user.actions.setError(null))
                      setUsername("")
                      setPassword("")
                    }}
                    style={{
                      fontWeight: "700",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Log in
                  </p>
                </LinkText>
              )}
            </div>
          </form>
        </FormWrapper>
      </MainContainer>
    </>
  )
}

export default Login
