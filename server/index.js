const functions = require("@google-cloud/functions-framework");
const Firestore = require("@google-cloud/firestore");

const firestore = new Firestore({
  projectId: "banking-390713",
});

functions.http("account", async (req, res) => {
  if (req.method === "POST") {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send({
        error: "Email is required.",
      });
    }

    try {
      const accountDoc = firestore.doc(`accounts/${email}`);
      const accountSnapshot = await accountDoc.get();
      if (accountSnapshot.exists) {
        return res.status(400).send({
          error: "Account already exists.",
        });
      }

      await accountDoc.set({
        email,
        balance: 0,
        transactions: {},
      });

      return res.send({
        message: "Account created successfully.",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).send({
        error: "Error creating account. Please try again later.",
        devError: JSON.stringify(err),
      });
    }
  }

  if (req.method === "GET") {
    const { email } = req.query;
    if (!email) {
      return res.status(400).send({
        error: "Email is required.",
      });
    }
    try {
      const accountDoc = firestore.doc(`accounts/${email}`);
      const accountSnapshot = await accountDoc.get();
      const transactionsSnapshot = await accountDoc
        .collection("transactions")
        .get();
      const transactions = transactionsSnapshot.docs.map((doc) => doc.data());
      if (!accountSnapshot.exists) {
        return res.status(404).send({
          error: "Account not found.",
        });
      }

      return res.send({
        email: accountSnapshot.data().email,
        balance: accountSnapshot.data().balance,
        transactions,
      });
    } catch (err) {
      return res.status(500).send({
        error: "Error getting account. Please try again later.",
        devError: JSON.stringify(err),
      });
    }
  }

  res.status(405).send("Method Not Allowed");
});

functions.http("deposit", async (req, res) => {
  if (req.method === "POST") {
    const { email, amount } = req.body;
    if (!email) {
      return res.status(400).send({
        error: "Email is required.",
      });
    }
    if (!amount || amount <= 0 || isNaN(parseFloat(amount))) {
      return res.status(400).send({
        error: "Amount must be a positive number.",
      });
    }
    try {
      const accountDoc = firestore.doc(`accounts/${email}`);
      const accountSnapshot = await accountDoc.get();
      if (!accountSnapshot.exists) {
        return res.status(404).send({
          error: "Account not found.",
        });
      }
      const oldBalance = accountSnapshot.data().balance;
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
      return res.send({
        message: "Funds deposited successfully.",
        balance: newBalance,
      });
    } catch (err) {
      return res.status(500).send({
        error: "Error depositing funds. Please try again later.",
        devError: JSON.stringify(err),
      });
    }
  }

  res.status(405).send("Method Not Allowed");
});

functions.http("withdraw", async (req, res) => {
  if (req.method === "POST") {
    const { email, amount } = req.body;
    if (!email) {
      return res.status(400).send({
        error: "Email is required.",
      });
    }
    if (!amount || amount <= 0 || isNaN(parseFloat(amount))) {
      return res.status(400).send({
        error: "Amount must be a positive number.",
      });
    }
    try {
      const accountDoc = firestore.doc(`accounts/${email}`);
      const accountSnapshot = await accountDoc.get();
      if (!accountSnapshot.exists) {
        return res.status(404).send({
          error: "Account not found.",
        });
      }
      const oldBalance = accountSnapshot.data().balance;
      const newBalance = oldBalance - amount;
      if (newBalance < 0) {
        return res.status(400).send({
          error: "Insufficient funds.",
        });
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
      return res.send({
        message: "Funds withdrawn successfully.",
        balance: newBalance,
      });
    } catch (err) {
      return res.status(500).send({
        error: "Error withdrawing funds. Please try again later.",
        devError: JSON.stringify(err),
      });
    }
  }
  return res.status(405).send("Method Not Allowed");
});

functions.http("transfer", async (req, res) => {
  if (req.method === "POST") {
    const { sender, recipient, amount } = req.body;
    if (!sender || !recipient) {
      return res.status(400).send({
        error: "Recipient and sender emails are required.",
      });
    }
    if (!amount || amount <= 0 || isNaN(parseFloat(amount))) {
      return res.status(400).send({
        error: "Amount must be a positive number.",
      });
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
          receiverAccountSnapshot.data().balance + amount;
        const newSenderBalance = senderAccountSnapshot.data().balance - amount;
        if (newSenderBalance < 0) {
          return res.status(400).send({
            error: "Insufficient funds.",
          });
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
    } catch (err) {
      res.status(500).send({
        error: "Error transferring funds. Please try again later.",
      });
    }
  }

  res.status(405).send("Method Not Allowed");
});
