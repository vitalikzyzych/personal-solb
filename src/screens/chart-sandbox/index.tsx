"use client";
import { AppDispatch } from "@/core/rootStore";
import { appSelector } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type Page } from "types";
import MultiCenterChart from "./chart";
import { getTheme } from "@/store/settings";
import { getCurrentTheme } from "@/constants/theme";
import ClusterChart from "./polarChart";
import { generateClusterDataForRadialChart } from "@/utils/fakeData";

const ChartSandbox: Page = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {
    auth: { user },
  } = useSelector(appSelector);

  useEffect(() => {
    dispatch(getTheme());
  }, []);
  const {
    settings: { theme, isLoading },
  } = useSelector(appSelector);

  useEffect(() => {}, []);
  return (
    <>
      <div className="flex align-items-center justify-content-between flex-column">
        {!isLoading && (
          <>
            <MultiCenterChart theme={theme} />
            <div className="grid w-full p-2">
              {generateClusterDataForRadialChart(6).map((cluster, index) => (
                <div
                  key={index}
                  className="col-12 md:col-6 xl:col-4 flex justify-content-center"
                >
                  <ClusterChart
                    data={cluster}
                    color={getCurrentTheme(theme).values[index]}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ChartSandbox;
