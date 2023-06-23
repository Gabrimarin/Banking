import styled from "styled-components/native";

function getBackgroundColor(props: any) {
  if (!props.bgcolor) {
    return "transparent";
  }
  if (props.bgcolor === "primary") {
    return props.theme.palette.primary.main;
  }
  if (props.bgcolor === "secondary") {
    return props.theme.palette.secondary.main;
  }
  return props.bgcolor;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => getBackgroundColor(props)};
  padding: 20px;
`;
