import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"
import './Test.css';

const Test = () => {
  const MenuIcon = <FontAwesomeIcon icon={faBars} />
  const CloseIcon = <FontAwesomeIcon icon={faTimes} />
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const NavigationLinks = [
    {title: 'Home', path: '/'}, 
    {title: 'Settings', path: '/settings'}, 
    {title: 'Report', path: '/report'},
    {title: 'About us', path: '/about'},
  ]

  return (
    <>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <i className='menu-icon' onClick={showSidebar}>{MenuIcon}</i>
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
              <i className='menu-icon orange'onClick={showSidebar}>{CloseIcon}</i>
              </Link>
            </li>
            {NavigationLinks.map((item, index) => {
              return (
                <li key={index} className={'nav-text'}>
                  <Link to={item.path}>
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
    </>
  );
}

export default Test;