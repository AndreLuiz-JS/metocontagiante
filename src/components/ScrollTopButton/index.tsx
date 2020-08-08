import React from "react";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { Button } from "./styles";

const ScrollTopButton = (props) => (
	<Button
		maxScreenSizeVisibility={props.maxScreenSizeVisibility}
		onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
		<IoIosArrowDropupCircle size={50} />
	</Button>
);

export default ScrollTopButton;
