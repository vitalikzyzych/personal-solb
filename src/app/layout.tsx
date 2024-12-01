"use client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { PrimeReactProvider } from "primereact/api";
import { rootStore } from "core/rootStore";

// import '../styles/layout/layout.scss';
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "react-toastify/dist/ReactToastify.css";
import "assets/styles/main.scss";
import { LayoutProvider } from "@/components/layout/context/layoutcontext";
import Head from "next/head";
// import '../styles/demo/demo.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title> Solv - CPanel</title>
        <link rel="shortcut icon" href="/layout/images/favicon.ico" />
      </head>
      <body>
        <Provider store={rootStore}>
          <PrimeReactProvider>
            <LayoutProvider>
              <ToastContainer />
              {children}
            </LayoutProvider>
          </PrimeReactProvider>
        </Provider>
      </body>
    </html>
  );
}
