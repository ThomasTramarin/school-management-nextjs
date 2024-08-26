"use client";

import InputField from "@/components/form/InputField";
import SubmitButton from "@/components/form/SubmitButton";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setPending(true);

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.ok) {
        setEmail("");
        setPassword("");
        setError("");

        router.push("/");
      } else {
        if (res?.error === "CredentialsSignin") {
          setError("Invalid email or password");
        } else {
          setError("An unexpected error occurred");
        }
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setPending(false);
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <InputField
        id="email"
        labelText="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        id="password"
        labelText="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <SubmitButton pending={pending}>Login</SubmitButton>
      {error && <p className="text-error-text mt-1">{error}</p>}
      <p className="mt-1">
        Don&apos;t have an account? <Link href="/register-admin" className="text-link-text font-medium">Sign up as admin</Link>
      </p>
    </form>
  );
}
