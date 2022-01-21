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
  @media (min-width: 992px) {
    width: auto;
  }
`

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [mode, setMode] = useState("signup")

  const accessToken = useSelector((store) => store.user.accessToken)
  const error = useSelector((store) => store.user.error)

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
          <h1>Some Pomodoro title</h1>
          <label htmlFor="signup">Signup</label>
          <input
            id="signup"
            type="radio"
            checked={mode === "signup"}
            onChange={() => setMode("signup")}
          />
          <label htmlFor="signin">Signin</label>
          <input
            id="signin"
            type="radio"
            checked={mode === "signin"}
            onChange={() => setMode("signin")}
          />
          <form onSubmit={onFormSubmit}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">
              {mode === "signup" ? "Submit" : "Log in"}
            </button>
            {error && (
              <div>
                <p>{error}</p>
              </div>
            )}
          </form>
        </FormWrapper>
      </MainContainer>
    </>
  )
}

export default Login
