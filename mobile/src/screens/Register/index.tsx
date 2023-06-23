import React, { useState } from "react";
import { Container, Form } from "./style";
import { TextField } from "../../components/inputs/TextField";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "../../components/buttons/Button";
import { createAccount } from "../../services/api/account";
import { useToast } from "../../hooks/toast.hook";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";

type FormData = {
  email: string;
};

export function Register() {
  const form = useForm<FormData>();
  const toast = useToast();
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as {
    onSetRegisteredEmail: (email: string) => void;
  };
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: FormData) {
    setLoading(true);
    try {
      await createAccount({
        email: data.email,
      });
      toast("Account created successfully!", "success");
      params?.onSetRegisteredEmail(data.email);
      navigation.goBack();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.error;
        return toast(message ?? "Error on account creation.", "error");
      }
      toast("Error on account creation.", "error");
    } finally {
      setLoading(false);
    }
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
            text="Register"
          />
        </FormProvider>
      </Form>
    </Container>
  );
}
