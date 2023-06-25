import { useAccountContext } from "../../contexts/account.context";
import {
  AccountText,
  BalanceText,
  Body,
  Container,
  Header,
  TransactionContainer,
} from "./style";
import { SubtitleText, TitleText } from "../../components/common/Typography";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { transactionTypesData } from "../../ts/types/transaction.types";
import { TransactionButton } from "./components/TransactionButton";

export function Home() {
  const { account, signOut } = useAccountContext();
  const { email, balance, transactions } = account || {
    email: "",
    balance: 0,
    transactions: [],
  };
  const sortedTransactions = transactions.sort(
    (a, b) => b.timestamp - a.timestamp
  );
  const navigation = useNavigation();
  return (
    <Container>
      <Header>
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <TitleText>Welcome!</TitleText>
          <SubtitleText style={{ marginBottom: 10 }}>
            Account ID: {email}
          </SubtitleText>
        </View>
        <TouchableOpacity onPress={signOut}>
          <MaterialIcons name="exit-to-app" size={24} color="white" />
        </TouchableOpacity>
      </Header>
      <Body>
        <AccountText>Account</AccountText>
        <BalanceText>
          {balance.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </BalanceText>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <TransactionButton
            onPress={() =>
              navigation.navigate("Transaction", { type: "deposit" })
            }
            color={transactionTypesData["deposit"].colors.primary}
            icon="arrow-downward"
            text="Deposit"
          />
          <TransactionButton
            onPress={() =>
              navigation.navigate("Transaction", { type: "withdraw" })
            }
            color={transactionTypesData["withdraw"].colors.primary}
            icon="arrow-upward"
            text="Withdraw"
          />
          <TransactionButton
            onPress={() =>
              navigation.navigate("Transaction", { type: "transfer" })
            }
            color={transactionTypesData["transfer"].colors.primary}
            icon="compare-arrows"
            text="Transfer"
          />
        </View>
        <AccountText style={{ marginTop: 10 }}>Transactions</AccountText>
        <ScrollView>
          {transactions ? (
            transactions?.map((transaction) => {
              return (
                <TransactionContainer
                  type={transaction.type}
                  key={transaction.timestamp}
                >
                  <View>
                    <Text>
                      {transaction.type.toUpperCase()}{" "}
                      {transaction.type === "transfer" &&
                        (transaction.sender === email ? (
                          <Text>SENT</Text>
                        ) : (
                          <Text>RECEIVED</Text>
                        ))}
                    </Text>
                    <Text>
                      {new Date(transaction.timestamp).toLocaleString()}
                    </Text>
                    {transaction.type === "transfer" && (
                      <View>
                        {transaction.sender === email ? (
                          <Text>To: {transaction.recipient}</Text>
                        ) : (
                          <Text>From: {transaction.sender}</Text>
                        )}
                      </View>
                    )}
                  </View>
                  <View>
                    <Text style={{ fontSize: 16 }}>
                      {transaction.amount.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </Text>
                  </View>
                </TransactionContainer>
              );
            })
          ) : (
            <Text
              style={{
                marginTop: 10,
                color: "white",
              }}
            >
              No transactions
            </Text>
          )}
        </ScrollView>
      </Body>
    </Container>
  );
}
