"use client";
import { useState } from "react";
import {
  FilterBar,
  ScatterPlot,
  StakeHolderHorizontalChart,
} from "./components";
import Image from "next/image";
import { Button } from "primereact/button";
import { type Page } from "types";
import { StakeholderRatings } from "@/screens/dashboard/components";

const StakeHolderFieldPage: Page = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="grid">
      <div className="col-12">
        <div className="flex justify-content-between a;ign-items-center mb-5">
          <div className="flex align-items-center gap-5 ">
            <Image
              src="/layout/images/analysis.svg"
              alt="icon"
              width={32}
              height={32}
            />
            <div className="text-4xl font-medium text-gray-900">
              Stakeholder Field
            </div>
          </div>
          <Button
            label="Filter"
            icon="pi pi-sliders-h"
            badge="2"
            className="flex-shrink-0 p-3 bg-green-200 text-gray-900 border-none"
            badgeClassName="text-gray-900"
            onClick={() => setVisible(true)}
          />
        </div>
      </div>
      <div className="col-12">
        <StakeHolderHorizontalChart />
      </div>
      <div className="col-12">
        <StakeholderRatings
          title="Stakeholders values"
          subTitle="Overview of how stakeholders rate project specific values"
          isIcon={false}
        />
      </div>
      <div className="col-12">
        <ScatterPlot />
      </div>
      <FilterBar visible={visible} onVisibleChange={setVisible} />
    </div>
  );
};

export default StakeHolderFieldPage;
