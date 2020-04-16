import React, { useState } from 'react';

import CollapseButton from './CollapseButton';
import CollapseMenu from './CollapseMenu';


const Navbar = (props) => {
  const [ navbarState, setNavbarState ] = useState(false);
  function handleNavbar() {
    setNavbarState(!navbarState);
  }

  return (
    <>
      <CollapseButton
        navbarState={navbarState}
        handleNavbar={handleNavbar} />
      <CollapseMenu
        navbarState={navbarState}
        handleNavbar={handleNavbar} />

    </>
  )
}

export default Navbar

