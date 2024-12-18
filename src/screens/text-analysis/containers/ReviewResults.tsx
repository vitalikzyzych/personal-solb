"use client";
import { TabPanel, TabView } from "primereact/tabview";
import { type FC, useState } from "react";
import BulkReviewTab from "./BulkReviewTab";

const ReviewResults: FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="grid">
      <div className="col-12">
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
          className="no-border"
        >
          <TabPanel header="Bulk review">
            <div className="mt-4">
              <BulkReviewTab />
            </div>
          </TabPanel>
          <TabPanel header="Individual review">Individual review</TabPanel>
        </TabView>
      </div>
    </div>
  );
};

export default ReviewResults;
