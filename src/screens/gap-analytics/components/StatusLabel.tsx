import React from "react";

interface StatusLabelProps {
  status: string;
  color: string;
}

const StatusLabel: React.FC<StatusLabelProps> = ({ status, color }) => {
  return (
    <div className="flex  align-items-center justify-content-between gap-2">
      <div
        style={{
          width: "19px",
          height: "19px",
          borderRadius: "50%",
          backgroundColor: `${color}`,
        }}
      ></div>
      <span className="">{status}</span>
    </div>
  );
};

export default StatusLabel;
