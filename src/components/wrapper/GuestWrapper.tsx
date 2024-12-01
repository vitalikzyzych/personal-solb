"use client";
import { useEffect } from "react";

import { usePathname, useRouter } from "next/navigation";

// import FeedbackWidget from './FeedbackWidget';

export { GuestWrapper };

interface RootLayoutProps {
  children: React.ReactNode;
}

function GuestWrapper(props: RootLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // on initial load - run auth check
    if (localStorage.getItem("accessToken")) {
      router.push("/");
    }
  }, [pathname]);

  return <>{props.children}</>;
}
