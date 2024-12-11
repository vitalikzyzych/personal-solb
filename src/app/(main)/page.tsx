"use client";
import dynamic from "next/dynamic";
import { type Page } from "types";

const DashboardNoSSR = dynamic(() => import("../../screens/dashboard"), {
  ssr: false,
});

const Main: Page = () => {
  return <DashboardNoSSR />;
};

export default Main;
