"use client";
import { Card } from "primereact/card";
import { type FC } from "react";
import TableWithTabs from "./components/TableWithTabs";

const ValuesOverviewTab: FC = () => {
  return (
    <Card className="relative mt-3">
      <TableWithTabs />
    </Card>
  );
};

export default ValuesOverviewTab;
