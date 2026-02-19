import { use } from "react";
import { auth } from "../_lib/auth";
import Button from "./ui/Button";

export default function HeroCta() {
  const session = use(auth());

  return (
    <div className="flex items-center gap-4 w-max">
      {session?.user ? (
        <>
          <span className="text-2xl text-brand-800 tracking-tight">
            Easily manage your bookmarks
          </span>
          <Button href="/account/bookmarks">Bookmarks</Button>
        </>
      ) : (
        <>
          <span className="text-xl text-brand-800 tracking-tight">
            Sign up or log in with just a few clicks
          </span>
          <Button href="/login">Log in / Sign up</Button>
        </>
      )}
    </div>
  );
}
