"use client";

import { FC, useMemo, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";
import { MultiSelect } from "primereact/multiselect";
import { CardComponent, CardTitle } from "@/components/ui";
import { Divider } from "primereact/divider";

const TradeOffChart: FC = () => {
  const chartRef = useRef<ReactECharts>(null);

  const [data] = useState<{ name: string; [key: string]: number | string }[]>([
    {
      name: "Stakeholder 1",
      Nature: 3,
      Progress: -2,
      Community: 1.5,
      Growth: -4,
    },
  ]);

  const [xAxis, setXAxis] = useState(["Nature"]);
  const [yAxis, setYAxis] = useState(["Community"]);

  const availableKeys = Object.keys(data[0]).filter((key) => key !== "name");

  const scatterData = useMemo(() => {
    return data.map((item) => ({
      name: item.name,
      x:
        xAxis.reduce((sum, key) => sum + (item[key] as number), 0) /
        xAxis.length,
      y:
        yAxis.reduce((sum, key) => sum + (item[key] as number), 0) /
        yAxis.length,
    }))[0]; // Single point
  }, [data, xAxis, yAxis]);

  const options = useMemo(() => {
    return {
      tooltip: {
        trigger: "item",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: (params: any) => {
          if (params.seriesName === "Importance") {
            return `${params.name}: (${params.value[0]}, ${params.value[1]})`;
          }
          return null; // Ensure the tooltip works for scatter points
        },
      },
      xAxis: {
        type: "value",
        name: xAxis.join(" + "),
        nameLocation: "end",
        min: -5, // Define fixed negative axis range
        max: 5, // Define fixed positive axis range
        axisLine: { show: true },
        axisTick: { show: false },
        splitLine: { show: false }, // Remove grid lines
        axisLabel: {
          formatter: (value: number) => {
            if (value === -5) return "Not important at all";
            if (value === 5) return "Very important";
            return " ";
          },
          color: "#B6B6B6", // Color for Y-axis tick labels
          margin: 0,
        },
      },
      yAxis: {
        type: "value",
        name: yAxis.join(" + "),
        min: -5, // Define fixed negative axis range
        max: 5, // Define fixed positive axis range
        axisLine: { show: true },
        axisTick: { show: false },
        splitLine: { show: false }, // Remove grid lines
        axisLabel: {
          formatter: (value: number) => {
            if (value === -5) return "";
            if (value === 5) return "Very important";
            return " ";
          },
          color: "#B6B6B6", // Color for Y-axis tick labels
          margin: 0, // No space between labels and the axis line
        },
      },
      series: [
        {
          name: "Importance",
          type: "scatter",
          data: [[scatterData.x, scatterData.y]],
          itemStyle: { color: "#00A465" },
          symbolSize: 15,
        },
        {
          name: "X-Axis Intersection", // Mark where the line touches the X-axis
          type: "line",
          data: [
            [scatterData.x, scatterData.y],
            [scatterData.x, 0],
          ],
          symbolSize: 1,
          lineStyle: { type: "dashed", color: "#999" },
          label: {
            show: true,
            position: "top",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter: (params: any) => {
              console.log(params.data);
              if (params.data[1] !== 0) {
                return "";
              } else {
                if (params.data[0] >= -5 && params.data[0] < -2) {
                  return "Not important";
                }
                if (params.data[0] >= -2 && params.data[0] < 1) {
                  return "Slightly unimportant";
                }

                if (params.data[0] >= 1 && params.data[0] < 3) {
                  return "Slightly unimportant";
                }

                if (params.data[0] >= 3 && params.data[0] <= 5) {
                  return "Important";
                }
              }
            },
            fontSize: 14,
            fontWeight: "bold",
            color: "#3E8A6C",
          },
        },
        {
          name: "Y-Axis Intersection", // Mark where the line touches the Y-axis
          type: "line",
          data: [
            [scatterData.x, scatterData.y],
            [0, scatterData.y],
          ],
          lineStyle: { type: "dashed", color: "#999" },
          label: {
            show: true,
            position: "top",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter: (params: any) => {
              console.log(params.data);
              if (params.data[0] !== 0) {
                return "";
              } else {
                if (params.data[1] >= -5 && params.data[1] < -2) {
                  return "Not unimportant";
                }
                if (params.data[1] >= -2 && params.data[1] < 1) {
                  return "Slightly unimportant";
                }

                if (params.data[1] >= 1 && params.data[1] < 3) {
                  return "Slightly unimportant";
                }

                if (params.data[1] >= 3 && params.data[1] <= 5) {
                  return "Important";
                }
              }
            },
            fontSize: 14,
            fontWeight: "bold",
            color: "#3E8A6C",
          },
        },
      ],
      markPoint: {
        data: [
          {
            coord: [scatterData.x, 0], // X-axis intersection
            name: "X-Axis Intersection",
            label: {
              show: true,
              position: "top",
              formatter: "X-Axis: {c}",
              color: "#007bff",
              fontSize: 12,
              padding: [5, 10],
              align: "center",
            },
          },
          {
            coord: [0, scatterData.y], // Y-axis intersection
            name: "Y-Axis Intersection",
            label: {
              show: true,
              position: "left",
              formatter: "Y-Axis: {c}",
              color: "#ff9900",
              fontSize: 12,
              padding: [5, 10],
              align: "center",
            },
          },
        ],
      },
    };
  }, [scatterData, xAxis, yAxis]);

  return (
    <CardComponent
      title={
        <div className="flex justify-content-between align-items-center">
          <CardTitle
            text="Value distribution and correlation"
            classNameTitle="text-lg font-medium text-gray-900"
            className="flex align-items-center gap-3"
          />
        </div>
      }
      content={
        <div className="flex flex-column">
          <div className="flex gap-2 mt-4">
            <div className="flex flex-column gap-2">
              <label htmlFor="xAxisSelect">X-Axis</label>
              <MultiSelect
                id="xAxisSelect"
                value={xAxis}
                options={availableKeys.map((key) => ({
                  label: key,
                  value: key,
                }))}
                onChange={(e) => setXAxis(e.value)}
                display="chip"
              />
            </div>
            <div className="flex flex-column gap-2">
              <label htmlFor="yAxisSelect">Y-Axis</label>
              <MultiSelect
                id="yAxisSelect"
                value={yAxis}
                options={availableKeys.map((key) => ({
                  label: key,
                  value: key,
                }))}
                onChange={(e) => setYAxis(e.value)}
                display="chip"
              />
            </div>
          </div>
          <ReactECharts
            ref={chartRef}
            option={options}
            style={{ height: 400, width: "100%" }}
          />
        </div>
      }
    />
  );
};

export default TradeOffChart;
