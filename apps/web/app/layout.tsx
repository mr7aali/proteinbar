import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import { StoreProvider } from "@/lib/store/provider";

export const metadata: Metadata = {
  title: "Proteinbar",
  description: "Proteinbar storefront",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-50 text-zinc-900 antialiased">
        <StoreProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 py-8 sm:py-10">
              <Container>{children}</Container>
            </main>
            <Footer />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
