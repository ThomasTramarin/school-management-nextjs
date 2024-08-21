"use client";

import { useFormStatus } from "react-dom";
import { ImSpinner8 } from "react-icons/im";

type Props = {
  text: string;
};

export default function SubmitButton({ text }: Props) {
  const { pending } = useFormStatus();

  return <button type="submit" className="bg-button-bg hover:bg-button-bg-hover text-white w-full p-2 rounded-lg transition-colors duration-150 flex gap-5 justify-center">{text}{pending && <ImSpinner8 size={28} className="animate-spin"/>}</button>;
}
