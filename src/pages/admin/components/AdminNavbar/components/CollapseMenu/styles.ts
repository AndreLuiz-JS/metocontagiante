import styled from "styled-components";

const CollapseWrapper = styled.div`
	background: ${(props) => props.theme.colors.background}f8;
	position: absolute;
	border-radius: 12px;
	padding: 20px;
	top: 0;
	left: 0;
	z-index: 3;
	transition: transform 0.2s ease-in-out, opacity 0.3s ease-in;
	transform: translate(20px, 20px);
	&.hidden {
		transform: translateX(-150px);
		opacity: 0;
		pointer-events: none;
	}
	@media (min-width: 1803px) {
		&.hidden {
			transform: translate(20px, 20px);
			opacity: 1;
			pointer-events: all;
		}
	}
`;

const NavLinks = styled.ul`
	list-style-type: none;
	padding: 0.5rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-items: center;
	& li {
		transition: all 300ms linear 0s;
		p {
			color: ${(props) => props.theme.colors.secondary};
			text-transform: capitalize;
			padding: 10px 0;
			font-size: 1.3rem;
			button {
				font-size: 1.3rem;
				text-transform: lowercase;
				background: none;
				border: none;
				color: ${(props) => props.theme.colors.secondary};
				transition: 0.3s;
				:hover {
					color: ${(props) => props.theme.colors.effect};
					font-size: 1.6rem;
				}
			}
		}
		& a {
			font-size: 1.3rem;
			line-height: 2;
			color: ${(props) => props.theme.colors.primary};
			text-transform: uppercase;
			text-decoration: none;
			transition: 0.3s;
			cursor: pointer;

			@media (max-width: 480px) {
				font-size: 1.3rem;
			}
		}
		& a:hover {
			color: ${(props) => props.theme.colors.effect};
		}
	}
`;

export { CollapseWrapper, NavLinks };
