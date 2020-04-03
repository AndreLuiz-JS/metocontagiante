import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';


import Logo from '../../assets/Logo';

const Brand = () => (
    <Link to="/" >
        <Logo size={50} color='#fff' />
        <span>Metodista Contagiante</span>
    </Link>
)
const Link = styled(NavLink)`
    color: ${props => props.theme.colors.primary};
    display: flex;
    align-items:center;
    justify-content:space-between;
    margin: 5px 0;
    font-size: 2.3rem;
    font-family: 'Roboto', 'Open-Sans', sans-serif;
    line-height: 2;
    text-transform: uppercase;
    text-decoration: none;
    line-height: 1.5rem;
    cursor:default;
    @media(max-width: 860px){
        width:100%;
        display: grid;
        grid-template-columns: 1fr 12fr;
        grid-gap: 5px;
        justify-content: center;
        padding:0;
        margin:0;

    }
    span{
        padding-left:10px;
        @media(max-width:480px){
            font-size:1.8rem;
        }
        @media (max-width: 860px) {
            text-align:center;
            padding:0;
        }
        transition:0.3s;
    }

    &:hover {
      color: ${props => props.theme.colors.secondary};
    }
`

export default Brand;