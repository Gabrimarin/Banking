import { api } from ".";

export async function deposit({
  email,
  amount,
}: {
  email: string;
  amount: number;
}) {
  return await api.post("/deposit", {
    email,
    amount,
  });
}

export async function withdraw({
  email,
  amount,
}: {
  email: string;
  amount: number;
}) {
  return await api.post("/withdraw", {
    email,
    amount,
  });
}

export async function transfer({
  senderEmail,
  recipientEmail,
  amount,
}: {
  senderEmail: string;
  recipientEmail: string;
  amount: number;
}) {
  return await api.post("/transfer", {
    recipient: recipientEmail,
    sender: senderEmail,
    amount,
  });
}
