"use client";
import { FC, useEffect, useState } from "react";
import { TabPanel, TabView } from "primereact/tabview";
import StakeholdersOverview from "./StakeholdersOverview";

const Stakeholders: FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {}, []);
  return (
    <div className="w-full">
      <div className="flex align-items-center justify-content-between flex-column">
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
          className="w-full"
        >
          <TabPanel header="Overview">
            <StakeholdersOverview />
          </TabPanel>
          <TabPanel header="Profiles">
            <div className="card">Profiles</div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};

export default Stakeholders;
