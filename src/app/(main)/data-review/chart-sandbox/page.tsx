"use client";
import { ChartSandbox } from "@/screens";
import dynamic from "next/dynamic";
import { type Page } from "types";

const ChartSandboxNoSSR = dynamic(
  () => import("../../../../screens/chart-sandbox"),
  {
    ssr: false,
  }
);

const ChartSandboxPage: Page = () => {
  return <ChartSandboxNoSSR />;
};

export default ChartSandboxPage;
