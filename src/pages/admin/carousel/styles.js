import styled from 'styled-components';

export const Content = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    width:90vw;
    max-width:1200px;
    header, textarea {
        margin:20px 0;
    }
    textarea {
        width:100%;
        min-width:100%;
        max-width:100%;
        min-height:300px;
        height:100%;
        padding:10px;
        border-radius:5px;
        border:none;
    }
    ul {
        display:flex;
        list-style:none;
        justify-content:center;
        min-width:200px;
        flex-direction:row;
        flex-wrap:wrap;
        li {
            display:flex;
            flex-direction:column;
            justify-content:space-between;
            margin: 10px;
            img {
                width:250px;
                border-radius:10px;
                margin:5px;
            }
            button {
                border:none;
                border-radius:5px;
                background:${props => props.theme.colors.primary};
                color:${props => props.theme.colors.backgroundSecondary};
                padding: 5px 10px;
                align-self:center;
                transition:0.3s;
                :hover {
                    background:${props => props.theme.colors.effect};
                    color:${props => props.theme.colors.background};
                    filter:drop-shadow(0 0 3px ${props => props.theme.colors.effect});
                }
            }
        }
    }
`


export const Section = styled.section`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width:100%;
    margin: 0 auto;
    padding:30px;
    max-width:1280px;
    font-size:1.8rem;
    border-radius: 10px;
    background-color:${props => props.theme.colors.backgroundSecondary};

    & p {
        color:${props => props.theme.colors.text};
    }
    & h1 {
        padding:10px 0;
        text-align:center;
    }
    
`
