import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../screens/Login";
import { Register } from "../screens/Register";
import { useTheme } from "styled-components/native";
import { useAccountContext } from "../contexts/account.context";
import { Home } from "../screens/Home";
import { Transaction } from "../screens/Transaction";
import { TransactionType } from "../ts/types/transaction.types";

type RootStackParamList = {
  Login: {
    email?: string;
  };
  Register: undefined;
  Home: undefined;
  Transaction: {
    type: TransactionType;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootRoute() {
  const theme = useTheme();
  const { authenticated } = useAccountContext();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.palette.primary.main,
          },
          headerTintColor: theme.palette.secondary.contrastText,
          animation: "slide_from_bottom",
        }}
      >
        {authenticated ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Transaction"
              component={Transaction}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              initialParams={{
                email: "",
              }}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                headerTintColor: theme.palette.secondary.contrastText,
                headerStyle: {
                  backgroundColor: theme.palette.primary.main,
                },
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
