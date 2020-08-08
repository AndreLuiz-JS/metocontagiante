import styled from "styled-components";

const Wrapper = styled.div`
	position: fixed;
	left: 10px;
	padding-top: 0.7rem;
	cursor: pointer;
	display: block;
	z-index: 4;
	color: ${(props) => props.theme.colors.primary};
	transform: all 0.3s ease-out;

	@media (min-width: 1803px) {
		opacity: 0;
		pointer-events: none;
	}

	svg {
		transition: all 0.3s ease-in;
		:hover {
			background: ${(props) => props.theme.colors.effect};
			border-radius: 20px;
			filter: opacity(0.8);
		}
	}
`;

export { Wrapper };
