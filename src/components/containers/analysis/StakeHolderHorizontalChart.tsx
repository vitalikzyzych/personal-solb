"use client";
import { FC } from "react";
import { Chart } from "primereact/chart";
import { CardComponent, CardTitle } from "@/components";
import { Button } from "primereact/button";

const StakeHolderHorizontalChart: FC = () => {
  const chartData = {
    labels: [
      "Outdoor Recreation",
      "Quality of Public Space",
      "Nature",
      "Quality Jobs",
      "Entrepreneurial Spirit",
      "Network Fostering",
      "Safety",
      "Crisis Management",
      "Economic Viability",
      "Comprehensive Support Services",
    ],
    datasets: [
      {
        label: "Values",
        data: [523, 480, 450, 420, 400, 380, 360, 340, 320, 300],
        backgroundColor: [
          "#19E395",
          "#20D38E",
          "#2BB781",
          "#2EAF7D",
          "#359F76",
          "#359E75",
          "#3C8E6E",
          "#418168",
          "#496E5F",
          "#496E5F",
        ],
        maxBarThickness: 40,
      },
    ],
  };

  const chartOptions = {
    indexAxis: "y", // Horizontal bar
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 0.7,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
    scales: {
      x: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
          drawBorder: false,
          drawTicks: false,
        },
      },
      y: {
        ticks: {
          padding: 20,
        },
        grid: {
          display: false,
          drawBorder: false,
          drawTicks: false,
        },
      },
    },
  };

  // Function to download the chart as an image
  const downloadChart = () => {
    const canvas = document.querySelector("canvas");
    const link = document.createElement("a");
    link.download = "chart.png";
    if (canvas) {
      link.href = canvas.toDataURL();
      link.click();
    } else {
      console.error("Canvas element not found");
    }
  };

  const subTitle = (
    <p className="text-gray-200">
      What project specific values have the greatest priority according to all
      stakeholders.
    </p>
  );

  return (
    <CardComponent
      title={
        <div className="flex justify-content-between align-items-center">
          <CardTitle
            text="Dominant values"
            classNameTitle="text-lg font-medium text-gray-900"
            className="flex align-items-center gap-3"
          />
          <Button
            icon="pi pi-download"
            outlined
            className="text-gray-900"
            onClick={downloadChart}
          />
        </div>
      }
      subTitle={subTitle}
      content={
        <div className="flex flex-column gap-3">
          <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
      }
    />
  );
};

export default StakeHolderHorizontalChart;
