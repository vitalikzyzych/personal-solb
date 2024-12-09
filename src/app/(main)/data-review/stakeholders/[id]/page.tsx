"use client";
import { StakeholderView } from "@/screens";

const StakeholderViewPage = ({ params }: { params: { id: string } }) => {
  return <StakeholderView id={params.id} />;
};

export default StakeholderViewPage;
