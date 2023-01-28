import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

import { Token } from "../types/global.types";
import ClientError from "../error";
import httpStatus from "http-status";
import ENV from "../env";

const prisma = new PrismaClient();

const create = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string
): Promise<Token> => {
  const token = "";

  return { token };
};

export default { create };
