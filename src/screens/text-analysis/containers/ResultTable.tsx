import { useState } from "react";
import { Column, ColumnProps } from "primereact/column";
import {
  DataTable,
  type DataTableSelectionMultipleChangeEvent,
  DataTableValueArray,
} from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";

const status = [
  { value: "REJECTED", label: "Rejected" },
  { value: "PARTIAL", label: "Partially rejected" },
];

interface IResultValuesTable<T> {
  title: string;
  data: T[];
  columns: ColumnProps[];
  initialSelected?: T[];
}

const ResultTable = <T,>({
  title,
  data,
  columns,
  initialSelected,
}: IResultValuesTable<T>) => {
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState<DataTableValueArray>(
    (initialSelected as DataTableValueArray) || []
  );

  return (
    <>
      <div className="flex justify-content-between align-items-center mb-6">
        <div className="text-lg font-medium text-gray-900">{title}</div>
        <div className="flex align-items-center gap-4">
          {status.map((item) => (
            <div key={item.value} className="flex align-items-center gap-2">
              <div
                className={classNames("border-circle h-0-5-rem w-0-5-rem", {
                  "bg-pink-300": item.value === "REJECTED",
                  "bg-orange-50": item.value === "PARTIAL",
                })}
              ></div>
              <span className="text-gray-900 text-sm">{item.label}</span>
            </div>
          ))}
          <InputText
            type="text"
            placeholder="Search..."
            className="w-12rem gray-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="text-gray-900 mb-3">New (100)</div>
      <DataTable
        value={data as DataTableValueArray}
        selectionMode={"checkbox"}
        selection={selectedRows}
        onSelectionChange={(
          e: DataTableSelectionMultipleChangeEvent<DataTableValueArray>
        ) => setSelectedRows(e.value)}
        className="unselected-rows"
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>
        {columns.map((col) => (
          <Column key={col.field} {...col} />
        ))}
      </DataTable>
    </>
  );
};

export default ResultTable;
