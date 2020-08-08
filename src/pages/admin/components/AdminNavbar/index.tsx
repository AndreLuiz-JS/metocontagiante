import React, { useState } from "react";

import CollapseButton from "./components/CollapseButton";
import CollapseMenu from "./components/CollapseMenu";

const Navbar = () => {
	const [navbarState, setNavbarState] = useState(false);
	function handleNavbar() {
		setNavbarState(!navbarState);
	}

	return (
		<>
			<CollapseButton navbarState={navbarState} handleNavbar={handleNavbar} />
			<CollapseMenu navbarState={navbarState} handleNavbar={handleNavbar} />
		</>
	);
};

export default Navbar;
