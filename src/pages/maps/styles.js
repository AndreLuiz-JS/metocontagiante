import styled from 'styled-components';

export const Container = styled.section`
    display:flex;
    justify-content:center;
    max-width:1280px;
    margin: 0 auto;
    padding:30px;
    align-items:center;
    flex-direction:column;
    background-color:${props => props.theme.colors.backgroundSecondary}
`

export const StyledLink = styled.a`
    font-size:1.9rem;
    padding:30px;
    color:${props => props.theme.colors.primary};
    text-decoration:none;
    text-transform: uppercase;
    text-align:center;


`

export const StyledMap = styled.iframe`
    border: none;
    border-radius:10px;
    width: 100%;
    height: 75vh;
    margin: auto;
    padding: 5px 0;
`