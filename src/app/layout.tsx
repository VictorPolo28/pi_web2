// src/app/layout.tsx
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import Nav from "../components/Nav";

export const metadata = {
  title: "Mi App",
  description: "Demo de login/register/logout (frontend)"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <Nav />
          <main style={{ padding: 20 }}>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
