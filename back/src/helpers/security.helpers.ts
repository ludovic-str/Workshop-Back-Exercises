import jwt from "jsonwebtoken";
import HttpStatus from "http-status";

import ENV from "../env";
import ClientError from "../error";
import { UserInfos } from "../types/global.types";
import { FastifyRequest } from "fastify";

const decodeToken = (token: string) => {
  const data = jwt.verify(token, ENV.secret);

  if (!(typeof data === "object")) {
    throw new ClientError({
      name: "ERROR_AUTHENTICATION",
      level: "warm",
      status: HttpStatus.UNAUTHORIZED,
      message: "Invalid token",
    });
  }

  const userInfos = data as UserInfos;
  return userInfos;
};

const getUserInfos = (req: FastifyRequest) => {
  const userInfo = req.user;

  if (!userInfo) {
    throw new ClientError({
      name: "UNAUTHORIZED",
      level: "warm",
      status: HttpStatus.UNAUTHORIZED,
      message: "Invalid token",
    });
  }

  return userInfo;
};

export default { decodeToken, getUserInfos };
