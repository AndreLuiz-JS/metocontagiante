import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { UserContext } from "../../../../index";
import links from "../../links";

import { CollapseWrapper, NavLinks } from "./styles";

const CollapseMenu = (props) => {
	const { userAccess, userInfo } = useContext(UserContext);
	return (
		<CollapseWrapper className={props.navbarState === true ? "" : "hidden"}>
			<NavLinks>
				<li key={links.length}>
					<p>
						{userInfo.name} <button onClick={logout}>(sair)</button>
					</p>
				</li>
				{links.map((link, index) => {
					if (userAccess.includes(link.user_access))
						return (
							<li key={index} onClick={props.handleNavbar}>
								<NavLink to={link.to}>{link.name}</NavLink>
							</li>
						);
					return null;
				})}
			</NavLinks>
		</CollapseWrapper>
	);

	function logout() {
		localStorage.removeItem("ACCESS_TOKEN");

		window.location.replace("/");
	}
};

export default CollapseMenu;
