import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";
import Header from "../components/Header/Header";
import { Metadata } from "next";
import Web2Provider from "../contexts/web2Context";
import Image from "next/image";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  variable: "--font-chakra",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Bullrun Jackpot",
    description: "Play $BULLRUN to win BIG",
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`relative ${josefin.className}`}>
        <video autoPlay muted className="fixed bg-image brightness-[0.8]">
          <source src={"bull2.mp4"} type="video/mp4" />
        </video>

        <Providers>
          <Web2Provider>
            <main className="relative overflow-hidden min-h-screen w-full">
              <Header />
              <div className="mx-auto w-full pb-16 max-w-[1400px] px-4">
                {children}
              </div>
            </main>
          </Web2Provider>
        </Providers>
      </body>
    </html>
  );
}
