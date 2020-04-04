import React from 'react';
import styled from 'styled-components';
import { IoIosArrowDropupCircle } from 'react-icons/io';

const ScrollTopButton = (props) => (
  <Button maxScreenSizeVisibility={props.maxScreenSizeVisibility}>
    <a href="#" onClick={moveTop()}>
      <IoIosArrowDropupCircle size={50} />
    </a>
  </Button>
)

export default ScrollTopButton;

const Button = styled.div`
  text-align:center;
    border: none; 
    outline: none;
    cursor: pointer; 
    border-radius:25px;
  a {
    svg {
      color:${props => props.theme.colors.primary}77;
      filter: drop-shadow( 0 0 2px ${props => props.theme.colors.primary}aa);
      transition:all 0.3s;
      :hover {
        color:${props => props.theme.colors.effect};
        filter: drop-shadow( 0 0 8px ${props => props.theme.colors.effect}aa)
      }
    }
  }
  @media(min-width:${props => props.maxScreenSizeVisibility}px){
    visibility:hidden;
  }
`

function moveTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
