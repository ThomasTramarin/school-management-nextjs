import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { SessionType } from "@/utils/types";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session: SessionType = await getServerSession(authOptions);

  //Redirect
  switch (session?.user.role) {
    case "admin":
      redirect("/admin");
    case "teacher":
      redirect("/teacher");
    case "student":
      redirect("/student");
    default:
      redirect("/login");
  }

  return (
    <div className="border border-red-500 h-screen flex items-center justify-center">
      <h1>Redirecting...</h1>
    </div>
  );
}
