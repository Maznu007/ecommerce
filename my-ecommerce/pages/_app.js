import "../styles/globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ProductsContextProvider } from "@/components/ProductsContext";
import { SessionProvider } from "next-auth/react";

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps } 
}) {
  return (
    <SessionProvider session={session}>
      <ProductsContextProvider>
        <Navbar />
        <main className="min-h-screen pb-24">
          <Component {...pageProps} />
        </main>
        <Footer />
      </ProductsContextProvider>
    </SessionProvider>
  );
}