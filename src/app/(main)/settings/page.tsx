"use client";
import dynamic from "next/dynamic";
import { type Page } from "types";
const SettingsNoSSR = dynamic(() => import("../../../screens/settings"), {
  ssr: false,
});

const SettingsPage: Page = () => {
  return <SettingsNoSSR />;
};

export default SettingsPage;
