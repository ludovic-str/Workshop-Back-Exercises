import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { FastifyPluginOptions } from "fastify/types/plugin";
import httpStatus from "http-status";

import { ProductServices, SaleServices, UserServices } from "../services";
import { FastifyPluginDoneFunction } from "../types/global.types";
import authentificationMiddleware from "../middlewares/authentification.middleware";
import { SecurityHelpers } from "../helpers";

type RegisterRequest = FastifyRequest<{
  Body: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  };
}>;

type LoginRequest = FastifyRequest<{}>;

type CreateSaleRequest = FastifyRequest<{}>;

export default (
  instance: FastifyInstance,
  _opts: FastifyPluginOptions,
  done: FastifyPluginDoneFunction
): void => {
  instance.post("/", async (request: RegisterRequest, reply: FastifyReply) => {
    const { firstname, lastname, email, password } = request.body;

    const token = await UserServices.create(
      firstname,
      lastname,
      email,
      password
    );

    reply.status(httpStatus.OK).send(token);
  });

  instance.get(
    "/me",
    { onRequest: [authentificationMiddleware()] },
    async (req: FastifyRequest, res: FastifyReply) => {
      const userInfos = SecurityHelpers.getUserInfos(req);

      res.status(httpStatus.OK).send();
    }
  );


  done();
};

export const autoPrefix = "/users";
