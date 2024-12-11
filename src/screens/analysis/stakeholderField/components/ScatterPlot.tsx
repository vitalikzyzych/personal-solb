"use client";
import { type FC, useEffect, useMemo, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import type { EChartsOption, LineSeriesOption, SeriesOption } from "echarts";
import { CardComponent, CardTitle } from "@/components/ui";
import { Divider } from "primereact/divider";

const ScatterPlot: FC = () => {
  const chartRef = useRef<ReactECharts>(null);
  const [data] = useState<{ name: string; [key: string]: number | string }[]>([
    { name: "Stakeholder 1", A: 1, B: -2, C: 3, D: -4 },
    { name: "Stakeholder 2", A: -2, B: 4, C: -6, D: 8 },
    { name: "Stakeholder 3", A: 3, B: -6, C: 9, D: -12 },
    { name: "Stakeholder 5", A: -4, B: 8, C: -12, D: 16 },
    { name: "Stakeholder 6", A: -9, B: 7, C: 10, D: 16 },
    { name: "Stakeholder 7", A: -3, B: 10, C: -2, D: 13 },
    { name: "Stakeholder 8", A: -10, B: 9, C: -5, D: 2 },
  ]);

  const [xAxis, setXAxis] = useState(["A"]);
  const [yAxis, setYAxis] = useState(["B"]);
  const [showCorrelation, setShowCorrelation] = useState(false);

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
    }));
  }, [data, xAxis, yAxis]);

  const correlationLine = useMemo(() => {
    if (scatterData.length < 2) return null;

    const xValues = scatterData.map((d) => d.x);
    const yValues = scatterData.map((d) => d.y);
    const xMean = xValues.reduce((sum, v) => sum + v, 0) / xValues.length;
    const yMean = yValues.reduce((sum, v) => sum + v, 0) / yValues.length;

    const numerator = xValues.reduce(
      (sum, v, i) => sum + (v - xMean) * (yValues[i] - yMean),
      0
    );
    const denominator = xValues.reduce((sum, v) => sum + (v - xMean) ** 2, 0);
    const slope = numerator / denominator || 0;
    const intercept = yMean - slope * xMean;

    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    return [
      [xMin, slope * xMin + intercept],
      [xMax, slope * xMax + intercept],
    ];
  }, [scatterData]);

  const correlationCoefficient = useMemo(() => {
    if (scatterData.length < 2) return null;

    const xValues = scatterData.map((d) => d.x);
    const yValues = scatterData.map((d) => d.y);
    const xMean = xValues.reduce((sum, v) => sum + v, 0) / xValues.length;
    const yMean = yValues.reduce((sum, v) => sum + v, 0) / yValues.length;

    const numerator = xValues.reduce(
      (sum, v, i) => sum + (v - xMean) * (yValues[i] - yMean),
      0
    );
    const denominatorX = Math.sqrt(
      xValues.reduce((sum, v) => sum + (v - xMean) ** 2, 0)
    );
    const denominatorY = Math.sqrt(
      yValues.reduce((sum, v) => sum + (v - yMean) ** 2, 0)
    );

    const correlation = numerator / (denominatorX * denominatorY);
    return isNaN(correlation) ? 0 : correlation.toFixed(2); // Round to 2 decimal places
  }, [scatterData]);

  const options: EChartsOption = useMemo(() => {
    const series: SeriesOption[] = [
      {
        type: "scatter",
        data: scatterData.map((d) => [d.x, d.y]),
        label: {
          show: false,
        },
        itemStyle: { color: "#00A465" },
      },
    ];

    if (showCorrelation && correlationLine) {
      series.push({
        type: "line",
        data: correlationLine,
        lineStyle: { type: "solid", color: "#EC9A40", width: 2 },
        name: "Correlation Line",
        tooltip: { show: false },
      } as LineSeriesOption);
    }

    if (showCorrelation && correlationLine) {
      series.push({
        type: "line",
        data: correlationLine,
        lineStyle: { type: "solid", color: "#EC9A40", width: 2 },
        name: "Correlation Line",
        tooltip: { show: false },
      });
    }

    return {
      tooltip: {
        trigger: "item",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: (params: any) =>
          `${params.name}: (${params.value[0]}, ${params.value[1]})`,
      },
      xAxis: {
        name: xAxis.join(" + "),
        type: "value",
        axisTick: { show: false },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
          // formatter: (value: number) => {
          //   const min = Math.min(...scatterData.map((d) => d.x));
          //   const max = Math.max(...scatterData.map((d) => d.x));
          //   if (value === min) return "No Important";
          //   if (value === max) return "Very Important";
          //   return "";
          // },
          // align: "center",
          // margin: 8,
        },
      },
      yAxis: {
        name: yAxis.join(" + "),
        type: "value",
        axisTick: { show: false },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
          // formatter: (value: number) => {
          //   const min = Math.min(...scatterData.map((d) => d.y));
          //   const max = Math.max(...scatterData.map((d) => d.y));

          //   if (value === min) return "No Important";
          //   if (value === max) return "Very Important";
          //   return "";
          // },
          // align: "right",
          // margin: 8,
        },
      },
      series,
      legend: { show: false },
      grid: { show: false },
    };
  }, [scatterData, correlationLine, showCorrelation, xAxis, yAxis]);

  useEffect(() => {
    if (chartRef.current) {
      const instance = chartRef.current.getEchartsInstance();
      instance.setOption(options, true); // Force the chart to update
    }
  }, [options]);

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
        <div className="flex gap-2">
          <ReactECharts
            ref={chartRef}
            option={options}
            style={{ height: 400, width: "100%" }}
          />
          <div className="flex flex-column gap-2">
            <div className="flex flex-column gap-2">
              <label htmlFor="xAxisSelect" className="text-gray-900">
                X-Axis
              </label>
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
            <Divider />
            <div className="flex flex-column gap-2">
              <label htmlFor="yAxisSelect" className="text-gray-900">
                Y-Axis
              </label>
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
            <Button
              label={`correlation: 
                ρ = ${correlationCoefficient}`}
              className="bg-blue-50 text-blue-300 border-none font-normal"
              style={{ boxShadow: "none" }}
              onClick={() => setShowCorrelation(!showCorrelation)}
            />
          </div>
        </div>
      }
    />
  );
};

export default ScatterPlot;
