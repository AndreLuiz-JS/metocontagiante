import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Section = styled.section`
    display:flex;
    flex-direction:column;
    max-width:1280px;
    font-size:2rem;
    border-radius: 10px;
    margin: 30px auto;
    padding: 30px;
    text-align:center;
    text-indent: 4rem;
    background-color:${props => props.theme.colors.backgroundSecondary};
    & p {
        padding:1rem;
        & span {
            color:${props => props.theme.colors.text};
            & span {
                color:${props => props.theme.colors.secondary};
            }
        }
    }

`

export const Brand = styled.img`
    width:100%;
    margin: 0 auto;
    transition: all 0.5s;
    border-radius:10px;
    :hover{
        filter:brightness(1.3);
    }

`
export const Link = styled(NavLink)`
    color: ${props => props.theme.colors.primary};
    font-weight: 600;
    border-bottom: 1px solid transparent;
    transition: all 0.3s;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      color: ${props => props.theme.colors.effect};
      text-decoration: none;
    }
`