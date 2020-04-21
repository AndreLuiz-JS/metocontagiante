import styled from 'styled-components';

export const Section = styled.section`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width:100%;
    margin: 0 auto;
    padding:30px;
    max-width:1280px;
    font-size:1.5rem;
    border-radius: 10px;
    background-color:${props => props.theme.colors.backgroundSecondary};
    button {
        margin:0 10px;
    }
    & h1, h2 {
        text-transform:uppercase;
        font-size:1.8rem;
    }
    & h2 {
        font-size:1.5rem;
        padding-top:10px;
        color:${props => props.theme.colors.secondary};
    }
    & p {
        color:${props => props.theme.colors.text};
    }
    
`

export const Form = styled.form`
    display:grid;
    grid-template-columns: 160px auto;
    justify-items:space-between;
    align-items:center;
    gap:10px;
    width:100%;
    padding:30px 0;
    max-width:1280px;
    text-align:right;
    background-color:${props => props.theme.colors.backgroundSecondary};
    & h2 {
        font-size:1.6rem;
        padding-top:30px;
    }
    & label {
        padding:0;
        margin:0;
    }
    & input {
        border-radius:3px;
        height:30px;
        border: none;
        padding: 5px;
        background-color:${props => props.theme.colors.primary};
        color:${props => props.theme.colors.background};
    }
    & button {
        width:80px;
        height:30px;
        border:none;
        padding:5px;
        border-radius:3px;
        background-color:${props => props.theme.colors.primary};
        color:${props => props.theme.colors.background};
        transition:0.3s;
        :hover {
            background-color:${props => props.theme.colors.effect};
        }
    }
    & div {
        grid-column: 1/ span 2;
        text-align:center;
        padding-top:30px;
        font-size:1.9rem;
        & p {
            transition:0.3s;
            color:${props => props.theme.colors.effect};
        }
    }

`