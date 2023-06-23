import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.palette.secondary.main};
  align-items: center;
  justify-content: center;
`;

export const Form = styled.View`
  width: 100%;
  padding: 0 20px;
`;
