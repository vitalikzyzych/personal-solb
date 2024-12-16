"use client";
import React from "react";
import { useEffect } from "react";
import { redirect, usePathname, useRouter } from "next/navigation";

interface RootLayoutProps {
  children: React.ReactNode;
}

function AuthWrapper(props: RootLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // on initial load - run auth check
    if (typeof window !== "undefined" && !localStorage.getItem("accessToken")) {
      console.log("should redirect");
      redirect("/login");
    }
  }, [pathname]);

  return <>{props.children}</>;
}

export { AuthWrapper };
