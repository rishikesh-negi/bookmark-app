import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { auth } from "../_lib/auth";
import Button from "./ui/Button";

export default function UserProfileNavLink() {
  const session = use(auth());

  return session?.user ? (
    <Link
      href="/account/profile"
      className="flex items-center gap-2 text-lg text-brand-700 hover:text-brand-600 transition-colors">
      <Image
        width={32}
        height={32}
        className="h-8 rounded-full"
        src={session?.user?.image as string}
        alt="User's avatar"
        referrerPolicy="no-referrer"
      />
      <span>{session?.user?.name}</span>
    </Link>
  ) : (
    <Button href="/login" textOnly>
      Log in/Sign up
    </Button>
  );
}
