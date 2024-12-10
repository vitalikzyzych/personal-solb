"use client";
import { AppDispatch } from "@/core/rootStore";
import { appSelector } from "@/store";
import { DataView, DataViewPageEvent } from "primereact/dataview";
import { ChangeEvent, type FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileCardItem from "./ProfileCardItem";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { DATA_VIEW_PAGE_SIZE } from "@/constants/general";
import { paginatorTemplate } from "@/components";
import { IStakeholderListParams, getList } from "@/store/stakeholder";

const Profiles: FC = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"Name" | "Value">("Name");

  const dispatch = useDispatch<AppDispatch>();
  const {
    stakeholder: { isLoading, stakeholders, meta },
  } = useSelector(appSelector);

  const sortOptions = [
    { label: "Name", value: "Name" },
    { label: "Value", value: "Value" },
  ];

  useEffect(() => {
    const payload = getListParams();
    dispatch(getList(payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getListParams = () => {
    const listParams: IStakeholderListParams = {};
    return listParams;
  };

  const onPage = (event: DataViewPageEvent) => {
    const payload = getListParams();

    payload.page = (event?.page ?? 0) + 1;
    console.log(payload);
    dispatch(getList(payload));
  };

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0 || e.target.value.length > 2) {
      const payload = getListParams();
      payload.search = e.target.value;
      payload.sortBy = sortBy;
      dispatch(getList(payload));
    }
    setSearch(e.target.value);
  };

  return (
    <div className="relative">
      <div
        className="flex justify-content-between align-items-center gap-2 absolute right-0"
        style={{ top: "-55px" }}
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
        <div className="flex align-items-center gap-2">
          <label htmlFor="sort" className="text-gray-900 text-base">
            sort by
          </label>
          <Dropdown
            id="sort"
            value={sortBy}
            options={sortOptions}
            onChange={(e) => setSortBy(e.value)}
            placeholder="Sort by"
            className="w-max"
          />
        </div>
      </div>
      {isLoading ? (
        "Loading..."
      ) : (
        <div className="grid mt-3">
          <DataView
            value={stakeholders}
            layout="grid"
            style={{ background: "transparent" }}
            paginator={meta?.total > DATA_VIEW_PAGE_SIZE}
            first={meta?.page * DATA_VIEW_PAGE_SIZE}
            rows={DATA_VIEW_PAGE_SIZE}
            onPage={onPage}
            paginatorTemplate={paginatorTemplate}
            itemTemplate={(data) => (
              <div
                className="col-12 sm:col-6 md:col-4 xl:col-3 xl2:col-2 p-2"
                key={data.id}
              >
                <ProfileCardItem {...data} />
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default Profiles;
