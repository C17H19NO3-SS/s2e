import { Elysia, status, t } from "elysia";
import path from "path";
import { Config } from "../Config/App";
import { Logger } from "../Utils/Logger/Logger";
import { autoload } from "elysia-autoload";
import { swagger } from "@elysiajs/swagger";
import { JWT } from "../Utils/Jwt/Jwt";
import type { ApiPermissions, User } from "../Types/Api";
import { PrismaClient } from "../Prisma/client";
import { permission } from "process";

const App = new Elysia();
const prisma = new PrismaClient();

App.use(
  new Elysia({ prefix: "/api" })
    .group("/v1", (app) =>
      app
        .derive(async ({ request }) => {
          const auth = request.headers.get("authorization") ?? "";
          const isApiKey = auth.startsWith("ApiKey ");

          if (isApiKey) {
            const apiKey = await prisma.apiKeys.findFirst({
              select: {
                permissions: true,
                name: true,
              },
              where: {
                key: auth.slice(7),
              },
            });
            const permissions = JSON.parse(
              (apiKey?.permissions || "{}") as string
            ) as ApiPermissions[];
            if (Array.isArray(permissions))
              return {
                user: {
                  permissions,
                  name: apiKey?.name,
                  type: "ApiKey",
                } as User,
              };
            else return { user: null };
          } else if (auth.startsWith("Bearer "))
            return { user: JWT.verify<User>(auth.slice(7)) };
          else return { user: null };
        })
        .use(
          autoload({
            dir: path.join(process.cwd(), "src", "Routers"),
            failGlob: false,
            ignore: ["**/*.mw.ts"],
          })
        )
        .onBeforeHandle(({ user }) => {
          if (!user)
            return status(403, {
              error: "Forbidden Acess",
            });
        })
        .get("/", (e) => {
          return e.user;
        })
    )
    .use(
      swagger({
        path: "/docs",
        documentation: {
          components: {
            securitySchemes: {
              bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
              },
            },
          },
        },
      })
    )
);

export const StartWebApplication = () => {
  App.listen(Config.port, () => {
    Logger.timeEnd("Web Server", "Initialize Time");
  });
};
