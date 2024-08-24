"use server";

import { db } from "@/db";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { usersTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";

type Params = {
  email: string;
  password: string;
};

export const registerAdminAction = async ({ email, password }: Params) => {
  try {
    //Verify if there is a user already registered with the given email
    const existingAdmin = await db.select().from(usersTable).where(eq(usersTable.email, email));

    if (existingAdmin.length > 0){
        return {
          successMessage: "",
          errorMessage: "User already exists with this email",
        };
    }

    //Hash teh password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    //Insert new admin into the database
    await db.insert(usersTable).values({id: uuidv4(), email: email, password: hashedPassword, role: "admin"});

    return {
      successMessage: "Admin registered successfully",
      errorMessage: "",
    };

  } catch (err: any) {
    return{
        successMessage: "",
        errorMessage: "Error registering admin: " + err.message,
    }
  }

};
