import Elysia from "elysia";
import path from "path";
import { Config } from "../Config/App";
import { Logger } from "../Utils/Logger/Logger";
import { autoload } from "elysia-autoload";
import swagger from "@elysiajs/swagger";

export const App = new Elysia();

App.use(
  new Elysia({ prefix: "/api" })
    .use(
      autoload({
        dir: path.join(process.cwd(), "src", "Routers"),
        failGlob: false,
      })
    )
    .use(swagger({ path: "/docs" }))
);

export const StartWebApplication = () => {
  App.listen(Config.port, () => {
    Logger.timeEnd("Web Server", "Initialize Time");
  });
};
