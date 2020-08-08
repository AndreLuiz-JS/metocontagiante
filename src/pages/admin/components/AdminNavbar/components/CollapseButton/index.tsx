import React from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { Wrapper } from "./styles";

const Burgerbutton = (props) => {
	return (
		<Wrapper onClick={props.handleNavbar}>
			<div className={props.navbarState ? "open" : ""}>
				{props.navbarState ? (
					<FiChevronLeft size={30} />
				) : (
					<FiChevronRight size={30} />
				)}
			</div>
		</Wrapper>
	);
};

export default Burgerbutton;
