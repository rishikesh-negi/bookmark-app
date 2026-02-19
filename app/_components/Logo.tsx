import Image from "next/image";
import Link from "next/link";

import logo from "@/public/logo.png";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center z-10">
      <Image
        src={logo}
        loading="eager"
        width={240}
        quality={100}
        className="h-auto"
        alt="Logo for the app"
      />
    </Link>
  );
}
