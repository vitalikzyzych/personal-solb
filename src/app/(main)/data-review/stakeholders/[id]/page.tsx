"use client";
import dynamic from "next/dynamic";
const StakeholderViewNoSSR = dynamic(
  () => import("../../../../../screens/stakeholders/StakeholderView"),
  {
    ssr: false,
  }
);

const StakeholderViewPage = ({ params }: { params: { id: string } }) => {
  return <StakeholderViewNoSSR id={params.id} />;
};

export default StakeholderViewPage;
