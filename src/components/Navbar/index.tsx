import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import Brand from "./components/Brand";
import links from "./links";
import BurgerButton from "./components/BurguerButton";
import CollapseMenu from "./components/CollapseMenu";

import { NavBar, NavLinks, FlexContainer, BurgerWrapper } from "./styles";

const Navbar = () => {
	const [navbarOpen, setNavbarOpen] = useState(false);
	const handleNavBar = () => {
		setNavbarOpen(!navbarOpen);
	};
	const disableBurguerMenuScreenSize = 900;

	return (
		<>
			<NavBar>
				<FlexContainer>
					<Brand centermaxsize={disableBurguerMenuScreenSize} />
					<NavLinks>
						{links.map((link, index) => {
							return (
								<li key={index}>
									<NavLink to={link.to}>{link.name}</NavLink>
								</li>
							);
						})}
					</NavLinks>
					<BurgerWrapper>
						<BurgerButton navbarOpen={navbarOpen} handleNavbar={handleNavBar} />
					</BurgerWrapper>
				</FlexContainer>
			</NavBar>
			<CollapseMenu
				navbarOpen={navbarOpen}
				handleNavbar={handleNavBar}
				displayMaxSize={disableBurguerMenuScreenSize - 1}
			/>
		</>
	);
};

export default Navbar;
