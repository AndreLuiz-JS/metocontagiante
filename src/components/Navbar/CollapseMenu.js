import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

import links from './links';

const CollapseMenu = (props) => {
  const { open } = useSpring({ open: props.navbarState ? 0 : 1 });

  if (props.navbarState === true) {
    return (
      <CollapseWrapper style={{
        transform: open.interpolate({
          range: [ 0, 0.2, 0.3, 1 ],
          output: [ 0, -20, 0, -200 ],
        }).interpolate(openValue => `translate3d(0, ${openValue}px, 0`),
      }
      }
        displaymaxsize={props.displayMaxSize}
      >
        <NavLinks>
          {links.map((link, index) => {
            return (
              <li key={index}><NavLink onClick={props.handleNavbar} to={link.to}>{link.name}</NavLink></li>
            )
          })}
        </NavLinks>
      </CollapseWrapper>
    );
  }
  return null;
};

export default CollapseMenu;

const CollapseWrapper = styled(animated.div)`
  background: ${props => props.theme.colors.background};
  position: sticky;
  border-radius: 12px;
  top: 70px;
  left: 0;
  right: 0;
  z-index:2;
    @media (min-width: ${props => props.displaymaxsize}px) {
      display:none;
    }
`;

const NavLinks = styled.ul`
  list-style-type: none;
  padding: 2rem 1rem 2rem 2rem;
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap:10px;
  align-items:center;
  justify-items:center;
  & li {
    transition: all 300ms linear 0s;
  }
  & a {
    font-size: 1.7rem;
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
