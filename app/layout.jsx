import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../css/sonner-custom.css";
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Generico",
  description: "Generico",
};

export default function LoginLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <div className="">
          <div className="flex flex-col gap-4">{children}</div>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
