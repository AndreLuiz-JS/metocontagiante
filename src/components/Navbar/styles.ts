import styled from "styled-components";

const disableBurguerMenuScreenSize = 900;

const NavBar = styled.nav`
	position: sticky;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: 10px 0;
	margin: 0 auto;
	border-radius: 0 0 12px 12px;
	min-width: ${disableBurguerMenuScreenSize - 20}px;
	max-width: 1280px;
	top: 0;
	left: 0;
	background: ${(props) => props.theme.colors.background};
	z-index: 2;
	@media (max-width: ${disableBurguerMenuScreenSize + "px"}) {
		width: 100%;
		min-width: 300px;
	}
`;

const FlexContainer = styled.div`
	width: 100vw;
	display: flex;
	padding: 0 15px;
	align-content: center;
	justify-content: space-between;
	height: 5rem;
	@media (max-width: ${disableBurguerMenuScreenSize}px) {
		& a {
			width: 100vw;
			padding-left: 15px;
		}
	}
`;

const NavLinks = styled.ul`
	display: flex;
	justify-self: end;
	list-style-type: none;
	margin: auto 0;
	font-size: 1.3rem;

	@media (max-width: ${disableBurguerMenuScreenSize}px) {
		display: none;
		visibility: hidden;
	}
	& a {
		color: ${(props) => props.theme.colors.primary};
		text-transform: uppercase;
		font-weight: 600;
		border-bottom: 1px solid transparent;
		margin: 0 1.5rem;
		transition: all 300ms linear 0s;
		text-decoration: none;
		cursor: pointer;

		&:hover {
			color: ${(props) => props.theme.colors.effect};
			border-bottom: 1px solid ${(props) => props.theme.colors.effect};
		}
	}
`;

const BurgerWrapper = styled.div`
	margin: auto 0 auto auto;
	justify-content: end;

	@media (min-width: ${disableBurguerMenuScreenSize - 1}px) {
		display: none;
	}
`;

export { NavBar, NavLinks, FlexContainer, BurgerWrapper };
