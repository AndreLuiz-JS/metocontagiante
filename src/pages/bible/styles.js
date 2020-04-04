import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import dark from '../../styles/themes/dark';

export const Dropdown = styled.ul`
    position: sticky;
    z-index:1;
    top:0;
    left:0;
    right:0;
    max-width:1280px;
    margin: 0 auto;
    padding: 15px 0 15px 25px;
    display:grid;
    grid-template-columns: 40% 45% 15%;
    gap:10px;
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

export const Section = styled.section`
    display:flex;
    flex-direction:column;
    max-width:1280px;
    font-size:2rem;
    border-radius: 10px;
    margin: 0 auto;
    padding: 80px 15px 15px;
    text-align:justify;
    text-align-last: left;
    text-indent: 4rem;
    background-color:${props => props.theme.colors.backgroundSecondary};
    & p {
        padding: 1rem;
        & span {
            color:${props => props.theme.colors.text};
            & span {
                color:${props => props.theme.colors.secondary};
            }
        }
    }
`
export const ButtonGroup = styled.nav`
    position: sticky;
    bottom:1vh;
    left:0;
    right:0;
    display:grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    max-width:1280px;
    margin: 15px auto 0;
    justify-content: space-between;
    align-content:center;
    z-index:1;
    background: ${props => props.theme.backgroundSecondary};
    & :last-child{
        justify-self:end;
    }
`

export const Button = styled.button`
    display:flex;
    align-items:center;
    justify-content:space-between;
    margin: 10px;
    padding: 10px;
    width:80px;
    height:30px;
    border-radius:8px;
    background-color: ${props => props.theme.colors.primary}ee;
    color:${props => props.theme.colors.background};
    border:none;
    transition: all 0.3s;
    :hover{
        background-color: ${props => props.theme.colors.effect};
        box-shadow: 0 0 5px ${props => props.theme.colors.effect};
    }
    :disabled{
        opacity:0;
    }
    span {
        color:${props => props.theme.colors.background};
    }

`