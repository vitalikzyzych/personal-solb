"use client";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/core/rootStore";
import { appSelector } from "@/store";
import { getStakeholderValues } from "@/store/stakeholder";
import StakeholderRatings from "../charts/ValueRatings";
import ScatterPlotMinimal from "../charts/ScatterPlot";
import { CardComponent, CardTitle } from "@/components";
import { Chart } from "primereact/chart";

interface IProps {
  id: string;
}

const Relationships: FC<IProps> = ({ id }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    stakeholder: { isGettingValues, stakeholderValues },
  } = useSelector(appSelector);

  useEffect(() => {
    dispatch(getStakeholderValues({ id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chartData = {
    labels: ["John Doe", "John Doe", "John Doe", "John Doe", "John Doe"],
    datasets: [
      {
        label: "Values",
        data: [300, 480, 450, 420, 400],
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

  const chartData2 = {
    labels: ["John Doe", "John Doe", "John Doe", "John Doe", "John Doe"],
    datasets: [
      {
        label: "Values",
        data: [50, 40, 30, 10, 5],
        backgroundColor: [
          "rgba(25, 227, 149, 0.3)", // Transparent and light
          "rgba(32, 211, 142, 0.3)", // Transparent and light
          "rgba(43, 183, 129, 0.3)", // Transparent and light
          "rgba(46, 175, 125, 0.3)", // Transparent and light
          "rgba(53, 159, 118, 0.3)", // Transparent and light
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
        max: 500,
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

  useEffect(() => {}, []);
  return (
    <>
      {isGettingValues ? (
        "Loading"
      ) : (
        <CardComponent
          className="mt-3"
          title={
            <div className="flex justify-content-between align-items-center">
              <CardTitle
                text="Stakeholder alignment extremes"
                classNameTitle="text-lg font-medium text-gray-900"
                className="flex align-items-center gap-3"
              />
            </div>
          }
          content={
            <div className="grid">
              <div className="col-12 md:col-6">
                <h6 className="text-base font-normal mt-3">Least aligned</h6>

                <Chart type="bar" data={chartData} options={chartOptions} />
              </div>
              <div className="col-12 md:col-6">
                <h6 className="text-base font-normal mt-3">Most aligned</h6>
                <Chart type="bar" data={chartData2} options={chartOptions} />
              </div>
            </div>
          }
        />
      )}
    </>
  );
};

export default Relationships;
