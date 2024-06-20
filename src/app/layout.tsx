import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/app/ProviderQuery";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Store",
  description: "Save All Items In One Plays",
  icons: {icon:"https://dc622.4shared.com/img/0h5vFZJMku/s24/190334a3278/calculator?async&rand=0.645665828972402"}
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en"><body className={inter.className}>
    <Providers >
    {children}
      </Providers>
    </body>
    </html>
  );
}