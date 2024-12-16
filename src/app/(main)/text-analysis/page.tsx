"use client";
import dynamic from "next/dynamic";
import { type Page } from "@/types";

const TextAnalysisNoSSR = dynamic(
  () => import("../../../screens/text-analysis/TextAnalysis"),
  {
    ssr: false,
  }
);

const TextAnalysisPage: Page = () => {
  return <TextAnalysisNoSSR />;
};

export default TextAnalysisPage;
