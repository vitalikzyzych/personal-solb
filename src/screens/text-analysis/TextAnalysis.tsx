"use client";
import Image from "next/image";
import { type FC } from "react";
import {
  SelectDocuments,
  SelectedDocuments,
  Stepper,
  TotalAnalysis,
} from "./containers";
import { useStepHandler } from "./hooks";
import AnalysisStep from "./containers/AnalysisStep";

const TextAnalysis: FC = () => {
  const { activeStep } = useStepHandler();

  const getTitle = (step: number) => {
    switch (step) {
      case 0:
        return "Select documents";
      case 1:
        return "Selected documents";
      case 2:
        return "Analysis";
      case 3:
        return "Review results";
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <SelectDocuments />;
      case 1:
        return <SelectedDocuments />;
      case 2:
        return <AnalysisStep />;
      // case 3:
      //   return <ReviewResults />;
    }
  };

  const step = getStepContent(activeStep);

  const title = getTitle(activeStep);
  return (
    <div className="grid">
      <div className="col-12">
        <div className="flex justify-content-between align-items-center mb-5">
          <div className="flex align-items-center gap-5 ">
            <Image
              src="/layout/images/search-paper.svg"
              alt="icon"
              width={32}
              height={32}
            />
            <div className="text-4xl font-medium text-gray-900">
              Text Analysis
            </div>
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="flex flex-column justify-content-center align-items-center">
          <div className="text-center text-xl text-gray-900 font-medium mb-4">
            Analyze uploaded documents
          </div>
          <div className="w-full max-w-30rem">
            <Stepper activeIndex={activeStep} />
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="flex justify-content-between align-items-center mb-4">
          <div className="text-xl font-medium text-gray-900">{title}</div>
          <TotalAnalysis />
        </div>
      </div>
      <div className="col-12">{step}</div>
    </div>
  );
};

export default TextAnalysis;
