import { ExtendedRequester } from "cote-ext";

export class PluginRequester extends ExtendedRequester {
  constructor(plugin_name: string) {
    try {
      super(
        {
          name: "Plugin Client",
          key: plugin_name,
        },
        {
          log: false,
        }
      );
    } catch (e) {
      throw e as Error;
    }
  }

  async init(
    req?: Record<string, any>,
    cb?: (res: any) => void
  ): Promise<void> {}
}
