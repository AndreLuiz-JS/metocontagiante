import React from "react";
import { NavLink } from "react-router-dom";

import { CollapseWrapper, NavLinks } from "./styles";

import links from "../../links";

const CollapseMenu = (props) => {
	return (
		<CollapseWrapper
			displaymaxsize={props.displayMaxSize}
			className={props.navbarOpen === false ? "hidden" : ""}>
			<NavLinks>
				{links.map((link, index) => {
					return (
						<li key={index}>
							<NavLink onClick={props.handleNavbar} to={link.to}>
								{link.name}
							</NavLink>
						</li>
					);
				})}
			</NavLinks>
		</CollapseWrapper>
	);
};

export default CollapseMenu;
