import styled from "styled-components/native";

export const StartIconContainer = styled.View`
  margin-right: 8px;
  margin-left: auto;
`;

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text<{
  color: "primary" | "secondary" | "error";
  variant: "contained" | "text" | "outlined";
}>`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) =>
    props.variant === "contained"
      ? props.theme.palette[props.color].contrastText
      : props.theme.palette[props.color].main};
`;

export const TouchableOpacity = styled.TouchableOpacity<{
  color: "primary" | "secondary" | "error";
  variant: "contained" | "text" | "outlined";
}>`
  border-radius: 100px;
  padding: 10px 16px;
  width: 100%;
  background-color: ${(props) =>
    props.variant === "contained"
      ? props.theme.palette[props.color].main
      : "transparent"};
  border: ${(props) =>
    props.variant === "outlined"
      ? `2px solid ${props.theme.palette[props.color].main}`
      : "none"};
`;
