"use client";

import { BookmarkFilled, UserAvatarFilled } from "@carbon/icons-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOutButton from "./SignOutButton";

const navLinks = [
  {
    name: "Profile",
    href: "/account/profile",
    icon: <UserAvatarFilled size={24} className="text-brand-600" />,
  },
  {
    name: "Bookmarks",
    href: "/account/bookmarks",
    icon: <BookmarkFilled size={24} className="text-brand-600" />,
  },
];

export default function SideNavigation() {
  const pathname = usePathname();

  return (
    <nav className="border-r border-slate-200">
      <ul className="flex flex-col gap-2 h-full text-lg">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`px-5 py-3 flex items-center gap-4 font-semibold text-slate-800 hover:bg-brand-200/40 transition-colors ${pathname === link.href && "bg-brand-200/40"}`}
              href={link.href}>
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}

        <li className="mt-auto">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}
