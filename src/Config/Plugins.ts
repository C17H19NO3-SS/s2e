export type Config = {
  [key: string]: {
    autoUpdate: boolean;
  };
};

export const PluginConfig: Config = {
  "s2e-simple-plugin": {
    autoUpdate: true,
  },
};
