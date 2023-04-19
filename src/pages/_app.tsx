import { AdvertProvider } from "@/contexts/advert.context";
import { UserProvider } from "@/contexts/user.context";
import { theme } from "@/styles/globals";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ToastContainer />
      <UserProvider>
        <AdvertProvider>
          <Component {...pageProps} />
        </AdvertProvider>
      </UserProvider>
    </ChakraProvider>
  );
}
