"use client";
import React, { type FC } from "react";
import ReactECharts from "echarts-for-react";

const RatingChart: FC = () => {
  const approvedOptions = {
    title: {
      text: "32,6%",
      left: "center",
      top: "center",
      textStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
      },
    },
    series: [
      {
        name: "Approved Ratings",
        type: "pie",
        radius: ["70%", "90%"],
        avoidLabelOverlap: false,
        silent: true,
        label: { show: false },
        data: [
          { value: 32.6, name: "Approved", itemStyle: { color: "#00FFBF" } },
          { value: 67.4, name: "Remaining", itemStyle: { color: "#fff" } },
        ],
      },
    ],
  };

  const allRatingsOptions = {
    title: {
      text: "21,2%",
      left: "center",
      top: "center",
      textStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
      },
    },
    series: [
      {
        name: "All Ratings",
        type: "pie",
        radius: ["70%", "90%"],
        avoidLabelOverlap: false,
        silent: true,
        label: { show: false },
        data: [
          { value: 21.2, name: "All Ratings", itemStyle: { color: "#00FFBF" } },
          { value: 78.8, name: "Remaining", itemStyle: { color: "#fff" } },
        ],
      },
    ],
  };

  return (
    <div className="flex justify-content-center gap-5">
      <div className="text-center">
        <ReactECharts
          option={approvedOptions}
          style={{ height: 200, width: 200 }}
        />
        <div className="text-sm text-gray-700">
          % approved stakeholder ratings
        </div>
      </div>
      <div className="text-center">
        <ReactECharts
          option={allRatingsOptions}
          style={{ height: 200, width: 200 }}
        />
        <div className="text-sm text-gray-700">% all stakeholder ratings</div>
      </div>
    </div>
  );
};

export default RatingChart;
