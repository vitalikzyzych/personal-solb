"use client";
import Image from "next/image";
import CardComponent from "./components/CardComponent";
import CardTitle from "./components/CardTitle";
import { type FC } from "react";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";

// Array of data for the actions
const actionsData = [
  {
    id: 1,
    type: "Interview",
    participants: ["Mathias Smith", "Bart Smith"],
    icon: "/layout/images/interview.svg",
  },
  {
    id: 2,
    type: "Workshop",
    participants: ["Keith Armstrong", "Michael Smith", "Bart Smith"],
    icon: "/layout/images/workshop.svg",
  },
  {
    id: 3,
    type: "Workshop",
    participants: ["Keith Armstrong", "Michael Smith", "Bart Smith"],
    icon: "/layout/images/workshop.svg",
  },
];

const Actions: FC = () => {
  // Click handler for button
  const handleActionClick = (action: (typeof actionsData)[0]) => {
    console.log("Selected Action:", action);
    // Additional logic can be added here
  };

  return (
    <CardComponent
      title={
        <CardTitle
          text="Recommended Actions"
          classNameTitle="text-2xl font-medium solv-black"
          className="flex align-items-center gap-3 mb-3"
        />
      }
      content={
        <div className="flex flex-column gap-1">
          {actionsData.map((action, index) => (
            <>
              <div
                key={action.id}
                className="flex justify-content-between items-center border-b gap-3"
              >
                <div className="flex gap-3 align-items-center">
                  <Image src={action.icon} alt="icon" width={20} height={20} />
                  <span className="solv-black">
                    {action.type} with{" "}
                    <span className="underline">
                      {action.participants.join(", ")}
                    </span>
                  </span>
                </div>
                <div className="flex-shrink-0 flex-grow-0">
                  <Button
                    className=""
                    onClick={() => {
                      handleActionClick(action);
                    }}
                  >
                    Take {action.type.toLowerCase()}
                  </Button>
                </div>
              </div>
              {index < actionsData.length - 1 && <Divider />}
            </>
          ))}
        </div>
      }
    />
  );
};

export default Actions;
