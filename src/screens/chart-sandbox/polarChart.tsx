import React, { FC, useEffect, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";
import { darkenColor } from "utils/helpers/color";

interface IProps {
  data: {
    name: string;
    value: number;
  }[];
  color: string;
}

const ClusterChart: FC<IProps> = ({ data, color }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Get the max value from the data
  const maxValue = Math.max(...data.map((item) => item.value));

  // Scale the maximum value so that the highest data value fills 75% of the full radius
  const axisMax = maxValue / 0.75;

  const options = {
    title: {
      text: "Stakeholder ratings per cluster",
      left: "center",
      textStyle: {
        fontSize: 18,
        fontWeight: "bold",
      },
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c}",
    },
    angleAxis: {
      max: axisMax, // Dynamically calculated max value
      startAngle: 90, // Start from the top
      show: false, // Hide the angle axis
    },
    radiusAxis: {
      type: "category",
      data: data.map((item) => item.name).reverse(), // Reverse for clockwise alignment
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false }, // Hide default labels
    },
    polar: {
      radius: ["30%", "80%"], // Inner and outer radius
    },
    series: [
      // Background Series to Indicate Remaining Values
      {
        type: "bar",
        data: Array(data.length).fill(maxValue), // Remaining value = max - current
        coordinateSystem: "polar",
        roundCap: true,
        barWidth: 10,
        itemStyle: {
          color: "rgba(128, 128, 128, 0.2)", // Light grey color
          borderRadius: 10,
        },
        silent: true, // Disable interactivity
      },
      // Data Series
      {
        type: "bar",
        data: data.map((item) => item.value).reverse(), // Reverse for clockwise alignment
        coordinateSystem: "polar",
        roundCap: true,
        barWidth: 15, // Width of data bars
        barGap: "-100%", // Align with the background
        itemStyle: {
          color: color,
          borderRadius: 10, // Rounded edges
        },
        emphasis: {
          itemStyle: {
            color: darkenColor(color, 10), // Highlight color
          },
        },
      },
    ],
  };

  // Function to update the dimensions
  const updateDimensions = () => {
    if (chartContainerRef.current) {
      const width = chartContainerRef.current.offsetWidth;
      setDimensions({ width, height: width }); // Ensure height equals width
    }
  };

  // Update dimensions on mount and resize
  useEffect(() => {
    updateDimensions(); // Set initial dimensions on page load
    if (typeof window !== "undefined") {
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
    }
  }, []); // Empty dependency array to run only once

  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      // Here you can log or track dimensions if needed
      console.log(dimensions);
    }
  }, [dimensions]); // Re-run when dimensions change

  return (
    <div
      ref={chartContainerRef}
      style={{
        position: "relative",
        width: "100%",
        height: `${dimensions.height || 400}px`, // Dynamically set height
        maxWidth: "400px",
        maxHeight: "400px",
      }}
    >
      {/* ECharts Chart */}
      <ReactECharts
        option={options}
        style={{ width: "100%", height: "100%" }}
      />

      {/* Labels positioned outside the chart */}
      <div
        className="absolute left-0 pr-2 flex flex-column align-items-end"
        style={{
          top: "44px",
          left: "10px",
          width: "50%",
        }}
      >
        {data.map((item) => (
          <div
            key={item.name}
            className="font-semibold text-base mb-1 text-overflow-ellipsis white-space-nowrap"
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClusterChart;
