"use client";

import { useMenuContext } from "@/contexts/MenuContext";
import { LinkType } from "@/utils/constants/sidebarLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileMenu({ links }: { links: LinkType[] }) {
  const pathname = usePathname();
  const {menuOpen, setMenuOpen} = useMenuContext();

  const handleClick = () => {
    setMenuOpen(false);
  }

  return (
    <nav className={`absolute top-16 p-4 w-full transition-all duration-200 bg-secondary-bg md:-translate-x-[100%] ${menuOpen ? "" : "-translate-x-[100%]"}`}>
      <ul>
        {links.map((item: LinkType, index) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <li key={index}>
              <Link
                href={item.href}
                onClick={handleClick}
                className={`flex gap-3 items-center p-2 rounded-lg transition-all duration-100 ${
                  isActive ? "bg-[#004CBF] text-white" : "hover:bg-[#adceff]"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
