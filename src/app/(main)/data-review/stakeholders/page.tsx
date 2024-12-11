"use client";
import dynamic from "next/dynamic";
import { type Page } from "types";

const StakeholdersNoSSR = dynamic(
  () => import("../../../../screens/stakeholders/Stakeholders"),
  {
    ssr: false,
  }
);

const StakeholdersPage: Page = () => {
  return <StakeholdersNoSSR />;
};

export default StakeholdersPage;
