import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Link from "next/link";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav className="border-b p-6 ">
        <p className="text-4xl font-bold">DecentraVote</p>
        <div className="flex mt-4">
          <Link href="/">
            <a className="mr-6 text-black ">Home</a>
          </Link>
          <Link href="/chairman">
            <a className="mr-6 text-black">Chairman</a>
          </Link>
          <Link href="/voter">
            <a className="mr-6 text-black">Vote</a>
          </Link>
        </div>
      </nav>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </div>
  );
}

export default MyApp;
