import styled from 'styled-components';

export const Form = styled.form`
    display:grid;
    grid-template-columns: 1fr 4fr;
    justify-items:space-between;
    gap:10px;
    max-width:1280px;
    font-size:2rem;
    border-radius: 10px;
    margin: 30px auto;
    padding: 30px;
    text-align:right;
    text-indent: 4rem;
    background-color:${props => props.theme.colors.backgroundSecondary};
    & div {
        grid-column: 1 / span 2;
        justify-self: center;
    }
    & input {
        border-radius:3px;
        border: none;
        padding: 5px;
        background-color:${props => props.theme.colors.primary};
        color:${props => props.theme.colors.background};
    }
    & button {
        width:80px;
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