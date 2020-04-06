import styled from 'styled-components';

export const Container = styled.section`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
`

export const StyledLink = styled.a`
    font-size:1.9rem;
    padding:30px;
    color:${props => props.theme.colors.primary};
    text-decoration:none;
    text-transform: uppercase;


`

export const StyledMap = styled.iframe`
    border: none;
    border-radius:10px;
    width: 90vw;
    height: 75vh;
    margin: auto;
    padding: 5px 0;
`