// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    email: string;
    accessToken?: string;
  }

  interface Session {
    user: User;
  }
}
