import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { Container } from "../../components/common/Containers";
import {
  TransactionType,
  transactionTypesData,
} from "../../ts/types/transaction.types";
import { TitleText } from "../../components/common/Typography";
import { Controller, FormProvider, useForm } from "react-hook-form";
import CurrencyInput from "react-native-currency-input";
import { useAccountContext } from "../../contexts/account.context";
import { Button } from "../../components/buttons/Button";
import { deposit, transfer, withdraw } from "../../services/api/transaction";
import { useToast } from "../../hooks/toast.hook";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TextField } from "../../components/inputs/TextField";
import axios from "axios";

type FormData = {
  amount: number | null;
  recipient: string;
};

export function Transaction() {
  const { params } = useRoute();
  const { type } = params as { type: TransactionType };
  const [loading, setLoading] = useState(false);
  const { account } = useAccountContext();
  const form = useForm<FormData>({
    defaultValues: {
      amount: 0,
    },
  });
  const transactionData = transactionTypesData[type];
  const toast = useToast();
  const { updateAccount } = useAccountContext();
  const navigation = useNavigation();

  async function onSubmit(data: FormData) {
    setLoading(true);
    try {
      if (type === "deposit") {
        await deposit({
          amount: data.amount ?? 0,
          email: account?.email ?? "",
        });
      }
      if (type === "withdraw") {
        await withdraw({
          amount: data.amount ?? 0,
          email: account?.email ?? "",
        });
      }
      if (type === "transfer") {
        await transfer({
          amount: data.amount ?? 0,
          senderEmail: account?.email ?? "",
          recipientEmail: data.recipient,
        });
      }
      toast("Success", "success");
      await updateAccount();
      navigation.goBack();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.error ?? "Error";
        return toast(message, "error");
      }
      toast("Error", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container bgcolor="secondary">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialIcons name="close" size={24} color="white" />
      </TouchableOpacity>
      <Text style={{ marginTop: 10, color: "white" }}>
        Current balance:{" "}
        <Text style={{ fontWeight: "bold" }}>
          {account?.balance.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </Text>
      </Text>
      <View>
        <TitleText>{transactionData.title}</TitleText>
        <FormProvider {...form}>
          <Controller
            name="amount"
            control={form.control}
            render={({ field: { onChange, value } }) => (
              <CurrencyInput
                prefix="$ "
                delimiter=","
                separator="."
                precision={2}
                minValue={0}
                value={value}
                onChangeValue={(value) => {
                  onChange(value ?? 0);
                }}
                style={{
                  fontSize: 32,
                  color: "#fff",
                }}
              />
            )}
          />

          {type === "transfer" && (
            <TextField
              name="recipient"
              placeholder="Recipient Email"
              style={{
                marginTop: 10,
              }}
            />
          )}
        </FormProvider>
      </View>
      <Button
        onPress={form.handleSubmit(onSubmit)}
        text="Continue"
        style={{ marginTop: "auto" }}
        disabled={!form.watch("amount")}
        loading={loading}
      />
    </Container>
  );
}
