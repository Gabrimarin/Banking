import { ActivityIndicator, TouchableOpacityProps } from "react-native";
import { useTheme } from "styled-components/native";
import {
  TouchableOpacity,
  ButtonText,
  Container,
  StartIconContainer,
} from "./style";

interface ButtonProps extends TouchableOpacityProps {
  variant?: "contained" | "text" | "outlined";
  color?: "primary" | "secondary" | "error";
  text?: string;
  loading?: boolean;
  startIcon?: React.ReactNode;
}

export function Button({
  loading = false,
  variant = "contained",
  color = "primary",
  text = "",
  startIcon,
  ...rest
}: ButtonProps) {
  const theme = useTheme();
  return (
    <TouchableOpacity
      variant={variant}
      color={color}
      activeOpacity={0.7}
      disabled={loading}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === "contained"
              ? theme.palette[color].contrastText
              : theme.palette[color].main
          }
        />
      ) : (
        <Container>
          {startIcon && <StartIconContainer>{startIcon}</StartIconContainer>}
          {text ? (
            <ButtonText color={color} variant={variant}>
              {text}
            </ButtonText>
          ) : (
            rest.children
          )}
        </Container>
      )}
    </TouchableOpacity>
  );
}
