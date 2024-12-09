"use client";
import { AppDispatch } from "@/core/rootStore";
import { appSelector } from "@/store";
import { getUser } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type Page } from "types";
import { TabPanel, TabView } from "primereact/tabview";
import { IStakeholder, getList } from "@/store/stakeholder";

const StakeholdersOverview: Page = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {
    auth: { user },
  } = useSelector(appSelector);

  useEffect(() => {
    dispatch(getList());
  }, []);
  const {
    stakeholder: { stakeholders, isLoading },
  } = useSelector(appSelector);

  useEffect(() => {}, []);
  return (
    <div className="card">
      {isLoading
        ? "Loading"
        : stakeholders.map((stakeholder: IStakeholder) => (
            <div
              key={stakeholder.id}
              className="cursor-pointer mb-2 font-semibold text-lg"
              onClick={() =>
                router.push("/data-review/stakeholders/" + stakeholder.id)
              }
            >
              {stakeholder?.name}
            </div>
          ))}
    </div>
  );
};

export default StakeholdersOverview;
