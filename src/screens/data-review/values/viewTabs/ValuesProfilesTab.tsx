"use client";
import { AppDispatch } from "@/core/rootStore";
import { appSelector } from "@/store";
import { IDataValuesParams, getProfilesList } from "@/store/dataValues";
import { DataView, DataViewPageEvent } from "primereact/dataview";
import { ChangeEvent, type FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProfileCardItem } from "../components";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { PAGE_SIZE } from "@/constants/general";
import { paginatorTemplate } from "@/components";

const ValuesProfilesTab: FC = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"Name" | "Value">("Name");

  const dispatch = useDispatch<AppDispatch>();
  const {
    dataValues: { isProfilesLoading, profiles, metaProfiles },
  } = useSelector(appSelector);

  const sortOptions = [
    { label: "Name", value: "Name" },
    { label: "Value", value: "Value" },
  ];

  useEffect(() => {
    const payload = getListParams();
    dispatch(getProfilesList(payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getListParams = () => {
    const listParams: IDataValuesParams = {};
    return listParams;
  };

  const onPage = (event: DataViewPageEvent) => {
    const payload = getListParams();

    payload.page = (event?.page ?? 0) + 1;
    console.log(payload);
    dispatch(getProfilesList(payload));
  };

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0 || e.target.value.length > 2) {
      const payload = getListParams();
      payload.search = e.target.value;
      payload.sortBy = sortBy;
      dispatch(getProfilesList(payload));
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
      {isProfilesLoading ? (
        "Loading..."
      ) : (
        <div className="grid mt-3">
          <DataView
            value={profiles}
            layout="grid"
            style={{ background: "transparent" }}
            paginator={metaProfiles?.total > PAGE_SIZE}
            first={metaProfiles?.page * PAGE_SIZE}
            rows={PAGE_SIZE}
            onPage={onPage}
            paginatorTemplate={paginatorTemplate}
            itemTemplate={(data) => (
              <div className="col-12 md:col-6 xl:col-3 p-2" key={data.id}>
                <ProfileCardItem {...data} />
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default ValuesProfilesTab;
