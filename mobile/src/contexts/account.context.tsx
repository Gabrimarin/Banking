import { createContext, useContext, useState } from "react";
import { getAccount } from "../services/api/account";
import { Account } from "../ts/types/account.types";

const AccountContext = createContext<{
  account: Account | null;
  setAccount: (value: React.SetStateAction<Account | null>) => void;
  signIn: (email: string) => void;
  signOut: () => void;
  updateAccount: () => void;
  authenticated: boolean;
}>({
  account: null,
  setAccount: (value: React.SetStateAction<Account | null>) => {},
  signIn: (email: string) => {},
  signOut: () => {},
  updateAccount: () => {},
  authenticated: false,
});

export function AccountContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [account, setAccount] = useState<Account | null>(null);

  async function signIn(email: string) {
    const response = await getAccount({ email });
    setAccount(response.data);
  }

  function signOut() {
    setAccount(null);
  }

  async function updateAccount() {
    if (!account) {
      return;
    }
    const response = await getAccount({ email: account.email });
    setAccount(response.data);
  }

  return (
    <AccountContext.Provider
      value={{
        account,
        setAccount,
        signIn,
        signOut,
        updateAccount,
        authenticated: !!account,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export const useAccountContext = () => {
  const { account, setAccount, signIn, signOut, updateAccount, authenticated } =
    useContext(AccountContext);
  return { account, setAccount, signIn, signOut, updateAccount, authenticated };
};
