"use client";
import { useState } from "react";
import {
  FilterBar,
  StakeHolderHorizontalChart,
  StakeholderRatings,
} from "@/components";
import Image from "next/image";
import { Button } from "primereact/button";
import { type Page } from "types";

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
            <div className="text-4xl font-medium solv-black">
              Stakeholder Field
            </div>
          </div>
          <Button
            label="Filter"
            icon="pi pi-sliders-h"
            badge="2"
            className="flex-shrink-0 p-3 solv-bg-light-green-100 solv-black border-none"
            badgeClassName="solv-black"
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
      <FilterBar visible={visible} onVisibleChange={setVisible} />
    </div>
  );
};

export default StakeHolderFieldPage;
