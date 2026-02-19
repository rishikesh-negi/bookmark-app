import Image from "next/image";

import icon from "@/public/favicon.png";
import logo from "@/public/logo.png";
import HeroCta from "./_components/HeroCta";

export default function Home() {
  return (
    <main className="mt-24 min-h-fit max-h-[40dvh] bg-brand-600/20 flex gap-16">
      <div className="min-w-fit bg-brand-600/30 p-6">
        <Image
          src={icon}
          width={350}
          height={350}
          alt="Icon logo of the Bookmark app"
          className="opacity-50"
        />
      </div>

      <div className="grid text-slate-700 py-10 pr-14 justify-between">
        <h1 className="text-4xl text-brand-600 font-extrabold tracking-tight mb-6">
          <span className="inline-block">
            <Image
              src={logo}
              width={240}
              height={80}
              className="w-auto h-auto inline-block mr-3 mb-1 py-1 border-b-2 border-brand-600/40 hover:scale-105 transition-transform"
              alt="Logo of the Bookmark app"
            />
          </span>
          enhances your browsing experience.
        </h1>
        <h2 className="text-2xl font-semibold leading-tight">
          Manage and access your bookmarks across different browsers{" "}
          <span className="font-extrabold border-b-4 border-brand-500">
            AND
          </span>{" "}
          devices!
        </h2>
        <HeroCta />
      </div>
    </main>
  );
}
