import { Transaction } from "./transaction.types";

export type Account = {
  email: string;
  balance: number;
  transactions: Transaction[];
};
