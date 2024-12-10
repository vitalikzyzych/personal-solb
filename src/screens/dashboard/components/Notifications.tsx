import { FC } from "react";

import { Timeline } from "primereact/timeline";
import { CardComponent, CardTitle } from "@/components";
import { Accordion, AccordionTab } from "primereact/accordion";

interface IEventsData {
  text: string;
  date: string;
  color: string;
}

const Notifications: FC = () => {
  const events: IEventsData[] = [
    {
      text: "12 values and 5 stakeholders approved  ",
      date: "01/10/24",
      color: "#0AFFA5",
    },
    {
      text: "User has merged 15 values",
      date: "01/10/24",
      color: "#0AFFA5",
    },
    {
      text: "analysed 10 documents",
      date: "01/10/24",
      color: "#0AFFA5",
    },
    { text: "analysed 10 documents", date: "01/10/24", color: "#496D90B" },
  ];

  const customizedMarker = () => {
    return (
      <span className="w-0-5-rem h-0-5-rem bg-green-200 border-round"></span>
    );
  };

  const customizedContent = (item: IEventsData) => {
    return (
      <Accordion multiple>
        <AccordionTab
          header={<p>{item.text}</p>}
          headerClassName={"no-border timeline-accordion"}
          contentClassName="accordion-container timeline-accordion"
        >
          Test
        </AccordionTab>
      </Accordion>
    );
  };

  return (
    <CardComponent
      title={
        <CardTitle
          text="Notifications"
          classNameTitle="text-lg font-medium text-gray-900"
          className="flex align-items-center gap-3 mb-4"
        />
      }
      content={
        <div className="flex justify-content-start">
          <Timeline
            value={events}
            align="left"
            opposite={(item: IEventsData) => item.date}
            marker={customizedMarker}
            content={customizedContent}
          />
        </div>
      }
    ></CardComponent>
  );
};

export default Notifications;
