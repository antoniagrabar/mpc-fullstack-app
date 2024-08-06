import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/providers/Providers";
import type { Session } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  children: React.ReactNode;
  params: {
    session: Session;
  };
}
export const metadata: Metadata = {
  title: "Riteh MPC",
  description: "Multi-party computation application",
};

export default function RootLayout({ children, params }: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider session={params.session}>{children}</Provider>
      </body>
    </html>
  );
}
