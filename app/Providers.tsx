"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";
import React, { createContext, ReactNode, useContext } from "react";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

interface DeviceContextType {
  isMobile: boolean;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const useDevice = (): DeviceContextType => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error("useDevice must be used within a DeviceProvider");
  }
  return context;
};

export function Providers({
  children,
  isMobile,
  session,
}: {
  children: ReactNode;
  isMobile: boolean;
  session: Session | null;
}) {
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        <NextUIProvider navigate={router.push}>
          <DeviceContext.Provider value={{ isMobile }}>
            {children}
          </DeviceContext.Provider>
        </NextUIProvider>
      </NextThemesProvider>
    </SessionProvider>
  );
}
