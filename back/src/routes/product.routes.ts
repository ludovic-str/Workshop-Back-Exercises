import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { FastifyPluginOptions } from "fastify/types/plugin";
import httpStatus from "http-status";

import { FastifyPluginDoneFunction } from "../types/global.types";
import { ProductServices } from "../services";
import authentificationMiddleware from "../middlewares/authentification.middleware";
import { SecurityHelpers } from "../helpers";

type CreateProductRequest = FastifyRequest<{}>;

type DeleteProductRequest = FastifyRequest<{}>;

type LikeProductRequest = FastifyRequest<{}>;

type BuyProductRequest = FastifyRequest<{}>;

export default (
  instance: FastifyInstance,
  _opts: FastifyPluginOptions,
  done: FastifyPluginDoneFunction
): void => {
  done();
};

export const autoPrefix = "/products";
