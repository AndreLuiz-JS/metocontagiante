import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from "styled-components";
import { useSpring, animated, config } from "react-spring";

import Brand from "./Brand";
import links from './links';
import BurgerButton from "./BurgerButton";
import CollapseMenu from "./CollapseMenu";


const Navbar = (props) => {
  const barAnimation = useSpring({
    from: { transform: 'translate3d(0, -10rem, 0)' },
    transform: 'translate3d(0, 0, 0)',
  });
  const linkAnimation = useSpring({
    from: { transform: 'translate3d(0, 30px, 0)', opacity: 0 },
    to: { transform: 'translate3d(0, 0, 0)', opacity: 1 },
    delay: 800,
    config: config.wobbly,
  });
  return (
    <>
      <NavBar style={barAnimation}>
        <FlexContainer>
          <Brand />
          <NavLinks style={linkAnimation}>
            {links.map((link, index) => {
              return (
                <li key={index}><NavLink to={link.to}>{link.name}</NavLink></li>
              )
            })}
          </NavLinks>
          <BurgerWrapper>
            <BurgerButton
              navbarState={props.navbarState}
              handleNavbar={props.handleNavbar}
            />
          </BurgerWrapper>
        </FlexContainer>
      </NavBar>
      <CollapseMenu
        navbarState={props.navbarState}
        handleNavbar={props.handleNavbar}
      />
    </>
  )
}

export default Navbar

const NavBar = styled(animated.nav)`
  position: sticky;
  display:flex;
  align-self: center;
  justify-self:space-between;
  width: 100%;
  padding: 10px 0;
  margin: 0 auto;
  border-radius: 0 0 12px 12px;
  min-width:860px;
  max-width:1280px;
  top: 0;
  left: 0;
  background: ${props => props.theme.colors.background};
  z-index: 1;
  font-size: 1.4rem;
  @media(max-width:860px){
      width:100%;
      min-width:300px;
  }
`;

const FlexContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 350px 500px;
  margin: 0 auto;
  padding: 0 15px;;
  align-content: center;
  justify-content: space-between;
  height: 5rem;
    @media(max-width:860px){
        grid-template-columns: auto 40px;
  }

`;

const NavLinks = styled(animated.ul)`
  display:flex;
  justify-self: end;
  list-style-type: none;
  margin: auto 0;
  @media (max-width: 860px) {
    display: none;
    visibility: hidden;
  }
  & a {
    color: ${props => props.theme.colors.primary};
    text-transform: uppercase;
    font-weight: 600;
    border-bottom: 1px solid transparent;
    margin: 0 1.5rem;
    transition: all 300ms linear 0s;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: ${props => props.theme.colors.effect};
      text-transform:uppercase;
      text-decoration: none;
    }
  }
`;

const BurgerWrapper = styled.div`
  margin: auto 0 auto auto;
  justify-content: end;

  @media (min-width: 859px) {
    display: none;
  }
`;

