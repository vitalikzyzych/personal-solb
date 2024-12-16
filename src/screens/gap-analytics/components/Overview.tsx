"use client";
import { FC } from "react";
import GapAnalyticsTable from "./GapAnalyticsTable";
import { CardComponent } from "@/components";

const Overview: FC = () => {
  return <CardComponent className="mt-3" content={<GapAnalyticsTable />} />;
};

export default Overview;
