import { Suspense } from "react";
import Button from "./ui/Button";
import SpinnerMini from "./ui/SpinnerMini";
import UserProfileNavLink from "./UserProfileNavLink";

export default function HeaderNavigation() {
  return (
    <nav className="z-10">
      <ul className="flex items-center gap-12">
        <li>
          <Button href="/account/bookmarks" textOnly>
            Bookmarks
          </Button>
        </li>
        <li>
          <Suspense fallback={<SpinnerMini />}>
            <UserProfileNavLink />
          </Suspense>
        </li>
      </ul>
    </nav>
  );
}
