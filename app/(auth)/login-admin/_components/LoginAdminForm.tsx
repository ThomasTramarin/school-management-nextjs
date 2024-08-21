"use client";

import InputField from "@/components/form/InputField";
import SubmitButton from "@/components/SubmitButton";
import { useFormState } from "react-dom";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginAdminForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [messageState, setMessageState] = useState({
    errorMessage: "",
    successMessage: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setMessageState({
        errorMessage: "All fields are required",
        successMessage: "",
      });
      return;
    }

    try {
      setPending(true);
      const res = await signIn("credentials", {
        email,
        password,
        userCode: "",
        redirect: false,
      });

      if (!res?.ok) {
        setMessageState({
          errorMessage: "Invalid email or password",
          successMessage: "",
        });
        return;
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setMessageState({ errorMessage: err.message, successMessage: "" });
      return;
    } finally {
      setPending(false);
    }
  };

  return (
    <form className="w-full max-w-md" method="POST" onSubmit={handleSubmit}>
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
      <button
        type="submit"
        className="bg-button-bg hover:bg-button-bg-hover text-white w-full p-2 rounded-lg transition-colors duration-150 flex gap-5 justify-center items-center"
      >
        Login Admin{" "}
        {pending && <ImSpinner8 size={28} className="animate-spin" />}
      </button>
      {messageState.errorMessage ? (
        <div className="text-error-text mt-1" aria-live="polite">
          {messageState.errorMessage}
        </div>
      ) : (
        <div className="text-success-text mt-1" aria-live="polite">
          {messageState.successMessage}
        </div>
      )}
    </form>
  );
}
