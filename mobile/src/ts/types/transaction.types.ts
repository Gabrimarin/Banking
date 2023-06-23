export type TransactionType = "deposit" | "withdraw" | "transfer";

export const transactionTypesData: {
  [key in TransactionType]: {
    title: string;
    colors: {
      primary: string;
      secondary: string;
    };
  };
} = {
  deposit: {
    title: "Deposit",
    colors: {
      primary: "#4CAF50",
      secondary: "#F4F3F4",
    },
  },
  withdraw: {
    title: "Withdraw",
    colors: {
      primary: "#F44336",
      secondary: "#F4F3F4",
    },
  },
  transfer: {
    title: "Transfer",
    colors: {
      primary: "#2196F3",
      secondary: "#F4F3F4",
    },
  },
};

export type Transaction = {
  timestamp: number;
  type: TransactionType;
  amount: number;
  sender?: string;
  recipient?: string;
};
