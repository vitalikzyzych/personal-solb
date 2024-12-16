"use client";
import { FC, useState } from "react";
import Image from "next/image";
import { TabPanel, TabView } from "primereact/tabview";
import Overview from "./components/Overview";

const GapAnalytics: FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  return (
    <div className="grid">
      <div className="col-12">
        <div className="flex justify-content-between a;ign-items-center mb-5">
          <div className="flex align-items-center gap-5 ">
            <Image
              src="/layout/images/gap-analysis.svg"
              alt="icon"
              width={32}
              height={32}
            />
            <div className="text-4xl font-medium text-gray-900">
              Gap Analytics
            </div>
          </div>
        </div>
      </div>
      <div className="col-12">
        <Overview />
      </div>
    </div>
  );
};

export default GapAnalytics;
