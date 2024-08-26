"use client";

import { useFormStatus } from "react-dom";
import { ImSpinner8 } from "react-icons/im";

type Props = {
  children: string;
  pending: boolean;
};

export default function SubmitButton({children, pending }: Props) {
  return <button type="submit" className="bg-button-bg hover:bg-button-bg-hover text-white w-full p-2 rounded-lg transition-colors duration-150 flex gap-3 justify-center items-center">{children}{pending && <ImSpinner8 size={22} className="animate-spin"/>}</button>;
}
