import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "sonner";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-display",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono-jb",
});

export default function RootLayout({children,}: {
  children: React.ReactNode;}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
      <body>
        <Providers>
          {children}
        </Providers>
        <Toaster
          richColors
          position="top-right"
        />
      </body>
    </html>
  );
}