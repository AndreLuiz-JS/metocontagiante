import React from 'react';
import styled from 'styled-components';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

const Burgerbutton = (props) => {
  return (
    <Wrapper onClick={props.handleNavbar}>
      <div className={props.navbarState ? "open" : ""}>
        {props.navbarState ?
          <FiChevronLeft size={30} />
          : <FiChevronRight size={30} />}
      </div>
    </Wrapper>
  );
}

export default Burgerbutton;

const Wrapper = styled.div`
  position: fixed;
  left:0;
  padding-top: .7rem;
  cursor: pointer;
  display: block;
  z-index:3;
  color= ${props => props.theme.colors.primary};
  svg{
    transition:0.3s;
    :hover{
      background: ${props => props.theme.colors.effect};
      border-radius:20px;
      filter:opacity(0.8);
    }
  }

`;
