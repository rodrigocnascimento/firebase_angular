import { auth } from "./init";
import * as functions from "firebase-functions";

export function getUserCredentialsMiddleware(req, res, next) {
  functions.logger.debug(`Attempting to extract user credentials`);

  const jwt = req.headers.authorization;

  if (jwt) {
    auth
      .verifyIdToken(jwt)
      .then((jwtPayload) => {
        req["uid"] = jwtPayload.uid;
        req["admin"] = jwtPayload.admin;

        functions.logger.debug(
          `Credentials: uid=${jwtPayload.uid}, admin=${jwtPayload.admin}`
        );
        next();
      })
      .catch((error) => {
        console.error("Error ocurred while validating JWT", error);
        next();
      });
  } else {
    next();
  }
}
