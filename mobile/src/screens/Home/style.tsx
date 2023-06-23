import styled from "styled-components/native";
import {
  TransactionType,
  transactionTypesData,
} from "../../ts/types/transaction.types";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.palette.secondary.main};
`;

export const Header = styled.View`
  width: 100%;
  padding: 20px;
  background-color: ${(props) => props.theme.palette.primary.main};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Body = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${(props) => props.theme.palette.secondary.main};
`;

export const AccountText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.palette.secondary.contrastText};
`;

export const BalanceText = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: ${(props) => props.theme.palette.secondary.contrastText};
`;

export const TransactionContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: ${(props) => props.theme.palette.secondary.contrastText};
  border-radius: 10px;
  margin-top: 10px;
  border-left-width: 5px;
  border-left-color: ${(props: { type: TransactionType }) =>
    transactionTypesData[props.type].colors.primary};
`;

export const TransactionButton = styled.TouchableOpacity`
  border-radius: 50px;
  background-color: white;
  width: 100px;
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-color: ${(props: { type: TransactionType }) =>
    transactionTypesData[props.type].colors.primary};
`;

export const TransactionButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${(props: { type: TransactionType }) =>
    transactionTypesData[props.type].colors.primary};
`;
