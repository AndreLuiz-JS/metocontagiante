import React from "react";

import { FiFacebook, FiInstagram } from "react-icons/fi";

import { Container } from "./styles";

const SocialMedia = () => {
	return (
		<Container>
			<a
				target="_blank"
				rel="noopener noreferrer"
				href="http://fb.me/metocontagiante">
				<FiFacebook size={30} />
			</a>
			<a
				target="_blank"
				rel="noopener noreferrer"
				href="http://instagram.com/metodistacontagiante">
				<FiInstagram size={30} />
			</a>
		</Container>
	);
};

export { SocialMedia };
