import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';


const Brand = (props) => (
    <LinkContainer to="/admin" centermaxsize={props.centermaxsize}>
        <span>Administração</span>
    </LinkContainer>
)
const LinkContainer = styled(NavLink)`
    color: ${props => props.theme.colors.primary};
    display: flex;
    align-items:center;
    justify-content:center;
    margin: 5px 0;
    font-size: 2.3rem;
    text-shadow: 0 2px 2px ${props => props.theme.colors.backgroundSecondary} ;
    font-family: 'Roboto', 'Open-Sans', sans-serif;
    line-height: 2;
    text-transform: uppercase;
    text-decoration: none;
    line-height: 1.5rem;
    cursor:default;
    }
    span{
        transition:0.3s;
        padding-bottom:10px;
        font-size:1.4rem;
        @media (max-width: ${props => props.centermaxsize}px) {
            text-align:center;
        }
        @media(max-width:480px){
            font-size:1.2rem;
        }
    }

    &:hover {
      color: ${props => props.theme.colors.secondary};
    }
`

export default Brand;