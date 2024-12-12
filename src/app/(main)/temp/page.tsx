"use client";
import dynamic from "next/dynamic";
import { type Page } from "types";
const OrganizationSelectingNoSSR = dynamic(
  () => import("../../../screens/organization/OrganizationSelection"),
  {
    ssr: false,
  }
);

const OrganizationSelecting: Page = () => {
  return <OrganizationSelectingNoSSR />;
};

export default OrganizationSelecting;
