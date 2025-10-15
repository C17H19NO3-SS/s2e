import type { ApiPermissions, ApiUser } from "../../Types/Api";

export class ApiPermissionUtils {
  static has(user: ApiUser, permission: ApiPermissions) {
    return user.permissions.includes(permission);
  }
}
