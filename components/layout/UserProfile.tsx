import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { SessionType } from "@/utils/types";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { CgProfile } from "react-icons/cg";

const getUser = async () => {
  const session: SessionType = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error("User is not authenticated or session is invalid");
  }

  try {
    const users = await db
      .select({ email: usersTable.email, role: usersTable.role })
      .from(usersTable)
      .where(
        and(
          eq(usersTable.id, session?.user.id),
          eq(usersTable.role, session?.user.role)
        )
      );
    if (users.length === 1) {
      const user = users[0];
      return user;
    } else {
      return null;
    }
  } catch (err: any) {
    return null;
  }
};

export default async function UserProfile() {
  const user = await getUser();

  return (
    <div className="flex items-center bg-[#86b6ff] px-2 py-1 rounded-lg">
      <CgProfile size={32} className="mr-2"/>
      <div className="flex flex-col">
        <span className="text-black text-sm">{user?.email}</span>
        <span className="text-secondary-text text-sm">{`${user?.role
          .charAt(0)
          .toUpperCase()}${user?.role.slice(1)}`}</span>
      </div>
    </div>
  );
}
