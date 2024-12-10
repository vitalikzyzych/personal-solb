"use client";
import { ProgressBar } from "primereact/progressbar";
import { CardComponent, CardTitle } from "@/components";
import { type FC } from "react";

const DataAccuracy: FC = () => {
  return (
    <CardComponent
      title={
        <CardTitle
          text="Project data accuracy"
          classNameTitle="text-lg font-medium text-gray-900"
          className="flex align-items-center gap-3 mb-3"
        />
      }
      content={
        <div className="flex flex-column gap-6">
          <p className="text-gray-200">
            Data accuracy is determined by the type of engagements used and
            percent predicted data.
          </p>
          <div className="flex w-full justify-content-between align-items-center gap-6">
            <ProgressBar
              color="#FFA800"
              value={33}
              showValue={false}
              className="h-1rem border-noround w-full"
            />
            <span className="text-2xl text-gray-900 font-medium">33%</span>
          </div>
        </div>
      }
    />
  );
};

export default DataAccuracy;
