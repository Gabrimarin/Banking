import { createContext, useContext, useEffect, useState } from "react";
import { getAccount } from "../services/api/account";
import { Account } from "../ts/types/account.types";
import {
  getStoredString,
  removeStoredString,
  storeString,
} from "../services/storage";
import { View } from "react-native";
import { LoadingScreen } from "../components/common/LoadingScreen";

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
  const [authenticating, setAuthenticating] = useState(false);

  async function signIn(email: string) {
    const response = await getAccount({ email });
    await storeString("email", email);
    setAccount(response.data);
  }

  async function signOut() {
    setAccount(null);
    await removeStoredString("email");
  }

  async function updateAccount() {
    const storedEmail = await getStoredString("email");
    if (storedEmail) return signIn(storedEmail);
    await signOut();
  }

  useEffect(() => {
    async function loadAccount() {
      setAuthenticating(true);
      await updateAccount();
      setAuthenticating(false);
    }

    loadAccount();
  }, []);

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
      {authenticating ? <LoadingScreen /> : children}
    </AccountContext.Provider>
  );
}

export const useAccountContext = () => {
  const { account, setAccount, signIn, signOut, updateAccount, authenticated } =
    useContext(AccountContext);
  return { account, setAccount, signIn, signOut, updateAccount, authenticated };
};
