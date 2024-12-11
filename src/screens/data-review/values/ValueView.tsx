"use client";
import { useRouter } from "next/navigation";
import { ValueRatings } from "./charts";
import { ValueOverview } from "./components";
import { solvChevronLeft } from "@/assets/svg/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type FC } from "react";

interface IValueView {
  id: string;
}

const ValueView: FC<IValueView> = ({ id }) => {
  const router = useRouter();
  return (
    <>
      <div className="mb-2 font-semibold text-lg flex align-items-center">
        <span className="cursor-pointer mr-4" onClick={() => router.back()}>
          <FontAwesomeIcon icon={solvChevronLeft} />
        </span>
        Quality jobs
        <span
          className="p-2 ml-2 text-white text-sm border-round-2xl"
          style={{ background: "#519560" }}
        >
          approved
        </span>
      </div>
      <div className="grid">
        <div className="col-12">
          <ValueRatings title="Unique value ratings" isIcon={false} />
        </div>
        <div className="col-12">
          <ValueOverview id={id} />
        </div>
      </div>
    </>
  );
};

export default ValueView;
