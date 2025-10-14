import axios from "axios";
import path from "path";
import { $ } from "bun";
import { Logger } from "../Utils/Logger/Logger";

export class PackageController {
  static checkInstalled(name: string): boolean {
    try {
      require.resolve(name);
      return true;
    } catch {
      return false;
    }
  }

  static generatePackageJsonUrl(package_name: string) {
    return `https://unpkg.com/${package_name}/package.json`;
  }

  static async checkUpdate(package_name: string) {
    const {
      data: { version: latest },
    } = await axios.get<{ version: string }>(
      this.generatePackageJsonUrl(package_name)
    );

    const { dependencies = {} } = require(path.join(
      process.cwd(),
      "package.json"
    ));
    const current = dependencies[package_name] as string | undefined;
    const normalized = (v?: string) =>
      typeof v === "string" ? v.replace(/[\^~]+/g, "") : undefined;

    if (normalized(current) !== latest) {
      await this.installExact(package_name, latest); // KRİTİK: await
    }
  }

  static async installExact(package_name: string, version: string) {
    Logger.time("Module Downloader", `${package_name}@${version} Installation`);
    await $`bun add ${package_name}@${version}`.quiet();
    Logger.timeEnd(
      "Module Downloader",
      `${package_name}@${version} Installation`
    );
  }
}
