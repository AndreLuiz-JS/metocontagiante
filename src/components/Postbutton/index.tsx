import React from "react";
import { IoIosAddCircle } from "react-icons/io";
import { Styledbutton } from "./styles";

export default function Postbutton(props) {
	return (
		<Styledbutton onClick={props.onClick}>
			<IoIosAddCircle size={50} />
		</Styledbutton>
	);
}
