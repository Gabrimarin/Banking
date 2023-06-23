import { ThemeProvider } from "styled-components/native";
import RootRoute from "./src/routes/RootRoute";
import { theme } from "./src/styles/theme";
import { RootSiblingParent } from "react-native-root-siblings";
import { AccountContextProvider } from "./src/contexts/account.context";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <AccountContextProvider>
      <RootSiblingParent>
        <ThemeProvider theme={theme}>
          <RootRoute />
        </ThemeProvider>
      </RootSiblingParent>
      <StatusBar barStyle="light-content" />
    </AccountContextProvider>
  );
}
