import React, { useState } from "react";
import { Text, View } from "react-native";
import { Container, Form } from "./style";
import { TextField } from "../../components/inputs/TextField";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "../../components/buttons/Button";
import { Link } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import { useAccountContext } from "../../contexts/account.context";
import { useToast } from "../../hooks/toast.hook";
import axios from "axios";

type FormData = {
  email: string;
};

export function Login() {
  const theme = useTheme();
  const form = useForm<FormData>();
  const { signIn } = useAccountContext();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  async function onSubmit(data: FormData) {
    setLoading(true);
    try {
      await signIn(data.email);
      toast("Login successful!", "success");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.error ?? "Error on login.";
        return toast(message, "error");
      }
      toast("Error on login.", "error");
    } finally {
      setLoading(false);
    }
  }

  function onSetRegisteredEmail(email: string) {
    form.setValue("email", email);
  }

  return (
    <Container>
      <Form>
        <FormProvider {...form}>
          <TextField
            name="email"
            placeholder="Email"
            style={{
              marginBottom: 10,
            }}
          />
          <Button
            loading={loading}
            onPress={form.handleSubmit((data) => onSubmit(data))}
            text="Login"
          />
          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                color: "#fff",
                margin: "auto",
                fontSize: 16,
              }}
            >
              Don't have an account?{" "}
              <Link
                to={{ screen: "Register", params: { onSetRegisteredEmail } }}
                style={{
                  color: theme.palette.common.white,
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                  textDecorationStyle: "solid",
                }}
              >
                Sign Up
              </Link>
            </Text>
          </View>
        </FormProvider>
      </Form>
    </Container>
  );
}
