"use client";
import { FC, useMemo, useState } from "react";
import Image from "next/image";
import { Carousel } from "primereact/carousel";
import { Dropdown } from "primereact/dropdown";
import { Chart } from "primereact/chart";
import { CardComponent, CardTitle } from "@/components";

interface StakeholderData {
  name: string;
  value: number;
}

const generateData = (count: number): StakeholderData[] => {
  const names = [
    "Alex Thompson",
    "Avery Sullivan",
    "Cameron Brooks",
    "Casey Walker",
    "Jamie Morgan",
    "Jordan Bennett",
    "Morgan Ellis",
    "Riley Harper",
    "Sam Parker",
    "Taylor Reed",
  ];

  return Array.from({ length: count }, (_, i) => ({
    name: names[i % names.length] || `Stakeholder ${i + 1}`,
    value: Math.floor(Math.random() * 100),
  }));
};

interface IStakeholderRatings {
  title: string;
  isIcon?: boolean;
}

const ValueRatings: FC<IStakeholderRatings> = ({ title, isIcon = true }) => {
  const [activePage, setActivePage] = useState(0);
  const [sortBy, setSortBy] = useState<"Name" | "Value">("Name");
  const generatedData = useMemo(() => generateData(100), []);

  const data = useMemo(() => {
    const sortedData = [...generatedData].sort((a, b) =>
      sortBy === "Name" ? a.name.localeCompare(b.name) : b.value - a.value
    );
    return sortedData;
  }, [generatedData, sortBy]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 0.7,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        displayColors: false,
        backgroundColor: "#fff",
        titleColor: "#414141",
        padding: {
          left: 10,
          right: 10,
          top: 8,
          bottom: 4,
        },
        caretPadding: 0,
        cornerRadius: 10,
        caretSize: 8,
        titleFont: {
          size: 12,
          weight: 400,
        },
        boxPadding: 0,
        bodyColor: "red",
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.1)",
        bodyFont: {
          size: 16,
          weight: 600,
        },
        xAlign: "center",
        yAlign: "bottom",
        bodyAlign: "center",
        callbacks: {
          label: () => "",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          display: true,
          font: {
            size: 12,
            color: "#3F3F3F",
          },
        },
        grid: {
          display: false,
          drawBorder: false,
          drawTicks: false,
        },
      },
      y: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
          drawBorder: false,
          drawTicks: false,
        },
      },
    },
  };

  const carouselPages = useMemo(() => {
    const barColors = [
      "#1BDF93", // Example colors
      "#1FD58F",
      "#25C587",
      "#31A97A",
      "#33A478",
      "#3E8A6C",
      "#3F886B",
      "#496F60",
      "#496F60",
      "#496F60",
    ];

    return Array.from({ length: totalPages }, (_, pageIndex) => {
      const start = pageIndex * itemsPerPage;
      const end = start + itemsPerPage;
      const pageData = data.slice(start, end);

      const sortedData = [...pageData].sort((a, b) => b.value - a.value);

      const valueToColorMap = new Map(
        sortedData.map((item, index) => [
          item.value,
          barColors[index % barColors.length],
        ])
      );

      const pageChartData = {
        labels: pageData.map((item) => item.name),
        datasets: [
          {
            backgroundColor: pageData.map((item) =>
              valueToColorMap.get(item.value)
            ),
            borderRadius: 4,
            maxBarThickness: 45,
            minBarLength: 2,
            data: pageData.map((item) => item.value),
          },
        ],
      };

      return {
        id: pageIndex,
        chartData: pageChartData,
      };
    });
  }, [data, totalPages, itemsPerPage]);

  const sortOptions = [
    { label: "Name", value: "Name" },
    { label: "Value", value: "Value" },
  ];

  return (
    <CardComponent
      className="mt-3"
      title={
        <div className="flex justify-content-between">
          <CardTitle
            text={title}
            icon={
              isIcon ? (
                <Image
                  src="/layout/images/people.svg"
                  alt="icon"
                  width={24}
                  height={24}
                />
              ) : null
            }
            classNameTitle="text-lg font-medium text-gray-800"
            className="flex align-items-center gap-3"
            classNameIcon="flex align-items-center justify-content-center w-1-5-rem h-1-5-rem"
          />
          <div className="flex gap-4 align-items-center">
            <div className="flex align-items-center gap-2">
              <label htmlFor="sort" className="text-gray-900 text-base">
                Show
              </label>
              <Dropdown
                id="sort"
                value={sortBy}
                options={sortOptions}
                onChange={(e) => setSortBy(e.value)}
                placeholder="Sort by"
                className="w-max"
              />
            </div>
          </div>
        </div>
      }
      content={
        <div className="flex flex-column gap-6">
          <Carousel
            value={carouselPages}
            className="h-full"
            numVisible={1}
            numScroll={1}
            page={activePage}
            onPageChange={(e) => setActivePage(e.page)}
            itemTemplate={(page) => {
              return (
                <div style={{ overflowX: "scroll", height: "100%" }}>
                  <Chart
                    type="bar"
                    data={page.chartData}
                    options={chartOptions}
                  />
                </div>
              );
            }}
          />
        </div>
      }
    />
  );
};

export default ValueRatings;
