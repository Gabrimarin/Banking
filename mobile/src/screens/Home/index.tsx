import { useAccountContext } from "../../contexts/account.context";
import {
  AccountText,
  BalanceText,
  Body,
  Container,
  Header,
  TransactionButton,
  TransactionButtonText,
  TransactionContainer,
} from "./style";
import { SubtitleText, TitleText } from "../../components/common/Typography";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useModal } from "../../hooks/modal.hook";
import { useNavigation } from "@react-navigation/native";
import { transactionTypesData } from "../../ts/types/transaction.types";

export function Home() {
  const { account, signOut } = useAccountContext();
  const { email, balance, transactions } = account || {
    email: "",
    balance: 0,
    transactions: [],
  };
  console.log(transactions);
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
            type="deposit"
          >
            <MaterialIcons
              name="arrow-downward"
              size={24}
              color={transactionTypesData["deposit"].colors.primary}
            />
            <TransactionButtonText type="deposit">
              Deposit
            </TransactionButtonText>
          </TransactionButton>
          <TransactionButton
            onPress={() =>
              navigation.navigate("Transaction", { type: "withdraw" })
            }
            type="withdraw"
          >
            <MaterialIcons
              name="arrow-upward"
              size={24}
              color={transactionTypesData["withdraw"].colors.primary}
            />
            <TransactionButtonText type="withdraw">
              Withdraw
            </TransactionButtonText>
          </TransactionButton>
          <TransactionButton
            onPress={() =>
              navigation.navigate("Transaction", { type: "transfer" })
            }
            type="transfer"
          >
            <MaterialIcons
              name="compare-arrows"
              size={24}
              color={transactionTypesData["transfer"].colors.primary}
            />
            <TransactionButtonText type="transfer">
              Transfer
            </TransactionButtonText>
          </TransactionButton>
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
                          <Text>SEND</Text>
                        ) : (
                          <Text>RECEIVED</Text>
                        ))}
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
                    <Text>
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
