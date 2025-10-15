export interface User {
  name?: string;
  permissions: ReadonlyArray<ApiPermissions>;
  iat?: number;
  exp?: number;
  type?: "User" | "ApiKey";
}

export enum ApiPermissions {
  ADMINISTRATOR,
}
