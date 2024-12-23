"use client";
import { type FC } from "react";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import Image from "next/image";

interface IStatCard {
  title: string;
  metric: number;
  metricChange?: string;
  approved: number;
  potential: number;
  rejected: number;
  description: string;
  icon: string;
}

export const StatCard: FC<IStatCard> = ({
  title,
  metric,
  metricChange,
  approved,
  potential,
  rejected,
  description,
  icon,
}) => {
  return (
    <Card className="w-full min-w-20rem h-full">
      <div className="flex justify-content-between align-items-center">
        <div className="flex gap-1">
          <span className="text-6xl text-green-900 font-medium ">{metric}</span>
          {metricChange && (
            <span className="align-self-end text-green-300 font-medium">
              {" "}
              {metricChange} ▲
            </span>
          )}
        </div>
        {icon && (
          <div className="flex justify-content-center align-items-center bg-green-100 p-2 border-circle">
            <Image src={icon} alt="icon" width={28} height={28} />
          </div>
        )}
      </div>
      <p className="text-lg text-gray-300">{title}</p>
      <div className="grid">
        <div className="col-4">
          <div className="flex justify-content-between">
            <div className="flex flex-column gap-2 align-items-center">
              <span className="text-xl text-green-500 font-medium">
                {approved}
              </span>
              <span className="text-gray-700">approved</span>
            </div>
            <Divider layout="vertical" />
          </div>
        </div>
        <div className="col-4">
          <div className="flex justify-content-between">
            <div className="flex flex-column gap-2 align-items-center">
              <span className="text-xl text-gray-900 font-medium">
                {potential}
              </span>
              <span className="text-gray-700">potential</span>
            </div>
            <Divider layout="vertical" />
          </div>
        </div>
        <div className="col-4">
          <div className="flex justify-content-between">
            <div className="flex flex-column gap-2 align-items-center">
              <span className="text-xl text-red-400 font-medium">
                {rejected}
              </span>
              <span className="text-gray-700">rejected</span>
            </div>
          </div>
        </div>
      </div>

      <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "#666" }}>
        {description}
      </p>
    </Card>
  );
};
