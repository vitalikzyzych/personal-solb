"use client";
import dynamic from "next/dynamic";
import { type Page } from "types";

const StakeHolderFieldPageNoSSR = dynamic(
  () => import("../../../../screens/analysis/stakeholderField"),
  {
    ssr: false,
  }
);

const StakeholderField: Page = () => {
  return <StakeHolderFieldPageNoSSR />;
};

export default StakeholderField;
