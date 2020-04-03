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
      }}
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
  position: relative;
  border-radius: 12px;
  top: 0;
  left: 0;
  right: 0;
`;

const NavLinks = styled.ul`
  list-style-type: none;
  padding: 2rem 1rem 2rem 2rem;
  display:grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items:center;
  justify-items:center;
  @media (min-width: 859px) {
    display: none;
  }
  & li {
    transition: all 300ms linear 0s;
  }
  & a {
    font-size: 1.4rem;
    line-height: 2;
    color: ${props => props.theme.colors.primary};
    text-transform: uppercase;
    text-decoration: none;
    transition: 0.3s;
    cursor: pointer;
}
  & a:hover {
    color: ${props => props.theme.colors.effect};
}`;
