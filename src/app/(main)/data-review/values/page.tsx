"use client";
import dynamic from "next/dynamic";
import { type Page } from "types";

const ValuesNoSSR = dynamic(
  () => import("../../../../screens/data-review/values/Values"),
  {
    ssr: false,
  }
);

const ValuesPage: Page = () => {
  return <ValuesNoSSR />;
};

export default ValuesPage;
