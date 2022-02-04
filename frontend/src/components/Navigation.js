import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { user } from "../reducers/user"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"

const Navigation = () => {
  const dispatch = useDispatch()
  const MenuIcon = <FontAwesomeIcon icon={faBars} />
  const CloseIcon = <FontAwesomeIcon icon={faTimes} />
  const [sidebar, setSidebar] = useState(false)

  const accessToken = useSelector((store) => store.user.accessToken)

  const showSidebar = () => setSidebar(!sidebar)

  const NavigationLinks = [
    { title: "Home", path: "/" },
    { title: "Settings", path: "/settings" },
    { title: "Report", path: "/report" },
    { title: "About us", path: "/about" },
  ]

  const onLogOut = () => {
    setSidebar(false)
    dispatch(user.actions.setAccessToken(null))
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
                    <NavLink to={item.path}>{item.title}</NavLink>
                  </NavList>
                )
              })}
            </StyledUl>
            <button type="submit" onClick={() => onLogOut()}>
              Log Out
            </button>
          </SideMenu>
        </>
      )}
    </>
  )
}

export default Navigation

const NavBar = styled.div`
  background: linear-gradient(270.42deg, #d75004 0.3%, #8a3403 99.58%);
  height: 30px;
  padding: 5px 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const Icon = styled.i`
  margin-right: 15px;
  color: ${(props) => (props.orange ? "#D75004" : "white")};
  font-size: 28px;
  background: none;
`

const SideMenu = styled.nav`
  background-color: rgb(250, 250, 250);
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
`

const NavList = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 0px 8px 32px;
  list-style: none;
  height: 60px;
`

const NavLink = styled(Link)`
  text-decoration: none;
  color: #d75004;
  font-size: 18px;
  width: 95%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-radius: 4px;

  :hover {
    background-color: #d75004;
    color: white;
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
