"use client";
import { useState } from "react";
import { type Page } from "@/types";
import Image from "next/image";
import { TabPanel, TabView } from "primereact/tabview";
import { ValuesOverviewTab } from "@/components";

const Values: Page = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="grid">
      <div className="col-12">
        <div className="flex justify-content-between a;ign-items-center mb-5">
          <div className="flex align-items-center gap-5 ">
            <Image
              src="/layout/images/search-paper.svg"
              alt="icon"
              width={32}
              height={32}
            />
            <div className="text-4xl font-medium text-gray-900">Values</div>
          </div>
        </div>
      </div>
      <div className="col-12">
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
          className="no-border"
        >
          <TabPanel header="Overview">
            <ValuesOverviewTab />
          </TabPanel>
          <TabPanel header="Profiles">Profiles</TabPanel>
        </TabView>
      </div>
    </div>
  );
};

export default Values;
