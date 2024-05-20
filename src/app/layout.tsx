import "../styles/globals.scss";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quote.ai | Generate quotes from emails",
  description: "Generate quotes from emails using AI technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <nav className="sidebar">
            <h2>Quotes.ai</h2>
            <ul>
              <li>
                <Link href="/">Dashboard</Link>
              </li>
              <li>
                <Link href="/inventory">Inventory</Link>
              </li>
              <li>
                <Link href="/rfqs">Submit RFQs</Link>
              </li>
            </ul>
          </nav>
          <main className="content">{children}</main>
        </div>
      </body>
    </html>
  );
}
