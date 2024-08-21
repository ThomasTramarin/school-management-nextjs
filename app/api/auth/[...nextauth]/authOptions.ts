import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextAuthOptions, User } from "next-auth";
import { db } from "@/db";
import { adminsTable } from "@/db/schema";
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
        userCode: { label: "User Code", type: "text" },
      },
      async authorize(credentials, req): Promise<CustomUser | null> {
        const { email, password, userCode } = credentials as {
          email: string;
          password: string;
          userCode: string;
        };

        if (!credentials) {
          return null;
        }

        try {
          if (userCode && password && !email) {
            //Login as user
            return null;
          } else {
            //Login as admin
            const admins = await db
              .select()
              .from(adminsTable)
              .where(eq(adminsTable.email, email));

            if (!admins || admins.length === 0) {
              return null;
            }

            const admin = admins[0];

            const passwordMatch = await bcrypt.compare(
              password,
              admin.password
            );

            if (!passwordMatch) {
              return null;
            } else {
              return { id: admin.id, role: "admin" };
            }
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
      // Add user id to the token
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      // Add the user id to the session
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
