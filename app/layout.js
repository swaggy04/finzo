import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs"
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

const nunito = Nunito_Sans({ subsets: ["latin"] });


export const metadata = {
  title: "Finzo",
  description: "manage your finances",
};

export default function RootLayout({ children }) {
  return (   
    <ClerkProvider >
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${nunito.className } bg-black text-white`}
        >
          {/* {headers} */}
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <Header />
            {children}
            <Toaster richColors/>
          </ThemeProvider>
          {/* footer */}
        </body>
      </html>
    </ClerkProvider>
  );
}

