import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import { getLogin } from "@/services/authService";
import { ERROR_MESSAGES, STATUS } from "../../../../../public/const";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const { status, error, accessToken } = await getLogin({
            email: credentials.email,
            password: credentials.password,
          });

          if (status === STATUS.SUCCESS) {
            return {
              id: `id_${credentials.email}`,
              email: credentials.email,
              accessToken,
            };
          }
          throw new Error(error || ERROR_MESSAGES.AUTHENTICATION_FAILED);
        } catch (error) {
          throw new Error(
            error instanceof Error
              ? error.message
              : ERROR_MESSAGES.UNKNOWN_ERROR,
          );
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
