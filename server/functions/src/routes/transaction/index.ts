import { onRequest } from "firebase-functions/v2/https";
import { firestore } from "../../lib/firestore";

export const deposit = onRequest(async (req, res) => {
  if (req.method === "POST") {
    const { email, amount } = req.body;
    if (!email) {
      res.status(400).send({
        error: "Email is required.",
      });
      return;
    }
    if (!amount || amount <= 0 || isNaN(parseFloat(amount))) {
      res.status(400).send({
        error: "Amount must be a positive number.",
      });
      return;
    }
    try {
      const accountDoc = firestore.doc(`accounts/${email}`);
      const accountSnapshot = await accountDoc.get();
      if (!accountSnapshot.exists) {
        res.status(404).send({
          error: "Account not found.",
        });
        return;
      }
      const oldBalance = accountSnapshot?.data()?.balance;
      const newBalance = oldBalance + amount;
      await firestore.runTransaction(async (transaction) => {
        transaction.update(accountDoc, { balance: newBalance });
        const timestamp = Date.now();
        const transactionDoc = firestore.doc(
          `accounts/${email}/transactions/${timestamp}`
        );
        transaction.set(transactionDoc, {
          type: "deposit",
          amount,
          timestamp,
        });
      });
      res.send({
        message: "Funds deposited successfully.",
        balance: newBalance,
      });
      return;
    } catch (err) {
      res.status(500).send({
        error: "Error depositing funds. Please try again later.",
        devError: JSON.stringify(err),
      });
      return;
    }
  }

  res.status(405).send("Method Not Allowed");
});

export const withdraw = onRequest(async (req, res) => {
  if (req.method === "POST") {
    const { email, amount } = req.body;
    if (!email) {
      res.status(400).send({
        error: "Email is required.",
      });
      return;
    }
    if (!amount || amount <= 0 || isNaN(parseFloat(amount))) {
      res.status(400).send({
        error: "Amount must be a positive number.",
      });
      return;
    }
    try {
      const accountDoc = firestore.doc(`accounts/${email}`);
      const accountSnapshot = await accountDoc.get();
      if (!accountSnapshot.exists) {
        res.status(404).send({
          error: "Account not found.",
        });
        return;
      }
      const oldBalance = accountSnapshot?.data()?.balance;
      const newBalance = oldBalance - amount;
      if (newBalance < 0) {
        res.status(400).send({
          error: "Insufficient funds.",
        });
        return;
      }
      await firestore.runTransaction(async (transaction) => {
        transaction.update(accountDoc, { balance: newBalance });
        const timestamp = Date.now();
        const transactionDoc = firestore.doc(
          `accounts/${email}/transactions/${timestamp}`
        );
        transaction.set(transactionDoc, {
          type: "withdraw",
          amount,
          timestamp,
        });
      });
      res.send({
        message: "Funds withdrawn successfully.",
        balance: newBalance,
      });
      return;
    } catch (err) {
      res.status(500).send({
        error: "Error withdrawing funds. Please try again later.",
        devError: JSON.stringify(err),
      });
      return;
    }
  }
  res.status(405).send("Method Not Allowed");
});

export const transfer = onRequest(async (req, res) => {
  if (req.method === "POST") {
    const { sender, recipient, amount } = req.body;
    if (!sender || !recipient) {
      res.status(400).send({
        error: "Recipient and sender emails are required.",
      });
      return;
    }
    if (!amount || amount <= 0 || isNaN(parseFloat(amount))) {
      res.status(400).send({
        error: "Amount must be a positive number.",
      });
      return;
    }
    try {
      const senderAccountDoc = firestore.doc(`accounts/${sender}`);
      const receiverAccountDoc = firestore.doc(`accounts/${recipient}`);

      const senderAccountSnapshot = await senderAccountDoc.get();
      const receiverAccountSnapshot = await receiverAccountDoc.get();

      if (!senderAccountSnapshot.exists) {
        res.status(404).send({
          error: "Sender Account not found.",
        });
      }

      if (!receiverAccountSnapshot.exists) {
        res.status(404).send({
          error: "Recipient Account not found.",
        });
      }

      await firestore.runTransaction(async (transaction) => {
        const newReceiverBalance =
          receiverAccountSnapshot?.data()?.balance + amount;
        const newSenderBalance =
          senderAccountSnapshot?.data()?.balance - amount;
        if (newSenderBalance < 0) {
          res.status(400).send({
            error: "Insufficient funds.",
          });
          return;
        }
        transaction.update(senderAccountDoc, { balance: newSenderBalance });
        transaction.update(receiverAccountDoc, { balance: newReceiverBalance });
        const timestamp = Date.now();
        const senderTransactionDoc = firestore.doc(
          `accounts/${sender}/transactions/${timestamp}`
        );
        const receiverTransactionDoc = firestore.doc(
          `accounts/${recipient}/transactions/${timestamp}`
        );
        const transactionData = {
          type: "transfer",
          amount,
          timestamp,
          recipient,
          sender,
        };
        transaction.set(senderTransactionDoc, transactionData);
        transaction.set(receiverTransactionDoc, transactionData);
      });
      res.send({
        message: "Funds transferred successfully.",
      });
      return;
    } catch (err) {
      res.status(500).send({
        error: "Error transferring funds. Please try again later.",
      });
      return;
    }
  }

  res.status(405).send("Method Not Allowed");
});
