"use client";

import { LinkType } from "@/utils/constants/sidebarLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ links }: { links: LinkType[] }) {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <nav>
        <ul>
          {links.map((item: LinkType, index) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <li key={index}>
                <Link
                  href={item.href}
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
    </aside>
  );
}
