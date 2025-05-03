import { ReactNode } from "react";
import { Provider } from "./Provider";
import { ThemeProviderWrapper } from "../context/ThemeContext";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import "../styles/global.css";
import TopBarWrapper from "@/components/layouts/AppBarWrapper";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>OxiWear - Team Dashboard</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;500;600&family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: "#edf4f6" }}>
        <Provider>
          <AuthProvider>
            <AppRouterCacheProvider>
              <ThemeProviderWrapper>
                <TopBarWrapper />
                {children}
              </ThemeProviderWrapper>
            </AppRouterCacheProvider>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
