"use client";
import { ValueView } from "@/screens";
import dynamic from "next/dynamic";

const ValueViewNoSSR = dynamic(
  () => import("../../../../../screens/data-review/values/ValueView"),
  {
    ssr: false,
  }
);

const ValueViewPage = ({ params }: { params: { id: string } }) => {
  return <ValueViewNoSSR id={params.id} />;
};

export default ValueViewPage;
