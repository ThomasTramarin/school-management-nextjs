"use client"
import InputField from "@/components/form/InputField";
import SubmitButton from "@/components/SubmitButton";
import { loginAsUserAction } from "../action";
import { useFormState } from "react-dom";
import { useState } from "react";

export default function LoginUserForm() {
  

  return (
    <form action={loginAsUserAction} className="w-full max-w-md">
      {/* <InputField
        id="user-code"
        labelText="User Code"
        type="text"
      /> */}
      <SubmitButton text="Login" />
    </form>
  );
}
