import fastify from "fastify";
import fastifyAutoload from "@fastify/autoload";
import * as path from "path";
import { PrismaClient } from "@prisma/client";
import fastifyCors from "@fastify/cors";

import ENV from "./env";
import { UserInfos } from "./types/global.types";

const prisma = new PrismaClient();
const server = fastify();

declare module "fastify" {
  interface FastifyRequest {
    user: UserInfos | undefined;
  }
}

const main = async () => {
  server.register(fastifyAutoload, {
    dir: path.join(__dirname, "routes"),
  });

  server.register(fastifyCors, {
    credentials: true,
    origin: `http://${ENV.clientUrl}:${ENV.clientPort}`,
  });

  server.listen({ port: parseInt(ENV.port) }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
