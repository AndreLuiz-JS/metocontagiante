import { IoIosAddCircle } from 'react-icons/io';
import styled from 'styled-components';

export default function Postbutton() {
    return (
        <Styledbutton><IoIosAddCircle size={30} /></Styledbutton>
    )
}

const Styledbutton = styled.button`
    position:fixed;
    display:flex;
    justify-content:right;
    margin:0 0 0 -40px;
    width:50px;
    height:50px;
    top:80px;
    border: none;
    outline: none;
    cursor: pointer;
    border-radius:25px;
    background:none;


    svg {
        color:${props => props.theme.colors.primary}77;
        filter: drop-shadow( 0 0 2px ${props => props.theme.colors.primary}aa);
        transition:all 0.3s;
        :hover {
        color:${props => props.theme.colors.effect};
        filter: drop-shadow( 0 0 8px ${props => props.theme.colors.effect}aa)
        }
    }
`