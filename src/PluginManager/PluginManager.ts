import { PluginConfig } from "../Config/Plugins";
import { Logger } from "../Utils/Logger/Logger";
import { PackageController } from "../PackageController/PackageController";
import { NodeWorker } from "../Worker/NodeWorker";
import { PluginRequester } from "./PluginRequester";

export class PluginManager {
  private plugins: Map<string, PluginRequester>;

  constructor() {
    this.plugins = new Map();
  }

  async load<T>(plugin_name: string, params?: Record<string, T>) {
    try {
      if (!PackageController.checkInstalled(plugin_name)) return;
      const Package = require(plugin_name);
      new Package.default();
      const plugin = new PluginRequester(plugin_name);
      this.plugins.set(plugin_name, plugin);
      const schema = await plugin.init({
        params,
      });
    } catch (e) {
      console.error(e);
    }
  }

  async initPlugins() {
    for (const [key, value] of Object.entries(PluginConfig)) {
      try {
        Logger.time("Plugin Loader", key);

        if (value.autoUpdate) {
          await PackageController.checkUpdate(key);
        }

        await this.load(key);

        NodeWorker.create(key);

        Logger.timeEnd("Plugin Loader", key);
      } catch (e) {
        Logger.error("Plugin Loader", "Error", (e as Error).message, e);
      }
    }
  }

  getPlugin(plugin_name: string) {
    if (!this.plugins.has(plugin_name)) return null;
    return this.plugins.get(plugin_name);
  }
}
