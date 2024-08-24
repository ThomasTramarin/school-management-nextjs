import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextAuthOptions, User } from "next-auth";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

interface CustomUser extends User {
  id: string;
  role: string;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<CustomUser | null> {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (!credentials) {
          return null;
        }

        try {
          const users = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, email));

          if (!users || users.length === 0) {
            return null;
          }

          const user = users[0];

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            return null;
          } else {
            return { id: user.id, role: user.role };
          }
        } catch (err: any) {
          console.error(err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {

      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {

      return {
        ...session,
        user: {
          id: token.id,
          role: token.role,
        },
      };
    },
  },
  pages: {
    signIn: "login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
