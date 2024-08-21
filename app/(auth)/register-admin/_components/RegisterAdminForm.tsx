"use client";

import InputField from "@/components/form/InputField";
import SubmitButton from "@/components/SubmitButton";
import { registerAdminAction } from "../action";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";

export default function RegisterAdminForm() {
  const [pending, setPending] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [messageState, setMessageState] = useState({
    errorMessage: "",
    successMessage: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!confirmPassword || !password || !email) {
      setMessageState({
        successMessage: "",
        errorMessage: "All fields are required",
      });
      return;
    }

    if (password.length < 8) {
      setMessageState({
        successMessage: "",
        errorMessage: "Password must be at least 8 characters long",
      });
      return;
    }

    if (confirmPassword !== password) {
      setMessageState({
        successMessage: "",
        errorMessage: "Password is incorrect",
      });
      return;
    }

    try {
      setPending(true);
      const res = await registerAdminAction({ email, password });
      setMessageState(res);

      if (res.successMessage) {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      setMessageState({
        successMessage: "",
        errorMessage: "An error occurred while registering admin",
      });
    } finally {
      setPending(false);
    }
  };

  return (
    <form className="w-full max-w-md" onSubmit={handleSubmit} method="POST">
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
      <InputField
        id="confirmPassword"
        labelText="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button
        type="submit"
        className="bg-button-bg hover:bg-button-bg-hover text-white w-full p-2 rounded-lg transition-colors duration-150 flex gap-5 justify-center items-center"
      >
        Register Admin{" "}
        {pending && <ImSpinner8 size={28} className="animate-spin" />}
      </button>
      {messageState.errorMessage ? (
        <div className="text-error-text mt-1" aria-live="polite">{messageState.errorMessage}</div>
      ) : (
        <div className="text-success-text mt-1" aria-live="polite">
          {messageState.successMessage}
        </div>
      )}
    </form>
  );
}
