"use client";
import { PAGE_SIZE } from "@/constants/general";
import { AppDispatch } from "@/core/rootStore";
import { appSelector } from "@/store";
import {
  type IGetDocumentsParams,
  getDocuments,
  setSelectedDocuments,
} from "@/store/textanalysis";
import SortableHeader from "@/utils/dataTable/SortableHeader";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import {
  DataTable,
  DataTableSelectionMultipleChangeEvent,
  type DataTableStateEvent,
  type DataTableValueArray,
} from "primereact/datatable";
import {
  type PaginatorNextPageLinkOptions,
  type PaginatorPrevPageLinkOptions,
} from "primereact/paginator";
import { classNames } from "primereact/utils";
import { type FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStepHandler, useTableHandlers } from "../hooks";

const paginatorTemplate = {
  layout:
    "RowsPerPageDropdown PrevPageLink PageLinks NextPageLink CurrentPageReport",
  PrevPageLink: (options: PaginatorPrevPageLinkOptions) => {
    return (
      <button
        type="button"
        className={classNames(options.className, "border-round-sm h-2rem px-3")}
        onClick={options.onClick}
        disabled={options.disabled}
      >
        Previous
      </button>
    );
  },
  NextPageLink: (options: PaginatorNextPageLinkOptions) => {
    return (
      <button
        type="button"
        className={classNames(options.className, "border-round-sm h-2rem px-3")}
        onClick={options.onClick}
        disabled={options.disabled}
      >
        Next
      </button>
    );
  },
};

const SelectedTable: FC = () => {
  const {
    textanalysis: { meta, selectedDocuments },
  } = useSelector(appSelector);
  const [sortField, setSortField] = useState("");
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [sortOrder, setSortOrder] = useState("");
  const [selectedRows, setSelectedRows] =
    useState<DataTableValueArray>(selectedDocuments);

  const dispatch = useDispatch<AppDispatch>();

  const { handleNext, handleBack } = useStepHandler();

  const getListParams = () => {
    const listParams: IGetDocumentsParams = {};
    return listParams;
  };

  const { onSort } = useTableHandlers(dispatch, getListParams);

  const handlePageChange = (event: DataTableStateEvent) => {
    const payload = {
      ...getListParams(),
      page: (event?.page ?? 0) + 1,
      pageSize: event.rows,
    };
    setPageSize(event.rows ?? PAGE_SIZE);
    dispatch(getDocuments(payload));
  };

  const handleSortChange = (field: string) => {
    onSort(field, sortField, sortOrder, (newField, newOrder) => {
      setSortField(newField);
      setSortOrder(newOrder);
    });
  };

  const handleNextStep = () => {
    dispatch(setSelectedDocuments(selectedRows));
    handleNext();
  };
  const handleBackStep = () => {
    dispatch(setSelectedDocuments(selectedRows));
    handleBack();
  };

  const rightContent = (
    <div className="flex align-items-center gap-3">
      <Button
        label="Previous"
        type="button"
        className="surface-500 text-gray-900 border-none"
        onClick={handleBackStep}
      />
      <Button
        label="Next"
        disabled={!selectedRows?.length}
        type="button"
        className="text-gray-900 border-none"
        onClick={handleNextStep}
      />
    </div>
  );

  return (
    <div className="flex flex-column gap-3">
      <h5 className="text-lg font-semibold m-0">
        Already analyzed in current selection
      </h5>
      <DataTable
        value={selectedDocuments}
        paginator={meta?.total > pageSize}
        first={meta?.page * pageSize}
        rows={pageSize}
        totalRecords={meta?.total}
        paginatorRight={rightContent}
        paginatorTemplate={paginatorTemplate}
        paginatorClassName="justify-content-between align-items-center mt-8"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        stripedRows
        removableSort
        rowsPerPageOptions={[10, 25, 50]}
        selectionMode={"checkbox"}
        selection={selectedRows}
        onPage={handlePageChange}
        onSelectionChange={(
          e: DataTableSelectionMultipleChangeEvent<DataTableValueArray>
        ) => setSelectedRows(e.value)}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>
        <Column
          field="name"
          header={
            <SortableHeader
              title="Name"
              field="name"
              sortOrder={sortOrder}
              sortField={sortField}
              onClick={handleSortChange}
            />
          }
          body={(rowData) => (
            <span className="text-green-700">{rowData.name}</span>
          )}
        />
        <Column
          field="c"
          header={
            <SortableHeader
              title="Privacy Status"
              field="privacyStatus"
              sortOrder={sortOrder}
              sortField={sortField}
              onClick={handleSortChange}
            />
          }
          body={(rowData) => (
            <div className="flex justify-content-center max-w-max border-round-2xl p-2 bg-green-500 text-green-700">
              {rowData.privacyStatus}
            </div>
          )}
        />
        <Column
          field="uploadDate"
          header={
            <SortableHeader
              title="Date"
              field="uploadDate"
              sortOrder={sortOrder}
              sortField={sortField}
              onClick={handleSortChange}
            />
          }
        />
        <Column
          field="fileCategory"
          header={
            <SortableHeader
              title="File category"
              field="fileCategory"
              sortOrder={sortOrder}
              sortField={sortField}
              onClick={handleSortChange}
            />
          }
        />
        <Column
          field="analyzed"
          header={
            <SortableHeader
              title="Analyzed"
              field="analyzed"
              sortOrder={sortOrder}
              sortField={sortField}
              onClick={handleSortChange}
            />
          }
          body={(rowData) => (
            <div className="flex align-items-center gap-2">
              <span
                className={classNames("border-circle w-1rem h-1rem", {
                  "bg-green-500": rowData.analyzed.state === "Analyzed",
                  "surface-200": rowData.analyzed.state !== "Analyzed",
                })}
              />
              <span
                className={classNames({
                  "text-green-500": rowData.analyzed.state === "Analyzed",
                  "text-surface-200": rowData.analyzed.state !== "Analyzed",
                })}
              >
                {rowData.analyzed.state}{" "}
                {rowData.analyzed.state === "Analyzed"
                  ? `(${rowData.analyzed.count})`
                  : ""}
              </span>
            </div>
          )}
        />
      </DataTable>
    </div>
  );
};

export default SelectedTable;
