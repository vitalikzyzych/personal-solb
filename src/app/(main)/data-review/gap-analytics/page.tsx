"use client";
import dynamic from "next/dynamic";
import { type Page } from "types";

const GapAnalyticsNoSSR = dynamic(
  () => import("../../../../screens/gap-analytics/GapAnalytics"),
  {
    ssr: false,
  }
);

const GapAnalyticsPage: Page = () => {
  return <GapAnalyticsNoSSR />;
};

export default GapAnalyticsPage;
