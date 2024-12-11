"use client";
import { ChangeEvent, type FC, useEffect, useRef, useState } from "react";
import { TabPanel, TabView } from "primereact/tabview";
import {
  DataTable,
  DataTableSelectionMultipleChangeEvent,
  DataTableStateEvent,
  DataTableValueArray,
} from "primereact/datatable";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";
import { Column } from "primereact/column";
import { classNames } from "primereact/utils";
import { useDispatch, useSelector } from "react-redux";
import { appSelector } from "@/store";
import { type AppDispatch } from "@/core/rootStore";
import {
  IDataValues,
  IDataValuesParams,
  getValuesList,
  resetMeta,
} from "@/store/dataValues";
import { PAGE_SIZE } from "@/constants/general";
import { InputText } from "primereact/inputtext";
import SortableHeader from "@/utils/dataTable/SortableHeader";
import { Menu } from "primereact/menu";
import { Checkbox } from "primereact/checkbox";
import { ProgressBar } from "primereact/progressbar";
import {
  PaginatorNextPageLinkOptions,
  PaginatorPrevPageLinkOptions,
} from "primereact/paginator";

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

const TableWithTabs: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    dataValues: { meta, isLoading, values },
  } = useSelector(appSelector);

  const allColumns = [
    { field: "value", header: "Value", sortable: true },
    { field: "mergingOf", header: "Merging of", sortable: true },
    { field: "occurredIn", header: "Occurred in", sortable: true },
    { field: "approvedRatings", header: "% Approved Ratings", sortable: true },
    { field: "allRatings", header: "% All Ratings", sortable: true },
    { field: "typeLabel", header: "Type label", sortable: true },
  ];

  const [sortField, setSortField] = useState("");
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [sortOrder, setSortOrder] = useState("");
  const [selectedRows, setSelectedRows] = useState<DataTableValueArray>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [search, setSearch] = useState("");
  // const [sortStates, setSortStates] = useState<
  //   Record<string, { sortField: string; sortOrder: string }>
  // >({});
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    "value",
    "mergingOf",
    "occurredIn",
    "approvedRatings",
    "allRatings",
    "typeLabel",
  ]);

  const menu = useRef<Menu>(null);

  useEffect(() => {
    const payload = {} as IDataValuesParams;
    dispatch(getValuesList(payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getListParams = () => {
    const listParams: IDataValuesParams = {};
    return listParams;
  };

  const onPage = (event: DataTableStateEvent) => {
    const newPageSize = event.rows ?? pageSize;
    const payload = getListParams();
    payload.page = (event?.page ?? 0) + 1;
    payload.pageSize = newPageSize;
    setPageSize(newPageSize);
    dispatch(getValuesList(payload));
  };

  const approvedRatingsTemplate = (rowData: IDataValues) => {
    const color = rowData.approvedRatings < 50 ? "#F71014" : "#0AFFA5";
    return (
      <div className="flex align-items-center gap-3">
        <span className="text-gray-900 text-sm">
          {rowData.approvedRatings}%
        </span>
        <ProgressBar
          color={color}
          value={rowData.approvedRatings}
          showValue={false}
          className="h-1rem border-noround w-full"
        />
      </div>
    );
  };
  const allRatingsTemplate = (rowData: IDataValues) => {
    const color = rowData.approvedRatings < 50 ? "#F71014" : "#0AFFA5";
    return (
      <div className="flex align-items-center gap-3">
        <span className="text-gray-900 text-sm">{rowData.allRatings}%</span>
        <ProgressBar
          color={color}
          value={rowData.allRatings}
          showValue={false}
          className="h-1rem border-noround w-full"
        />
      </div>
    );
  };
  const typeLabelTemplate = (rowData: IDataValues) => {
    return (
      <div className="flex justify-content-center p-2 border-round-3xl border-gray-700 border-1">
        {rowData.typeLabel}
      </div>
    );
  };

  const columnTemplates: Record<
    string,
    (data: IDataValues) => JSX.Element | string
  > = {
    approvedRatings: (rowData) => approvedRatingsTemplate(rowData),
    allRatings: (rowData) => allRatingsTemplate(rowData),
    typeLabel: (rowData) => typeLabelTemplate(rowData),
  };

  const onSort = (field: string) => {
    let order = "";
    const payload = getListParams();
    if (search?.length) {
      payload.search = search;
    }
    if (sortField === field) {
      order = sortOrder === "DESC" ? "ASC" : "DESC";
    } else {
      order = "ASC";
    }
    setSortField(field);
    setSortOrder(order);
    payload.sortBy = field;
    payload.sortOrder = order;
    // dispatch(getValuesList(payload));
  };

  // const onSort = (field: string, status: string) => {
  //   setSortStates((prevStates) => {
  //     const currentState = prevStates[status] || { sortField: "", sortOrder: "" };
  //     const order = currentState.sortField === field
  //       ? currentState.sortOrder === "DESC"
  //         ? "ASC"
  //         : "DESC"
  //       : "ASC";

  //     return {
  //       ...prevStates,
  //       [status]: { sortField: field, sortOrder: order },
  //     };
  //   });

  //   const payload = getListParams();
  //   payload.sortBy = field;
  //   payload.sortOrder = sortStates[status]?.sortOrder || "ASC";
  //   // dispatch(getValuesList(payload));
  // };

  const toggleColumnVisibility = (field: string) => {
    setVisibleColumns((prev) =>
      prev.includes(field)
        ? prev.filter((col) => col !== field)
        : [...prev, field]
    );
  };

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0 || e.target.value.length > 2) {
      const payload = getListParams();
      if (!sortField && !sortOrder) {
        payload.search = e.target.value;
        dispatch(getValuesList(payload));
      } else {
        payload.search = e.target.value;
        payload.sortBy = sortField;
        payload.sortOrder = sortOrder;
        dispatch(getValuesList(payload));
      }
    }
    setSearch(e.target.value);
  };

  return (
    <>
      {!isLoading && (
        <div className="relative">
          <TabView
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
            className="with-border"
          >
            {values.map(({ status, data }) => (
              <TabPanel
                key={status}
                header={status}
                headerTemplate={(options) => {
                  return (
                    <div
                      onClick={(params) => {
                        options.onClick(params);
                        dispatch(resetMeta());
                      }}
                      className={classNames("cursor-pointer tabview-header", {
                        "tabview-header-active": options.selected,
                      })}
                    >
                      {status}{" "}
                      <Badge
                        className={classNames({})}
                        style={{ color: "inherit" }}
                        value={data.length}
                      />
                    </div>
                  );
                }}
              >
                <div className="mt-4">
                  <DataTable
                    value={data}
                    paginator={meta?.total > pageSize}
                    first={meta?.page * pageSize}
                    rows={pageSize}
                    totalRecords={meta?.total}
                    paginatorTemplate={paginatorTemplate}
                    paginatorClassName="justify-content-between align-items-center"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                    stripedRows
                    removableSort
                    rowsPerPageOptions={[10, 25, 50]}
                    selectionMode={"checkbox"}
                    selection={selectedRows}
                    onPage={onPage}
                    onSelectionChange={(
                      e: DataTableSelectionMultipleChangeEvent<DataTableValueArray>
                    ) => setSelectedRows(e.value)}
                  >
                    <Column
                      selectionMode="multiple"
                      headerStyle={{ width: "3rem" }}
                    ></Column>
                    {allColumns
                      .filter((col) => visibleColumns.includes(col.field))
                      .map((col) => (
                        <Column
                          key={col.field}
                          field={col.field}
                          header={
                            col.sortable ? (
                              <SortableHeader
                                title={col.header}
                                field={col.field}
                                sortOrder={sortOrder}
                                sortField={sortField}
                                onClick={onSort}
                              />
                            ) : (
                              col.header
                            )
                          }
                          body={(rowData) =>
                            columnTemplates[col.field]
                              ? columnTemplates[col.field](rowData)
                              : rowData[col.field]
                          }
                        />
                      ))}
                    {/* <Column
                      body={(rowData) => (
                        <Button
                          icon="pi pi-cog"
                          className="p-button-rounded p-button-secondary"
                          onClick={() => alert(`Action for ${rowData.value}`)}
                        />
                      )}
                    /> */}
                  </DataTable>
                </div>
              </TabPanel>
            ))}
          </TabView>
          <div
            className="flex justify-content-between align-items-center gap-2 absolute right-0"
            style={{ top: "-1%" }}
          >
            <span className="p-input-icon-left w-12 md:w-20rem">
              <i className="pi pi-search"></i>
              <InputText
                type="text"
                placeholder="Search"
                className="w-full gray-300 bg-gray-100"
                value={search}
                onChange={onSearch}
              />
            </span>
            <div className="">
              <Menu
                model={[
                  {
                    label: "Columns",
                    template: () => (
                      <div className="flex flex-column p-3 gap-2">
                        {allColumns.map((col) => (
                          <div
                            key={col.field}
                            className={classNames(
                              "flex align-items-center gap-3 p-2 border-round-lg",
                              {
                                "bg-green-100": visibleColumns.includes(
                                  col.field
                                ),
                              }
                            )}
                          >
                            <Checkbox
                              inputId={col.field}
                              value={col.field}
                              onChange={() => toggleColumnVisibility(col.field)}
                              checked={visibleColumns.includes(col.field)}
                            />
                            <label htmlFor={col.field}>{col.header}</label>
                          </div>
                        ))}
                      </div>
                    ),
                  },
                ]}
                popup
                ref={menu}
              />
              <Button
                label="Add Value"
                aria-controls="popup_menu_left"
                className="text-gray-900"
                onClick={(event) => menu?.current?.toggle(event)}
              />
            </div>
          </div>
          {selectedRows.length > 0 && (
            <div className="p-5 bg-green-200 w-full sticky bottom-0 left-0">
              <div className="flex justify-content-between align-items-center">
                <span className="text-gray-900">
                  {selectedRows.length}{" "}
                  {selectedRows.length > 1 ? "items" : "item"} selected
                </span>
                <div className="flex align-items-center gap-3">
                  <Button
                    label="Merge"
                    outlined
                    className="text-gray-900"
                    onClick={() => alert("Merge")}
                  />
                  <Button
                    label="Unmerge"
                    outlined
                    className="text-gray-900"
                    onClick={() => alert("Unmerge")}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TableWithTabs;
