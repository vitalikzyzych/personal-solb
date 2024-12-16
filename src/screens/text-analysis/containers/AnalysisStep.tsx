"use strict";
import NotReadyContent from "./NotReadyContent";
import { type FC, useState } from "react";
import ReadyAnalysis from "./ReadyAnalysis";
import { ToggleButton } from "primereact/togglebutton";
import { classNames } from "primereact/utils";

const AnalysisStep: FC = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="card w-full">
      <div
        className={classNames("flex justify-content-center", {
          "mb-4": checked,
        })}
      >
        <ToggleButton
          invalid
          onIcon="pi pi-check"
          offIcon="pi pi-times"
          checked={checked}
          onChange={(e) => setChecked(e.value)}
          className="w-8rem"
        />
      </div>
      {checked ? <ReadyAnalysis /> : <NotReadyContent />}
    </div>
  );
};

export default AnalysisStep;
