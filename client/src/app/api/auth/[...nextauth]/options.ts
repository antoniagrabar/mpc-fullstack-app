import type { DefaultSession, NextAuthOptions, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

interface MyUser {
  email: string;
  name: string;
  id: string;
}

declare module "next-auth" {
  interface User {
    user: MyUser;
    token: string;
  }
  interface Session extends DefaultSession {
    user: MyUser;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: MyUser;
    accessToken: string;
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWT;
      trigger?: "signIn" | "update" | "signUp";
      user: User;
      session?: Session;
    }) {
      if (user) {
        const jwt = user.token;
        const [, payload] = jwt.split(".");

        const decodedPayload = JSON.parse(atob(payload));

        token.accessToken = user.token;
        token.user = {
          email: decodedPayload.email,
          name: decodedPayload.name,
          id: decodedPayload._id,
        };
      }

      return token;
    },
    async redirect({ baseUrl, url }) {
      const redirectUrl = url.endsWith("/login")
        ? `${baseUrl}/`
        : `${baseUrl}/login`;

      return redirectUrl;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = token.accessToken;
      session.user = token.user;

      return session;
    },
  },
  pages: {
    error: "/login",
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async authorize(data: any) {
        const { email, password } = data;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVICE_PROVIDER_URL}/auth/login`,
          {
            body: JSON.stringify({
              email: email,
              password: password,
            }),
            headers: { "Content-Type": "application/json" },
            method: "POST",
          }
        );
        const user = await res.json();

        if (res.ok && user) {
          return user;
        }

        return null;
      },
      credentials: {},
      name: "Credentials",
    }),
  ],
};
