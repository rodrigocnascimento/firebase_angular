import cors from "cors";
import express from "express";
import * as functions from "firebase-functions";
import { getUserCredentialsMiddleware } from "./auth.middleware";
import { auth, db } from "./init";

export const createUserApp = express();

createUserApp.use(express.json());
createUserApp.use(cors({ origin: true }));
createUserApp.use(getUserCredentialsMiddleware);

createUserApp.post("/", async (req, res) => {
  functions.logger.debug(`Calling user function`);
  try {
    if (!(req["uid"] && req["admin"])) {
      const message = `Denied access to user creation service.`;
      functions.logger.debug(message);

      res.status(403).json({ message });
      return;
    }
    const { email, password, admin } = req.body;

    const user = await auth.createUser({
      email,
      password,
    });

    await auth.setCustomUserClaims(user.uid, {
      admin,
    });

    db.doc(`users/${user.uid}`).set({});

    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    functions.logger.error(`Error on creating user function: ${error.message}`);
    res.status(500).json({ message: "User created successfully" });
  }
});
