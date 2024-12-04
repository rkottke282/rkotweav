import Header from "./header"
import './global.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header /> 
        <main>{children}</main>
      </body>
    </html>
  );
}
