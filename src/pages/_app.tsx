import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { PrivyProvider } from "@privy-io/react-auth";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PrivyProvider
      appId="cm2btaag400v16944cwcqarmj"
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          theme: "light",
          accentColor: "#FFA500",
          logo: "https://docs.privy.io/privy-logo-dark.png",
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      <Component {...pageProps} />;
    </PrivyProvider>
  );
}
