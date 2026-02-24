import Image from "next/image";
import Link from "next/link";
import { useUserDataOnServer } from "../hooks/useUserDataOnServer";
import Button from "./ui/Button";

export default function UserProfileNavLink() {
  const user = useUserDataOnServer();

  if (!user)
    return (
      <Button href="/account" textOnly>
        Log in/Sign up
      </Button>
    );

  return (
    <Link
      href="/account/profile"
      className="flex items-center gap-2 text-lg text-brand-700 hover:text-brand-600 transition-colors">
      <Image
        width={32}
        height={32}
        className="h-8 rounded-full"
        src={user.user_metadata.avatar_url as string}
        alt="User's avatar"
        referrerPolicy="no-referrer"
      />
      <span>{user.user_metadata.name}</span>
    </Link>
  );
}
