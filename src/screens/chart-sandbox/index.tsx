"use client";
import { AppDispatch } from "@/core/rootStore";
import { appSelector } from "@/store";
import { getUser } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type Page } from "types";
import MultiCenterChart from "./chart";

const ChartSandbox: Page = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {
    auth: { user },
  } = useSelector(appSelector);

  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <>
      <div className="flex align-items-center justify-content-between flex-column">
        <MultiCenterChart />
      </div>
    </>
  );
};

export default ChartSandbox;
