"use client";
import { FC } from "react";
import StakeholderTable from "./StakeholderTable";
import { CardComponent } from "@/components";

const Overview: FC = () => {
  return <CardComponent className="mt-3" content={<StakeholderTable />} />;
};

export default Overview;
