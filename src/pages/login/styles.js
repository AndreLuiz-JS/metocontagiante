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
    text-align:center;
    text-indent: 4rem;
    background-color:${props => props.theme.colors.backgroundSecondary};
    & div {
        grid-column: 1 / span 2;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        margin:0 auto;
        & span {
            padding:20px;
            font-size:1.3rem;
            & a {
                color: ${props => props.theme.colors.primary};
                text-transform: lowercase;
                font-weight: 600;
                border-bottom: 1px solid transparent;
                margin: 0 1.5rem;
                transition: all 300ms linear 0s;
                text-decoration: none;
                cursor: pointer;

                &:hover {
                    color: ${props => props.theme.colors.effect};
                    border-bottom: 1px solid ${props => props.theme.colors.effect};
                }

            }
        }
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