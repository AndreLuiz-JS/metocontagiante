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
    & h1, h2 {
        text-transform:uppercase;
        font-size:1.8rem;
    }
    & p {
        color:${props => props.theme.colors.text};
    }
    
`

export const Header = styled.div`
    align-self:flex-end;
    font-size:1.2rem;
    & p{
        text-align:right;
        :last-child {
            color:${props => props.theme.colors.secondary};
        }
    }
`
export const Form = styled.form`
    display:grid;
    grid-template-columns: 160px auto 80px;
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
        grid-column: 1/ span 3;
        text-align:center;
        padding-top:30px;
        font-size:1.9rem;
        & p {
            transition:0.3s;
            color:${props => props.theme.colors.effect};
        }
    }

`
export const Dialog = styled.div`
        position:fixed;
        display:flex;
        flex-direction:column;
        z-index:1;
        justify-content:center;
        align-items:center;
        width:100vw;
        height:100vh;
        top:0;
        right:0;
        left:0;
        bottom:0;
        overflow:hidden;
        background:${props => props.theme.colors.backgroundSecondary}ee;
        label {
            text-align:center;
            padding: 10px 0;
        }
        input{
            font-size:1.4rem;
            color: ${props => props.theme.colors.bacngroundSecondary};
            background: ${props => props.theme.colors.primary};
            padding:5px;
            border-radius:5px;
        }
        div {
            display:grid;
            grid-template-columns: 1fr 1fr;
            gap:25px;
            padding:5px;

        }
        button {
            border:none;
            width:80px;
            padding:5px;
            background:${props => props.theme.colors.primary};
            border-radius:5px;
            transition:0.3s;
            :hover {
                background:${props => props.theme.colors.effect};
            }
        }
`