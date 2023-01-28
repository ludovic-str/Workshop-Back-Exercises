import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { FastifyPluginOptions } from "fastify/types/plugin";
import httpStatus from "http-status";

import { ProductServices, SaleServices, UserServices } from "../services";
import { FastifyPluginDoneFunction } from "../types/global.types";
import authentificationMiddleware from "../middlewares/authentification.middleware";
import { SecurityHelpers } from "../helpers";

type RegisterRequest = FastifyRequest<{}>;

type LoginRequest = FastifyRequest<{}>;

type CreateSaleRequest = FastifyRequest<{}>;

export default (
  instance: FastifyInstance,
  _opts: FastifyPluginOptions,
  done: FastifyPluginDoneFunction
): void => {
  done();
};

export const autoPrefix = "/users";
