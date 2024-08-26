"use client";

import { useMenuContext } from "@/contexts/MenuContext";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

export default function MenuBtn() {
  const { menuOpen, setMenuOpen } = useMenuContext();

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <button onClick={handleClick} className="md:invisible">
      {menuOpen ? <IoClose size={28} /> : <IoMenu size={28} />}
    </button>
  );
}
