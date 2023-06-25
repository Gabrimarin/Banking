import { ThemeProvider } from "styled-components/native";
import RootRoute from "./src/routes/RootRoute";
import { theme } from "./src/styles/theme";
import { RootSiblingParent } from "react-native-root-siblings";
import { AccountContextProvider } from "./src/contexts/account.context";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <RootSiblingParent>
      <ThemeProvider theme={theme}>
        <AccountContextProvider>
          <RootRoute />
        </AccountContextProvider>
      </ThemeProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.palette.primary.main}
      />
    </RootSiblingParent>
  );
}
