import React from "react";

import Logo from "../../../../assets/Logo";
import { LinkContainer } from "./styles";

const Brand = (props) => (
	<LinkContainer to="/" centermaxsize={props.centermaxsize}>
		<Logo size={50} color="#fff" />
		<span>Metodista Contagiante</span>
	</LinkContainer>
);

export default Brand;
