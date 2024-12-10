"use client";
import Image from "next/image";
import { CardComponent, CardTitle } from "@/components";
import { type FC } from "react";

const StakeholdersProgress: FC = () => {
  return (
    <CardComponent
      title={
        <CardTitle
          text="Stakeholders progress"
          icon={
            <Image
              src="/layout/images/people.svg"
              alt="icon"
              width={24}
              height={24}
            />
          }
          classNameTitle="text-lg font-medium text-gray-800"
          className="flex align-items-center gap-3"
          classNameIcon="flex align-items-center justify-content-center w-1-5-rem h-1-5-rem"
        />
      }
      content={<div>Stakeholders progress</div>}
    />
  );
};

export default StakeholdersProgress;
