import React, { useEffect, useState } from "react"
import { useSelector, useDispatch, batch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { user } from "../reducers/user"
import { timer } from "../reducers/timer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBars,
  faTimes,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons"
import { NavBar, NavIcon, SideMenu, StyledUl, StyledLi, NavList, NavLink, LogOutButton } from "styled-components/Styling"

const Navigation = () => {
  const dispatch = useDispatch()
  const MenuIcon = <FontAwesomeIcon icon={faBars} />
  const CloseIcon = <FontAwesomeIcon icon={faTimes} />
  const LogOutIcon = <FontAwesomeIcon icon={faSignOutAlt} />
  const [sidebar, setSidebar] = useState(false)
  const accessToken = useSelector((store) => store.user.accessToken)
  const showSidebar = () => setSidebar(!sidebar)
  const navigate = useNavigate()

  const NavigationLinks = [
    { title: "Home", path: "/" },
    { title: "Settings", path: "/settings" },
    { title: "Report", path: "/report" },
    { title: "About us", path: "/about" },
  ]

  useEffect(() => {
    if (!accessToken) {
      navigate("/login")
    }
  }, [accessToken, navigate])
  
  const onClickingLink = () => {
    dispatch(timer.actions.deleteItems())
    dispatch(timer.actions.setisRunning(false))
    setSidebar(false)
  }

  const onLogOut = () => {
    setSidebar(false)
    batch(() => {
      dispatch(user.actions.setUserId(null))
      dispatch(user.actions.setUsername(null))
      dispatch(user.actions.setAccessToken(null))
      dispatch(user.actions.setError(null))
      dispatch(timer.actions.deleteItems())
      dispatch(timer.actions.setMode("work"))
      dispatch(timer.actions.setisRunning(false))
    })
  }

  return (
    <>
      {accessToken && (
        <>
          <NavBar>
            <Link to="#">
              <NavIcon onClick={showSidebar}>{MenuIcon}</NavIcon>
            </Link>
          </NavBar>
          <SideMenu sidebar={sidebar}>
            <StyledUl>
              <StyledLi>
                <Link to="#">
                  <NavIcon orange onClick={showSidebar}>
                    {CloseIcon}
                  </NavIcon>
                </Link>
              </StyledLi>
              {NavigationLinks.map((item, index) => {
                return (
                  <NavList key={index}>
                    <NavLink to={item.path} onClick={() => onClickingLink()}>
                      {item.title}
                    </NavLink>
                  </NavList>
                )
              })}
            </StyledUl>
            <LogOutButton type="submit" onClick={() => onLogOut()}>
              <p>Log out</p>
              <p>{LogOutIcon}</p>
            </LogOutButton>
          </SideMenu>
        </>
      )}
    </>
  )
}

export default Navigation
