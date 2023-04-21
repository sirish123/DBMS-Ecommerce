import Navbar from "@/components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <SessionProvider>
        <Navbar />
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  );
}
