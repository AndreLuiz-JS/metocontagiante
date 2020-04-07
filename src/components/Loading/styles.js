import styled from 'styled-components';

export const Load = styled.div`
    position:fixed;
    display:flex;
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
    background-color:${props => props.theme.colors.backgroundSecondary}ee;
    & span{
        font-size:1.4rem;
        color: ${props => props.theme.colors.primary};
        padding:5px;
    }
`