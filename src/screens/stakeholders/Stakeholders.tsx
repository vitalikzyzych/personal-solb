"use client";
import { FC, useState } from "react";
import Image from "next/image";
import { TabPanel, TabView } from "primereact/tabview";
import Overview from "./containers/Overview";
import Profiles from "./containers/Profiles";

const Stakeholders: FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  return (
    <div className="grid">
      <div className="col-12">
        <div className="flex justify-content-between align-items-center mb-5">
          <div className="flex align-items-center gap-5 ">
            <Image
              src="/layout/images/search-paper.svg"
              alt="icon"
              width={32}
              height={32}
            />
            <div className="text-4xl font-medium text-gray-900">
              Stakeholders
            </div>
          </div>
        </div>
      </div>
      <div className="col-12">
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
          className="w-full"
        >
          <TabPanel header="Overview">
            <Overview />
          </TabPanel>
          <TabPanel header="Profiles">
            <Profiles />
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};

export default Stakeholders;
