import styled from "styled-components/native";
import {
  TransactionType,
  transactionTypesData,
} from "../../../../ts/types/transaction.types";

export const TransactionButtonContainer: {
  (props: {
    onPress: () => void;
    color: string;
    children: React.ReactNode;
  }): JSX.Element;
} = styled.TouchableOpacity`
  border-radius: 50px;
  background-color: white;
  width: 100px;
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-color: ${(props: { color: string }) => props.color};
`;

export const TransactionButtonText: {
  (props: { color: string; children: React.ReactNode }): JSX.Element;
} = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${(props: { color: string }) => props.color};
`;
