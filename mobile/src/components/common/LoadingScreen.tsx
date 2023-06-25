import { ActivityIndicator } from "react-native";
import { Center, Container } from "./Containers";
import { TitleText } from "./Typography";

export function LoadingScreen() {
  return (
    <Container bgcolor="secondary">
      <Center>
        <ActivityIndicator size="large" color="#fff" />
        <TitleText>Loading...</TitleText>
      </Center>
    </Container>
  );
}
