"use client";
import { type FC } from "react";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import Image from "next/image";

interface IProgressCard {
  title: string;
  percentage?: number;
  uploaded?: number;
  analyzed?: number;
  captured?: number;
  predicted?: number;
  icon?: string;
  metric?: number;
}

export const ProgressCard: FC<IProgressCard> = ({
  title,
  percentage,
  uploaded = 0,
  analyzed = 0,
  icon,
  captured = 0,
  predicted = 0,
  metric,
}) => (
  <Card className="w-full min-w-20rem h-full">
    <div className="flex justify-content-between align-items-center">
      <div className="flex gap-1">
        <span className="text-6xl solv-blue-400  font-medium ">
          {percentage ? `${percentage}%` : metric}
        </span>
      </div>
      {icon && (
        <div className="flex justify-content-center align-items-center solv-bg-blue-200 p-2 border-circle">
          <Image src={icon} alt="icon" width={28} height={28} />
        </div>
      )}
    </div>
    <p className="text-lg solv-grey-300">{title}</p>
    <div className="flex justify-content-center">
      <div className="grid">
        <div className="col-6">
          <div className="flex">
            <div className="flex flex-column gap-2 align-items-center">
              <span className="text-xl solv-black font-medium">
                {uploaded ? uploaded : `${captured}%`}
              </span>
              <span className="solv-grey-700">
                {uploaded ? "uploaded" : "captured"}
              </span>
            </div>
            <Divider layout="vertical" />
          </div>
        </div>
        <div className="col-6">
          <div className="flex justify-content-between">
            <div className="flex flex-column gap-2 align-items-center">
              <span className="text-xl solv-black font-medium">
                {analyzed ? analyzed : predicted}
              </span>
              <span className="solv-grey-700">
                {analyzed ? "analyzed" : "predicted"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Card>
);
