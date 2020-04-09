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
    & h1 {
        font-size:2.3rem;
        color:${props => props.theme.colors.primary}
    }
    & h2 {
        font-size:1.5rem;
        color:${props => props.theme.colors.secondary}
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
export const Verses = styled.div`
    background-color:${props => props.theme.colors.background};
    filter: brightness(0.9);
    display:flex;
    flex-direction:column;
    font-size:2rem;
    border-radius: 10px;
    margin: 15px auto;
    padding: 15px;
    text-align:justify;
    text-align-last: left;
    text-indent: 4rem;
    p {
        padding: 1rem;
        font-size:1.5rem;
    }
    & h1 {
        font-size:2rem;
        color:${props => props.theme.colors.effect};
    }
`

export const DevotionalContent = styled.div`
    text-align:justify;
    text-align-last: left;
    text-indent: 4rem;
`