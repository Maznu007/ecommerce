import "../styles/globals.css";
import Footer from "@/components/footer";
import { ProductsContextProvider } from "@/components/ProductsContext";

export default function App({ Component, pageProps }) {
  return (
    <ProductsContextProvider>
      <Component {...pageProps} />
      <Footer />
    </ProductsContextProvider>
  );
}
