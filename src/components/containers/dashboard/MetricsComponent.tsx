"use client";
import { type FC } from "react";
import { StatCard } from "./components/StatCard";
import { ProgressCard } from "./components/ProgressCard";

const statCardsData = [
  {
    title: "stakeholders",
    metric: 1200,
    metricChange: "+23",
    approved: 960,
    potential: 220,
    rejected: 20,
    description: "curated from 3200 unique stakeholders",
    icon: "/layout/images/people2.svg",
  },
  {
    title: "values",
    metric: 500,
    metricChange: "",
    approved: 40,
    potential: 450,
    rejected: 10,
    description: "curated from 1200 unique values",
    icon: "/layout/images/hand-star.svg",
  },
];

const progressCardsData = [
  {
    title: "documents analyzed",
    percentage: 92,
    uploaded: 200,
    analyzed: 63,
    icon: "/layout/images/search-paper.svg",
  },
  {
    title: "Ratings",
    metric: 2932,
    captured: 31,
    predicted: 69,
    icon: "/layout/images/stars.svg",
  },
];

const MetricsComponent: FC = () => {
  return (
    <div className="grid row-gap-2">
      {statCardsData.map((card, index) => (
        <div key={index} className="col">
          <StatCard {...card} />
        </div>
      ))}
      {progressCardsData.map((card, index) => (
        <div key={index} className="col">
          <ProgressCard {...card} />
        </div>
      ))}
    </div>
  );
};
export default MetricsComponent;
