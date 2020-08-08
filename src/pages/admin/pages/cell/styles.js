import React from "react";
import styled from "styled-components";
import Select from "react-select";

import theme from "../../../../styles/themes/default";

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 90vw;
  max-width: 1200px;
  header,
  textarea {
    margin: 20px 0;
  }
  textarea {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    min-height: 300px;
    height: 100%;
    padding: 10px;
    border-radius: 5px;
    border: none;
  }
`;
export const Author = styled.div`
  display: flex;
  font-size: 1rem;
  flex-direction: column;
  align-self: flex-end;
  text-align: right;
  color: ${props => props.theme.colors.secondary};
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  padding-top: 20px;
  width: 100%;
  input,
  select {
    font-size: 2rem;
    width: 100%;
    text-align: left;
    border-radius: 5px;
    padding: 5px;
    margin: 10px 0 20px;
    border: none;
  }
  input[file] {
    padding: 20px;
  }
  div{
    display:flex;
    justify-content:right;
    align-items:flex-start;
    width: 50%;
    margin: 0 auto;
    min-width:500px;
    button {
      position:absolute;
      margin: 20px 20px 0 0;
      width:25px;
      height:25px;
      border-radius:3px;
      border:solid 2px ${props => props.theme.colors.effect};
      transition: 0.3s;
      background:${props => props.theme.colors.effect + '88'};
      color:${props => props.theme.colors.backgroundSecondary};
      :hover {
          background:${props => props.theme.colors.effect};
          color:${props => props.theme.colors.background};
          border:solid 3px ${props => props.theme.colors.effect + '88'};
          filter:drop-shadow(0 0 3px ${props => props.theme.colors.effect});
      }
    }
    img {
      border-radius: 10px;
    }
  }
`;

export const Footer = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    width:100%;
    padding:20px;
    div {
        padding:0 10px;
        input {
            color:${props => props.theme.colors.effect}
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
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  padding: 30px;
  max-width: 1280px;
  font-size: 1.8rem;
  border-radius: 10px;
  background-color: ${props => props.theme.colors.backgroundSecondary};

  & p {
    color: ${props => props.theme.colors.text};
  }
  & h1 {
    padding: 10px 0;
    text-align: center;
  }
`;
export const DropdownCell = styled.ul`
  display: block;
  z-index: 0;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 15px 0 15px 25px;
  background-color: ${props => props.theme.colors.background};
  border-radius: 8px;
`;
export const DropdownBible = styled.ul`
  display: grid;
  grid-template-columns: 4fr 1fr 1fr 1fr 1fr;
  z-index: 0;
  top: 0;
  left: 0;
  right: 0;
  width: 90vw;
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px 0 15px 25px;
  background-color: ${props => props.theme.colors.background};
  border-radius: 8px;
`;
const customDropDownStyle = {
  input: provided => ({
    ...provided,
    color: theme.colors.text,
  }),
  dropdownIndicator: provided => ({
    ...provided,
    marginTop: -45,
    marginLeft: -20,
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isFocused ? theme.colors.background : theme.colors.secondary,
    backgroundColor: state.isFocused
      ? theme.colors.effect
      : theme.colors.backgroundSecondary,
    padding: "5px",
    transition: "0.15s",
  }),
  menu: (provided, state) => ({
    ...provided,
    position: "top",
    width: "auto",
    fontSize: "1.4rem",
    borderBottom: "none",
    color: state.isFocused ? theme.colors.primary : theme.colors.background,
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
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};
export const DropdownItem = props => (
  <Select
    value={props.value}
    onChange={props.onChange}
    options={props.options}
    styles={customDropDownStyle}
    placeholder={props.placeholder}
  />
);
