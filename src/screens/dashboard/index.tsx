"use client";
import Image from "next/image";
import {
  Actions,
  // Activities,
  Analysis,
  DataAccuracy,
  DataVault,
  MetricsComponent,
  Notifications,
  StakeholderRatings,
  // StakeholdersProgress,
} from "@/components";
import { type Page } from "types";

const Dashboard: Page = () => {
  return (
    <>
      <div className="flex align-items-center justify-content-between flex-column">
        <div className="flex justify-content-center gap-5 mb-5 align-self-start">
          <Image
            src="/layout/images/overview.svg"
            alt="icon"
            width={32}
            height={32}
          />
          <div className="text-4xl font-medium slov-black">Overview</div>
        </div>
        <div className="grid w-full row-gap-2">
          <div className="col-12">
            <MetricsComponent />
          </div>
          <div className="col-12">
            <StakeholderRatings />
          </div>
          <div className="col-6">
            <Notifications />
          </div>
          <div className="col-12 md:col-6">
            <DataVault />
          </div>
          {/* <div className="col-12 md:col-6">
            <Activities />
          </div> */}
          <div className="col-12 md:col-6">
            <Actions />
          </div>
          <div className="col-12 md:col-6">
            <Analysis />
          </div>
          <div className="col-12 md:col-6">
            <DataAccuracy />
          </div>
        </div>
        {/* <AddUserModal visible={true} onHide={() => {}} /> */}
      </div>
    </>
  );
};

export default Dashboard;
