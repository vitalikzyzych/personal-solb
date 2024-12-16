"use client";
import { Button } from "primereact/button";
import { type FC } from "react";
import { useStepHandler } from "../hooks";
import { appSelector } from "@/store";
import { useSelector } from "react-redux";

const ReadyAnalysis: FC = () => {
  const {
    textanalysis: { selectedDocuments },
  } = useSelector(appSelector);
  const { handleNext } = useStepHandler();

  return (
    <div className="flex flex-column justify-content-center align-items-center gap-5 mb-4">
      <span className="text-gray-900 text-lg font-medium">
        You completed analysing {selectedDocuments?.length} documents
      </span>
      <Button
        label="Review"
        aria-controls="review"
        className="text-0 border-none"
        style={{ backgroundColor: "#232323" }}
        onClick={handleNext}
      />
    </div>
  );
};

export default ReadyAnalysis;
