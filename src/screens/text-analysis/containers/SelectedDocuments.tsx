"use client";
import { type FC } from "react";
import SelectedTable from "./SelectedTable";
import SelectedCard from "./SelectedCard";

const newDocuments = {
  title: "21",
  subtitle: "New documents",
  items: [
    { label: "NDA", count: 3 },
    { label: "Confidential", count: 3 },
    { label: "Label 3", count: 3 },
  ],
  isHighlighted: true,
};

const alreadyAnalyzed = {
  title: "10",
  subtitle: "Already analyzed",
  items: [
    { label: "Confidential", count: 3 },
    { label: "NDA", count: 3 },
    { label: "Label 3", count: 3 },
  ],
  isHighlighted: false,
};

const SelectedDocuments: FC = () => {
  return (
    <div className="flex flex-column gap-3">
      <div className="grid">
        <div className="col-12 lg:col-6">
          <SelectedCard {...newDocuments} />
        </div>
        <div className="col-12 lg:col-6">
          <SelectedCard {...alreadyAnalyzed} />
        </div>
      </div>

      <div className="card w-full">
        <SelectedTable />
      </div>
    </div>
  );
};

export default SelectedDocuments;
