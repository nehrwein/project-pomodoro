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
import styled from "styled-components"

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
    })
  }

  return (
    <>
      {accessToken && (
        <>
          <NavBar>
            <Link to="#">
              <Icon onClick={showSidebar}>{MenuIcon}</Icon>
            </Link>
          </NavBar>
          <SideMenu sidebar={sidebar}>
            <StyledUl>
              <StyledLi>
                <Link to="#">
                  <Icon orange onClick={showSidebar}>
                    {CloseIcon}
                  </Icon>
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

const NavBar = styled.div`
  height: 30px;
  padding: 5px 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  top: 0;
  position: absolute;
`

const Icon = styled.i`
  margin-right: 15px;
  color: ${(props) => (props.orange ? "var(--lightRed)" : window.location.pathname === '/' ? "var(--beige)" : "var(--lightRed)")};
  font-size: 28px;
  background: none;
  z-index: 3;
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 10px;
  margin-top: 5px;

  @media (min-width: 768px) {
    font-size: 40px;
    margin-right: 20px;
  }

  @media (min-width: 768px) {
    font-size: 50px;
    margin-right: 30px;
    margin-top: 20px;
  }
`

const SideMenu = styled.nav`
  background-color: var(--beige);
  border-left: 2px solid var(--lightRed);
  width: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 0;
  right: ${(props) => (props.sidebar ? 0 : "-100%")};
  transition: ${(props) => (props.sidebar ? "350ms" : "850ms")};
  z-index: 3;

  @media (min-width: 768px) {
    width: 400px;
  }

  @media (min-width: 1024px) {
    width: 500px;
  }
`

const NavList = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 0px 8px 32px;
  list-style: none;
  height: 60px;

  @media (min-width: 1024px) {
    padding-left: 80px;
    height: 80px;
  }
`

const NavLink = styled(Link)`
  text-decoration: none;
  color: var(--lightRed);
  font-size: 18px;
  width: 95%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-radius: 4px;

  :hover {
    background-color: var(--lightRed);
    color: var(--beige);
  }

  @media (min-width: 768px) {
    font-size: 30px;
  }

  @media (min-width: 1024px) {
    font-size: 35px;
  }
  
`
const StyledUl = styled.ul`
  width: 100%;
`

const StyledLi = styled.ul`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const LogOutButton = styled.button`
  width: 110px;
  border: 2px solid var(--lightRed);
  cursor: pointer;
  color: var(--lightRed);
  padding: 10px;
  margin: 50px auto;
  border-radius: 4px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  font-size: 14px;
  display: flex;
  justify-content: space-evenly;

  p {
    margin: 0;
    display: inline;
  }

  &:hover {
    background-color: var(--lightRed);
    color: var(--beige);
  }

  @media (min-width: 768px) {
    font-size: 20px;
    width: 150px;
  }

  @media (min-width: 768px) {
    font-size: 25px;
    width: 200px;
  }
`
