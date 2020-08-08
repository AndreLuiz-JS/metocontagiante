import styled from "styled-components";

const Button = styled.button<{ maxScreenSizeVisibility: number }>`
	text-align: center;
	border: none;
	outline: none;
	cursor: pointer;
	border-radius: 25px;
	background: none;
	width: 50px;

	svg {
		color: ${(props) => props.theme.colors.primary}77;
		filter: drop-shadow(0 0 2px ${(props) => props.theme.colors.primary}aa);
		transition: all 0.3s;
		:hover {
			color: ${(props) => props.theme.colors.effect};
			filter: drop-shadow(0 0 8px ${(props) => props.theme.colors.effect}aa);
		}
	}

	@media (min-width: ${(props) => props.maxScreenSizeVisibility}px) {
		visibility: hidden;
	}
`;

export { Button };
