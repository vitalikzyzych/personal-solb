"use client";
import { type FC, useEffect, useState } from "react";
import Image from "next/image";
import { CardComponent, CardTitle } from "@/components";
import { Divider } from "primereact/divider";

const Analysis: FC = () => {
  const data = [
    { label: "Values discovered", value: 1000, change: 23 },
    { label: "Stakeholder marked for engagement", value: 8, change: 23 },
    { label: "Amount of ratings", value: 30, change: 23 },
  ];
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <CardComponent
      title={
        <CardTitle
          text="Analysis"
          icon={
            <Image
              src="/layout/images/analysis.svg"
              alt="icon"
              width={19}
              height={19}
            />
          }
          classNameTitle="text-lg font-medium text-gray-900"
          className="flex align-items-center gap-3 mb-3"
          classNameIcon="flex align-items-center justify-content-center w-1-5-rem h-1-5-rem"
        />
      }
      content={
        <div className="flex flex-column md:flex-row gap-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex flex-column md:flex-row text-start relative"
            >
              <div className="flex flex-column">
                <p className="text-sm text-gray-600 font-medium">
                  {item.label}
                </p>
                <p className="text-2xl font-medium text-gray-900">
                  {item.value}
                </p>
                <p className="text-sm text-green-400">
                  {item.change} since last week
                </p>
              </div>
              {index < data.length - 1 && (
                <Divider
                  layout={windowWidth < 768 ? "horizontal" : "vertical"}
                />
              )}
            </div>
          ))}
        </div>
      }
    />
  );
};

export default Analysis;
