import React, { useState, useEffect } from "react"
import { useSelector, useDispatch, batch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { API_URL } from "../utils/constants"
import { user } from "../reducers/user"
import { settings } from "../reducers/settings"

import { LoginContainer, FormWrapper, UserInfoWrapper, UserInput, LoginButton, LinkText } from "styled-components/Styling"

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
        if (data.success) {
          console.log(data.response)
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId))
            dispatch(user.actions.setUsername(data.response.username))
            dispatch(user.actions.setAccessToken(data.response.accessToken))
            dispatch(settings.actions.setWorkMinutes(data.response.workMinutes))
            dispatch(settings.actions.setShortBreakMinutes(data.response.shortBreakMinutes))
            dispatch(settings.actions.setLongBreakMinutes(data.response.longBreakMinutes))
            dispatch(user.actions.setError(null))
          })
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null))
            dispatch(user.actions.setUsername(null))
            dispatch(user.actions.setAccessToken(null))
            dispatch(settings.actions.setWorkMinutes(25))
            dispatch(settings.actions.setShortBreakMinutes(5))
            dispatch(settings.actions.setLongBreakMinutes(15))
            dispatch(user.actions.setError(data.response))
          })
        }
      })
  }

  return (
    <>
      <LoginContainer>
        <FormWrapper>
          <h3 style={{ color: "var(--red)" }}>
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
      </LoginContainer>
    </>
  )
}

export default Login
