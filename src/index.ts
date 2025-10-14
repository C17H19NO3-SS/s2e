console.clear();

import { StartWebApplication } from "./App/Elysia";
import { Logger } from "./Utils/Logger/Logger";
import { PluginManager } from "./PluginManager/PluginManager";

Logger.time("Plugin Loader", "Initialize Time");
Logger.time("Web Server", "Initialize Time");

new PluginManager();

StartWebApplication();
Logger.timeEnd("Plugin Loader", "Initialize Time");
