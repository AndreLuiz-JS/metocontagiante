import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';

import theme from '../../../styles/themes/default';


export const Section = styled.section`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:left;
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
    & button {
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
`
export const Content = styled.div`
    display:flex;
    padding:10px 0;
    & p {
        padding:0 2px;
        color:${props => props.theme.colors.primary};
    }
    & span {
        color:${props => props.theme.colors.secondary}
    }
`

export const Radio = styled.div`
    display:flex;
    padding:10px 0;
    flex-direction:column;
    & div{
        padding-left:15px;
        padding-top:5px;
    }

`

export const DropdownUsers = styled.ul`
    display:block;
    z-index:0;
    top:0;
    left:0;
    right:0;
    width:100%;
    max-width:1280px;
    margin: 0 auto;
    padding: 15px 0 15px 25px;
    background-color:${props => props.theme.colors.background};
    border-radius: 8px;
`
const customDropDownStyle = {
    input: (provided) => ({
        ...provided,
        color: theme.colors.text,
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        marginTop: -45,
        marginLeft: -20
    }),
    option: (provided, state) => ({
        ...provided,
        color: state.isFocused ? theme.colors.background : theme.colors.secondary,
        backgroundColor: state.isFocused ? (theme.colors.effect) : (theme.colors.backgroundSecondary),
        padding: "5px",
        transition: "0.15s"

    }),
    menu: (provided, state) => ({
        ...provided,
        position: 'top',
        width: 'auto',
        fontSize: "1.4rem",
        borderBottom: 'none',
        color: state.isFocused ? (theme.colors.primary) : (theme.colors.background),
        backgroundColor: theme.colors.backgroundSecondary,
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