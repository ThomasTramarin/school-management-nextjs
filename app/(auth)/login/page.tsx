import Link from "next/link";
import LoginForm from "./_components/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md flex flex-col items-center justify-center">
      <h1 className="mb-3">Welcome back!</h1>
      <p className="text-secondary-text">Login with your credentials</p>
      <LoginForm />
    </div>
  );
}
