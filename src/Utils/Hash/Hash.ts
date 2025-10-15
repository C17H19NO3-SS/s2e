import { createHash } from "crypto";

export class Hash {
  static generateApiKey() {
    createHash("sha256")
      .update(
        Array.prototype.join
          .call(crypto.getRandomValues(new Uint32Array(4)), "")
          .slice(0, 24)
      )
      .digest("hex");
  }
}
