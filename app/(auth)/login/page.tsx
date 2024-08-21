import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md flex flex-col items-center justify-center">
      <h1 className="mb-3">Welcome back!</h1>
      <p className="text-center">
        Please log in to your account. If you are an admin, use your admin
        credentials. If you are a user (student or teacher), log in with the
        credentials provided by the administrator.
      </p>
      <div className="flex gap-5 flex-col sm:flex-row w-full my-5">
        <Link
          href="/login-user"
          className="bg-button-bg p-2 w-full rounded-lg text-white text-center font-medium hover:bg-button-bg-hover transition-colors duration-150"
        >
          Login As User
        </Link>
        <Link
          href="/login-admin"
          className="bg-button-bg p-2 w-full rounded-lg text-white text-center font-medium hover:bg-button-bg-hover transition-colors duration-150"
        >
          Login as Admin
        </Link>
      </div>
      <p className="text-center">
        Do you want to create a new admin account?{" "}
        <Link href="/register-admin" className="text-link-text font-medium underline underline-offset-2">
          Register as Admin
        </Link>
      </p>
    </div>
  );
}
