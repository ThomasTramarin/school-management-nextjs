"use server";

import { db } from "@/db";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { adminsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

type Params = {
  email: string;
  password: string;
};

export const registerAdminAction = async ({ email, password }: Params) => {
  try {
    //Verify if there is an admin already registered with the given email
    const existingAdmin = await db.select().from(adminsTable).where(eq(adminsTable.email, email))

    if (existingAdmin.length > 0){
        return {
          successMessage: "",
          errorMessage: "Admin already exists with this email",
        };
    }

    //Hash teh password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    //Insert new admin into the database
    await db.insert(adminsTable).values({id: uuidv4(), email: email, password: hashedPassword});

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
