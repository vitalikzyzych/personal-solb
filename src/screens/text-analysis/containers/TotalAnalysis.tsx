"use client";
import { ProgressBar } from "primereact/progressbar";
import { type FC } from "react";

const TotalAnalysis: FC = () => {
  const value = (9000 / 10000) * 100;

  return (
    <div className="flex align-items-center gap-3">
      <span className="text-gray-900">9.000 / 10.000 analyses</span>
      <ProgressBar
        color="#0AFFA5"
        value={value}
        showValue={false}
        className="h-0-5-rem border-noround w-10rem"
      />
    </div>
  );
};

export default TotalAnalysis;
