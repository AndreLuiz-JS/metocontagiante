import styled from "styled-components";

const CollapseWrapper = styled.div<{ displaymaxsize: number }>`
	background: ${(props) => props.theme.colors.background};
	position: sticky;
	border-radius: 12px;
	top: 70px;
	left: 0;
	right: 0;
	z-index: 2;
	transition: transform 0.3s ease-in-out, opacity 0.5s linear, height 1s linear;
	@media (min-width: ${(props) => props.displaymaxsize}px) {
		display: none;
	}
	&.hidden {
		pointer-events: none;
		opacity: 0;
		transform: translateY(-250px);
		height: 0;
		z-index: -1;
	}
`;

const NavLinks = styled.ul`
	list-style-type: none;
	padding: 2rem 1rem 2rem 2rem;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 10px;
	align-items: center;
	justify-items: center;
	& li {
		transition: all 300ms linear 0s;
	}
	& a {
		font-size: 1.7rem;
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
`;

export { CollapseWrapper, NavLinks };
