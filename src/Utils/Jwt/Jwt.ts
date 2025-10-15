import jwt from "jsonwebtoken";

export class JWT {
  static verify<T>(token: string): T | null {
    try {
      return jwt.verify(token, Bun.env.JWT_SECRET as string) as T;
    } catch {
      return null;
    }
  }

  static generate<T extends string | object | Buffer<ArrayBufferLike>>(
    payload: T
  ) {
    return jwt.sign(payload, Bun.env.JWT_SECRET as string, {
      expiresIn: "12W",
    });
  }
}
