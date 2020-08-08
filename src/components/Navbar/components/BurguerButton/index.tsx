import React from 'react';

import { Wrapper } from './styles';

const Burgerbutton = (props) => {
  return (
    <Wrapper onClick={props.handleNavbar}>
      <div className={props.navbarOpen ? "open" : ""}>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
      </div>
    </Wrapper>
  );
}

export default Burgerbutton;
