"use client";
import { type FC } from "react";
import { Steps } from "primereact/steps";
import { type MenuItem } from "primereact/menuitem";
import { classNames } from "primereact/utils";

interface IStepper {
  activeIndex: number;
}

const Stepper: FC<IStepper> = ({ activeIndex }) => {
  const items = [
    { icon: "pi pi-check", label: "SELECT DOCUMENTS" },
    { icon: "pi pi-check", label: "CONFIRM SELECTED" },
    { icon: "pi pi-check", label: "ANALYSIS" },
    { icon: "pi pi-check", label: "REVIEW RESULTS" },
  ];

  const itemRenderer = (item: MenuItem, itemIndex: number) => {
    const isCompleted = itemIndex < activeIndex;
    const isActive = activeIndex === itemIndex;
    const backgroundColor = isActive
      ? "var(--primary-color)"
      : isCompleted
        ? "#35D37F"
        : "var(--surface-100)";
    const textColor = isActive
      ? "var(--gray-900)"
      : isCompleted
        ? "var(--surface-b)"
        : "#767676";

    return (
      <div className="inline-flex flex-column align-items-center custom-steps">
        <span
          className="flex align-items-center justify-content-center align-items-center border-circle h-2rem w-2rem z-1 cursor-pointer"
          style={{
            backgroundColor: backgroundColor,
            color: textColor,
          }}
        >
          {isCompleted ? (
            <i className={`${item.icon} text-sm`} />
          ) : (
            itemIndex + 1
          )}
        </span>
        <span
          className={classNames("mt-2 text-xs font-medium", {
            "text-gray-900": isActive || isCompleted,
            "text-surface-300": !isActive && !isCompleted,
          })}
        >
          {item.label}
        </span>
      </div>
    );
  };

  return (
    <Steps
      model={items.map((item, index) => ({
        ...item,
        template: () => itemRenderer(item, index),
      }))}
      activeIndex={activeIndex}
      readOnly
    />
  );
};

export default Stepper;
