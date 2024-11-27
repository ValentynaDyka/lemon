'use client';

import "./globals.css";
import { QueryClient, QueryClientProvider } from 'react-query';
import { createTheme, ThemeProvider } from "@mui/material";

const queryClient = new QueryClient();
const theme = createTheme({
  typography: {
    fontFamily: '"Outfit", sans-serif',
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
