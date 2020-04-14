import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

import Brand from './Brand';
import links from './links';

const CollapseMenu = (props) => {
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
        <Brand />
        <NavLinks>
          {links.map((link, index) => {
            return (
              <li key={index}><NavLink to={link.to}>{link.name}</NavLink></li>
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
  background: ${props => props.theme.colors.background}cc;
  position: fixed;
  border-radius: 12px;
  padding:20px;
  top: 70px;
  left: 0;
  z-index:2;
    @media (min-width: ${props => props.displayMaxSize}px) {
      display:none;
    }
`;

const NavLinks = styled.ul`
  list-style-type: none;
  padding: 0.5rem;
  display:flex;
  align-items:center;
  justify-items:center;
  & li {
    transition: all 300ms linear 0s;
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
