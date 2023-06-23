import styled from "styled-components/native";

export const TitleText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => props.theme.palette.secondary.contrastText};
`;

export const SubtitleText = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.palette.secondary.contrastText};
`;
