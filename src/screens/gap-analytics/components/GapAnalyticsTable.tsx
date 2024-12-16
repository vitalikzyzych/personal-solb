"use client";
import { ChangeEvent, type FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Column } from "primereact/column";
import {
  DataTable,
  DataTableSelectionMultipleChangeEvent,
  DataTableStateEvent,
  DataTableValueArray,
} from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Menu } from "primereact/menu";
import { ProgressBar } from "primereact/progressbar";
import { TabPanel, TabView } from "primereact/tabview";
import { classNames } from "primereact/utils";
import { v4 as uuidv4 } from "uuid";

import { paginatorTemplate } from "@/components";
import { PAGE_SIZE } from "@/constants/general";
import { appSelector } from "@/store";
import { type AppDispatch } from "@/core/rootStore";
import SortableHeader from "@/utils/dataTable/SortableHeader";
import { IStakeholder, resetMeta } from "@/store/stakeholder";

import {
  IGapAnalytics,
  IGapAnalyticsListParams,
  getListAll,
} from "@/store/gapAnalytics";
import StatusLabel from "./StatusLabel";

const GapAnalyticsTable: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    gapAnalytics: { meta, isLoading, allGapAnalytics },
  } = useSelector(appSelector);

  const allColumns = [
    {
      field: "stakeholderName",
      header: "Stakeholder",
      sortable: true,
      width: "15%",
    },
    {
      field: "rating",
      header: "% Ratings",
      sortable: true,
      width: "12%",
    },
    {
      field: "community",
      header: "Community",
      sortable: true,
      width: "12%",
    },
    { field: "progress", header: "Progress", sortable: true, width: "15%" },
    {
      field: "safety",
      header: "Safety",
      sortable: true,
      width: "15%",
    },
    {
      field: "network",
      header: "Network Fos...",
      sortable: true,
      width: "15%",
    },
    // { field: "rating", header: "% All Rtg", sortable: true, width: "15%" },
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
    "stakeholderName",
    "ratings",
    "community",
    "progress",
    "safety",
    "network",
    "rating",
  ]);

  const menu = useRef<Menu>(null);
  const router = useRouter();

  useEffect(() => {
    const payload = {} as IGapAnalyticsListParams;
    dispatch(getListAll(payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getListParams = () => {
    const listParams: IGapAnalyticsListParams = {};
    return listParams;
  };

  const onPage = (event: DataTableStateEvent) => {
    const newPageSize = event.rows ?? pageSize;
    const payload = getListParams();
    payload.page = (event?.page ?? 0) + 1;
    payload.pageSize = newPageSize;
    setPageSize(newPageSize);
    dispatch(getListAll(payload));
  };

  const approvedRatingTemplate = (rowData: IGapAnalytics) => {
    const color = rowData.rating < 50 ? "#F71014" : "#0AFFA5";
    return (
      <div className="flex align-items-center gap-3">
        <span className="text-gray-900 text-sm">{rowData.rating}%</span>
        <ProgressBar
          color={color}
          value={rowData.rating}
          showValue={false}
          className="h-1rem border-noround w-full"
        />
      </div>
    );
  };

  const statusTemplate = (status: string) => {
    return (
      <div className="flex align-items-center gap-3">
        <span className="text-gray-900 text-sm">{status}</span>
      </div>
    );
  };
  const ratingTemplate = (rowData: IGapAnalytics) => {
    const color = rowData.rating < 50 ? "#F71014" : "#0AFFA5";
    return (
      <div className="flex align-items-center gap-3">
        <span className="text-gray-900 text-sm">{rowData.rating}%</span>
        <ProgressBar
          color={color}
          value={rowData.rating}
          showValue={false}
          className="h-1rem border-noround w-full"
        />
      </div>
    );
  };

  const genericTemplate = (
    rowData: IGapAnalytics,
    field: keyof IGapAnalytics
  ) => {
    const value = rowData[field];
    const backgroundColor =
      value === "Safety"
        ? "#0AFFA5"
        : value === "Missing"
          ? "#595959"
          : "#BDECDA";

    return (
      <div
        style={{
          width: "101px",
          height: "30px",
          borderRadius: "10px",
          backgroundColor,
        }}
      ></div>
    );
  };
  const stakeholderNameTemplate = (rowData: IGapAnalytics) => {
    return (
      <div
        onClick={() => router.push("/data-review/stakeholders/" + rowData.id)}
        className="flex cursor-pointer"
      >
        {rowData.stakeholderName}
      </div>
    );
  };

  const columnTemplates: Record<
    string,
    (data: IGapAnalytics) => JSX.Element | string
  > = {
    approvedRating: (rowData) => approvedRatingTemplate(rowData),
    rating: (rowData) => ratingTemplate(rowData),
    stakeholderName: (rowData) => stakeholderNameTemplate(rowData),
    community: (rowData) => genericTemplate(rowData, "community"),
    progress: (rowData) => genericTemplate(rowData, "progress"),
    safety: (rowData) => genericTemplate(rowData, "safety"),
    network: (rowData) => genericTemplate(rowData, "network"),
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
        dispatch(getListAll(payload));
      } else {
        payload.search = e.target.value;
        payload.sortBy = sortField;
        payload.sortOrder = sortOrder;
        dispatch(getListAll(payload));
      }
    }
    setSearch(e.target.value);
  };

  return (
    <>
      {!isLoading && (
        <div className="">
          <div
            className="flex align-items-center justify-content-center gap-2 "
            // style={{ top: "-1%" }}
          >
            <div className="w-5">
              <h3 className="text-lg">Matrix</h3>
              <p>Overview of available, generated and missing data</p>
            </div>
            <div className="flex align-items-center justify-content-between w-6">
              <StatusLabel color="#0AFFA5" status="Safety" />
              <StatusLabel color="#BDECDA" status="Solv generated" />
              <StatusLabel color="#595959" status="Missing" />
            </div>
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
                icon="pi pi-cog"
                outlined
                severity="secondary"
                aria-controls="popup_menu_left"
                className="text-gray-900 border-200"
                onClick={(event) => menu?.current?.toggle(event)}
              />
            </div>
          </div>

          <div className="mt-4">
            <DataTable
              value={allGapAnalytics}
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
              className="p-plain-datatable"
              onSelectionChange={(
                e: DataTableSelectionMultipleChangeEvent<DataTableValueArray>
              ) => setSelectedRows(e.value)}
            >
              <Column
                selectionMode="multiple"
                headerStyle={{ width: "3%" }}
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
                    style={{ width: col.width }}
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
          {/* </TabPanel> */}
          {/* ))} */}
          {/* </TabView> */}

          {selectedRows.length > 0 && (
            <div className="p-5 bg-green-200 w-full fixed bottom-0 left-0">
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

export default GapAnalyticsTable;
