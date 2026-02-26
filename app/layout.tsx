import "@/app/_styles/globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import CrossTabSessionSync from "./_components/CrossTabSessionSync";
import Header from "./_components/Header";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  subsets: ["latin"],
  fallback: ["system-ui", "arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Bookmark",
    default: "Welcome / Bookmark",
  },
  description:
    "Easily manage your bookmarks across browsers and platforms with the Bookmark app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased bg-slate-100 text-slate-800 min-h-dvh flex flex-col font-sans`}>
        <CrossTabSessionSync />
        <div id="modal-root"></div>
        <Header />

        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            {children}
            <Toaster />
          </main>
        </div>
      </body>
    </html>
  );
}
