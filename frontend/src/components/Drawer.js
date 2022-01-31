import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom';
import styled from "styled-components"

const Drawer = () => {
  const MenuIcon = <FontAwesomeIcon icon={faBars} />
  const CloseIcon = <FontAwesomeIcon icon={faTimes} />

  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)

  const NavigationLinks = [
    {title: 'Home', path: '/'}, 
    {title: 'Settings', path: '/settings'}, 
    {title: 'Report', path: '/report'},
    {title: 'About us', path: '/about'},
  ]

  return (
    <>
      <Navbar>
        <Link to="#"><Icon onClick={showSidebar}>{MenuIcon}</Icon></Link>
        {NavigationLinks.map(item => (
            <NavLink to={item.path} key={item.title}>{item.title}</NavLink>
          ))}
      </Navbar>
      <SideNavigation>
        <Container>
          <Link to="#"><Icon onClick={showSidebar}>{CloseIcon}</Icon></Link>
          {NavigationLinks.map(item => (
            <NavLink to={item.path} key={item.title}>{item.title}</NavLink>
          ))}
        </Container>  
      </SideNavigation>
    </>
  )
}

export default Drawer

const Navbar = styled.div`
  background-color: #060b26;
  height: 80px;
  display: flex;
  justify-content: start;
  align-items: center;
`

const Icon = styled.i`
  color: red;
  margin-left: 30px;
  font-size: 28px;
`

const SideNavigation = styled.nav`
  background-color: #060b26;
  width: 45%;
  float: right;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  /* right: -100%; */
  transition: 850ms;

  &active: {
    right: 0;
    transition: 350ms;
  }
`

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`


const NavLink = styled(Link)`
  text-decoration: none;
  display: block;
  width: 95%;
  color: white;
  font-size: 18px;
  padding: 8px 0px 8px 16px;

  :hover {
    background-color: blue;
    transition: ease 0.5s;
  }
`