import { View, ViewProps } from "react-native";
import { useTheme } from "styled-components";
import { Container, ErrorText } from "./style";

interface InputWrapperProps extends ViewProps {
  label?: string;
  errorMessage?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

export function InputWrapper({
  label = "",
  children,
  errorMessage = "",
  startAdornment,
  endAdornment,
  ...rest
}: InputWrapperProps) {
  return (
    <View style={{ width: "100%" }} {...rest}>
      <Container>
        {startAdornment && (
          <View
            style={{
              marginRight: 10,
            }}
          >
            {startAdornment}
          </View>
        )}
        {children}
        {endAdornment && (
          <View
            style={{
              marginLeft: "auto",
            }}
          >
            {endAdornment}
          </View>
        )}
      </Container>
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
    </View>
  );
}
