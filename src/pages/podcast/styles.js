import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import dark from '../../styles/themes/dark';

export const Dropdown = styled.ul`
    position: sticky;
    z-index:0;
    top:0;
    left:0;
    right:0;
    width:100%;
    margin: 0 auto;
    padding: 15px 0 15px 25px;
    display:flex;
    flex-direction:column;
    justify-content:stretch;
    background-color:${props => props.theme.colors.background};
    border-radius: 8px;
`
const customDropDownStyle = {
    input: (provided) => ({
        ...provided,
        color: dark.colors.text,
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        marginTop: -45,
        marginLeft: -20
    }),
    option: (provided, state) => ({
        ...provided,
        color: state.isFocused ? dark.colors.background : dark.colors.secondary,
        backgroundColor: state.isFocused ? (dark.colors.effect) : (dark.colors.backgroundSecondary),
        padding: "5px",
        transition: "0.15s"

    }),
    menu: (provided, state) => ({
        ...provided,
        width: '100%',
        fontSize: "1.4rem",
        borderBottom: 'none',
        color: state.isFocused ? (dark.colors.primary) : (dark.colors.background),
        backgroundColor: dark.colors.backgroundSecondary,
        marginTop: 0,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        transition: "0.3s",
    }),

    control: (_, { selectProps: { width } }) => ({
        width: width,
        fontSize: "1.9rem",
        filter: "brightness(140%) grayscale(100%)",
        height: 40,
    }),

    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return { ...provided, opacity, transition };
    },

}
export const DropdownItem = (props) => (
    <Select
        value={props.value}
        onChange={props.onChange}
        options={props.options}
        styles={customDropDownStyle}
        placeholder={props.placeholder}
    />
)

export const EmbedPodcast = styled.iframe`
    display:flex;
    justify-content:center;
    width:100%;
    border: none;
    border-radius:10px;
    padding: 0;
    margin: 5px 0;
    @media(max-width:815px){
        height:100px;
    }
`;
export const Section = styled.section`
    display:flex;
    flex-direction:column;
    max-width:1280px;
    font-size:2rem;
    border-radius: 10px;
    margin: 0 auto;
    padding: 15px;
    text-align:left;
    color:${props => props.theme.colors.text};
    background-color:${props => props.theme.colors.backgroundSecondary};
    & h1 {
        font-size:2.3rem;
        text-align:center;
        padding: 30px 0;
        color:${props => props.theme.colors.primary};
        @media(max-width:480px){
            font-size:2rem;
        }
    }

    & p, span {
        font-size:2rem;
        @media(max-width:480px){
            font-size:1.7rem;
        }
    }
`;

export const Podcast = styled.div`
    display:flex;
    align-content:center;
    justify-content:left;
    overflow: hidden;
    margin: 10px auto;
    padding:0;
    min-width:600px;
    background:${props => props.theme.colors.backgroundSecondary};
    border-radius:8px;
    filter: brightness(1.3);
    transition: all 0.3s;
    @media(max-width:640px){
        min-width:200px;
        width:100%;
    }
    :hover{
        cursor:pointer;
        filter: brightness(1.4);
    }
    & div{
        margin: auto 0;
        height:50%;
    }
    img {
        width:100px;
        filter:brightness(0.6);
    }
    h2 {
        margin-left:10px;
        font-size:1.8rem;
        color:${props => props.theme.colors.primary};
        @media(max-width:640px){
            font-size:1.5rem;
            font-weight:400;
        }
    }
    p {
        margin-left:20px;
        font-size:1.6rem;
        color:${props => props.theme.colors.secondary};
        @media(max-width:640px){
            font-size:1.5rem;
        }
    }
`