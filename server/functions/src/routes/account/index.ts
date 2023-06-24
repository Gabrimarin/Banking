import { onRequest } from "firebase-functions/v2/https";
import { firestore } from "../../lib/firestore";

export const account = onRequest(async (req, res) => {
  if (req.method === "POST") {
    const { email } = req.body;
    if (!email) {
      res.status(400).send({
        error: "Email is required.",
      });
      return;
    }

    try {
      const accountDoc = firestore.doc(`accounts/${email}`);
      const accountSnapshot = await accountDoc.get();
      if (accountSnapshot.exists) {
        res.status(400).send({
          error: "Account already exists.",
        });
        return;
      }

      await accountDoc.set({
        email,
        balance: 0,
        transactions: {},
      });

      res.send({
        message: "Account created successfully.",
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        error: "Error creating account. Please try again later.",
        devError: JSON.stringify(err),
      });
      return;
    }
  }

  if (req.method === "GET") {
    const { email } = req.query;
    if (!email) {
      res.status(400).send({
        error: "Email is required.",
      });
      return;
    }
    try {
      const accountDoc = firestore.doc(`accounts/${email}`);
      const accountSnapshot = await accountDoc.get();
      const transactionsSnapshot = await accountDoc
        .collection("transactions")
        .get();
      const transactions = transactionsSnapshot.docs.map((doc) => doc.data());
      if (!accountSnapshot.exists) {
        res.status(404).send({
          error: "Account not found.",
        });
        return;
      }

      res.send({
        email: accountSnapshot?.data()?.email,
        balance: accountSnapshot?.data()?.balance,
        transactions,
      });
    } catch (err) {
      res.status(500).send({
        error: "Error getting account. Please try again later.",
        devError: JSON.stringify(err),
      });
      return;
    }
  }

  res.status(405).send("Method Not Allowed");
  return;
});
