import styled from "styled-components";

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
  & form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 20px;
    input[type=submit] {
      border: none;
      border-radius: 5px;
      background: ${props => props.theme.colors.primary};
      color: ${props => props.theme.colors.backgroundSecondary};
      padding: 5px 10px;
      transition: 0.3s;
      :hover {
        background: ${props => props.theme.colors.effect};
        color: ${props => props.theme.colors.background};
        filter: drop-shadow(0 0 3px ${props => props.theme.colors.effect});
      }
    }
  }
`;
