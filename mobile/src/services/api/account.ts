import { api } from ".";
import { Account } from "../../ts/types/account.types";

export async function createAccount({ email }: { email: string }) {
  return await api.post("/account", {
    email,
  });
}

export async function getAccount({ email }: { email: string }) {
  return api.get<Account>(`/account`, {
    params: {
      email,
    },
  });
}
