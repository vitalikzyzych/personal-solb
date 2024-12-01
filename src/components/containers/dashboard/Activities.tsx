"use client";
import Image from "next/image";
import { Accordion, AccordionTab } from "primereact/accordion";
import CardComponent from "./components/CardComponent";
import CardTitle from "./components/CardTitle";
import { type FC } from "react";

const actionsData = [
  {
    id: 1,
    participants: ["Keith Armstrong"],
    icon: "/layout/images/interview.svg",
    date: "1/09/24",
    description: "Test",
  },
  {
    id: 2,
    participants: ["Keith Armstrong"],
    icon: "/layout/images/interview.svg",
    date: "1/09/24",
    description: "Test",
  },
  {
    id: 3,
    participants: ["Keith Armstrong"],
    icon: "/layout/images/interview.svg",
    date: "1/09/24",
    description: "Test",
  },
];

const Activities: FC = () => {
  return (
    <CardComponent
      title={
        <CardTitle
          text="Recent activities"
          classNameTitle="text-lg font-medium solv-black"
          className="flex align-items-center gap-3"
        />
      }
      content={
        <div>
          <Accordion multiple>
            {actionsData.map((opt) => (
              <AccordionTab
                key={opt?.id}
                header={
                  <div className="flex gap-3 align-items-center">
                    <Image src={opt.icon} alt="icon" width={20} height={20} />
                    <span className="solv-black mr-4">
                      First interview with{" "}
                      <span className="underline">
                        {opt.participants.join(", ")}
                      </span>
                    </span>
                    <span className="solv-grey-700">{opt.date}</span>
                  </div>
                }
                headerClassName={"no-border"}
                contentClassName="accordion-container"
              >
                {opt.description}
              </AccordionTab>
            ))}
          </Accordion>
        </div>
      }
    />
  );
};

export default Activities;
