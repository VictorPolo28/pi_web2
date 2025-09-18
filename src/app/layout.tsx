// src/app/layout.tsx
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
export const metadata = {
  title: "Mi App",
  description: "Demo de login/register/logout (frontend)"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <main style={{ padding: 20 }}>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
