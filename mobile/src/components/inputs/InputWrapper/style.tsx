import styled from "styled-components/native";

export const Container = styled.View`
  height: 40px;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: ${(props) => props.theme.palette.common.white};
  border-radius: ${(props) => props.theme.borderRadius};
  margin-bottom: 5px;
  padding: 10px;
  border: 2px solid transparent;
  &:focus-within {
    border: 2px solid ${(props) => props.theme.palette.secondary.main};
  }
`;

export const ErrorText = styled.Text`
  color: ${(props) => props.theme.palette.error.main};
  margin-left: 4px;
`;
