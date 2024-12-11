"use client";
import { ValueView } from "@/screens";

const ValueViewPage = ({ params }: { params: { id: string } }) => {
  return <ValueView id={params.id} />;
};

export default ValueViewPage;
