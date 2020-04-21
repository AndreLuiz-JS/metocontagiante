import React, { useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

import { UserContext } from '../../pages/admin';
import links from './links';

const CollapseMenu = (props) => {
  const { userAccess, userInfo } = useContext(UserContext);
  const { open } = useSpring({ open: props.navbarState ? 0 : 1 });
  if (props.navbarState === true) {
    return (
      <CollapseWrapper style={{
        transform: open.interpolate({
          range: [ 0, 0.2, 0.3, 1 ],
          output: [ 0, -20, 0, -200 ],
        }).interpolate(openValue => `translate3d(${openValue}px,0, 0`),
      }
      }

      >
        <NavLinks>
          <li key={links.length}><p>{userInfo.name} <button onClick={logout}>(sair)</button></p></li>
          {links.map((link, index) => {
            if (userAccess.includes(link.user_access))
              return (
                <li key={index} onClick={props.handleNavbar}><NavLink to={link.to}>{link.name}</NavLink></li>
              )
            return (null)
          })}
        </NavLinks>
      </CollapseWrapper>
    );
  }
  return null;
  function logout() {
    localStorage.removeItem('ACCESS_TOKEN');

    window.location.replace('/');
  }
};

export default CollapseMenu;

const CollapseWrapper = styled(animated.div)`
  background: ${props => props.theme.colors.background}cc;
  position: fixed;
  border-radius: 12px;
  padding:20px;
  top: 70px;
  left: 0;
  z-index:3;
    @media (min-width: ${props => props.displayMaxSize}px) {
      display:none;
    }
`;

const NavLinks = styled.ul`
  list-style-type: none;
  padding: 0.5rem;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-items:center;
  & li {
    transition: all 300ms linear 0s;
    p{
      color:${props => props.theme.colors.secondary};
      text-transform:capitalize;
      padding:10px 0;
      font-size:1.3rem;
        button {
          font-size:1.3rem;
          text-transform:lowercase;
          background:none;
          border:none;
          color:${props => props.theme.colors.secondary};
          transition:0.3s;
          :hover{
            color:${props => props.theme.colors.effect};
            font-size:1.6rem;
          }
        }
  }
  & a {
    font-size: 1.3rem;
    line-height: 2;
    color: ${props => props.theme.colors.primary};
    text-transform: uppercase;
    text-decoration: none;
    transition: 0.3s;
    cursor: pointer;
  
    @media(max-width:480px){
      font-size:1.3rem;
    }
}
  & a:hover {
    color: ${props => props.theme.colors.effect};
}`;
