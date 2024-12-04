"use client";
import { type FC, useState } from "react";
import { CardComponent, CardTitle } from "@/components/ui";
import ReactECharts from "echarts-for-react";
import { Dropdown } from "primereact/dropdown";

const StakeholderDistribution: FC = () => {
  const [valueType, setValueType] = useState("PROFILE");
  const categoryOptions = [{ label: "Profile type", value: "PROFILE" }];
  const data = [
    {
      value: 25,
      name: "Gemeente Kasterle",
      itemStyle: { color: "#19E395" },
    },
    {
      value: 25,
      name: "Gemeente Kasterleee",
      itemStyle: { color: "#496E5F" },
    },
    {
      value: 25,
      name: "Gemeente Kasterlee",
      itemStyle: { color: "#2BB781" },
    },
    {
      value: 25,
      name: "Gemeente Kasterllee",
      itemStyle: { color: "#3C8E6E" },
    },
  ];

  // Генеруємо rich-формат для кольорів
  const generateRichFormat = () => {
    const rich: {
      [key: string]: {
        borderRadius: number;
        width: number;
        height: number;
        backgroundColor: string;
      };
    } = {};
    data.forEach((item, index) => {
      rich[`b${index}`] = {
        borderRadius: 50,
        width: 13,
        height: 13,
        backgroundColor: item.itemStyle.color,
      };
    });
    return rich;
  };

  const chartOptions = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {d}%",
    },
    legend: {
      show: false,
    },
    series: [
      {
        name: "Stakeholders",
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: "outside",
          formatter: (params: { name: string }) => {
            const index = data.findIndex((item) => item.name === params.name);
            return `{b${index}|} {a|${params.name}}`; // Використовуємо динамічний ключ
          },
          rich: generateRichFormat(),
          textStyle: {
            fontSize: 16,
            color: "#000",
          },
        },
        labelLine: {
          show: true,
          length: 0,
          length2: 100,
          lineStyle: {
            color: "#4A4A4A",
          },
        },
        data,
      },
    ],
  };

  return (
    <CardComponent
      title={
        <div className="flex justify-content-between">
          <CardTitle
            text="Distribution of stakeholders"
            classNameTitle="text-lg font-medium text-gray-900"
            className="flex align-items-center gap-3 mb-4"
          />
          <div className="flex align-items-center gap-2">
            <label htmlFor="value" className="text-gray-900 text-base">
              Category
            </label>
            <Dropdown
              id="value"
              value={valueType}
              options={categoryOptions}
              onChange={(e) => setValueType(e.value)}
              placeholder="Select value"
              className="w-max"
            />
          </div>
        </div>
      }
      content={
        <ReactECharts
          option={chartOptions}
          style={{ width: "100%", height: "300px" }}
        />
      }
    />
  );
};

export default StakeholderDistribution;
