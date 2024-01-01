import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/contexts/ThemeContext";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
   title: 'Create Next App',
   description: 'Generated by create next app',
}

const RootLayout = ({
                       children,
                    }: {
   children: React.ReactNode
}) => (
    <html lang='en'>
       <body className={inter.className} style={{
          "--background": '#0D0208',
          "--text": '#00FF41',
       } as React.CSSProperties}>
       {children}
       </body>
    </html>
);

export default RootLayout
