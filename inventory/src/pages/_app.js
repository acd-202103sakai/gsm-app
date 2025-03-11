import "@/styles/globals.css";
import { AppProviders } from "../context/AppProviders";

export default function MyApp({ Component, pageProps }) {
  return (
    <AppProviders>
      <Component {...pageProps} />
    </AppProviders>
  );
}
