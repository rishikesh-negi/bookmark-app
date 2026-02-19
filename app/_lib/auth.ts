import { createUser, getUser } from "@/app/_lib/data-service";
import NextAuth, { type Session } from "next-auth";
import { AdapterSession, AdapterUser } from "next-auth/adapters";
import Google from "next-auth/providers/google";

export type SessionWithUserId =
  | ({ user: AdapterUser & { userId: number } } & AdapterSession & Session)
  | null;

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },

    async signIn({ user }) {
      try {
        if (!user.name || !user.email) throw new Error("User data not found");

        const existingUser = await getUser(user.email);
        if (!existingUser)
          await createUser({ fullName: user.name, email: user.email });

        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        const authenticatedUser = await getUser(user.email!);
        token.userId = authenticatedUser.id;
      }

      return token;
    },

    async session({ session, token }) {
      if (!token.userId || typeof token.userId !== "number") return session;
      const sessionCopy: SessionWithUserId = {
        ...session,
        user: { ...session.user, userId: token.userId },
      };
      return sessionCopy;
    },
  },
  pages: {
    signIn: "/login",
  },
  trustHost: true,
});
