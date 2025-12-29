"use client";

import { usePathname } from "next/navigation";
import { PrimeReactProvider } from "primereact/api";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const bodyClass = pathname === "/post" ? "custom-background" : "";

  return (
    <div className={bodyClass}>
      <PrimeReactProvider>
        {children}
      </PrimeReactProvider>
    </div>
  );
}
