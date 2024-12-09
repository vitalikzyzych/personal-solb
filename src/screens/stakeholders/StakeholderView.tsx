"use client";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppDispatch } from "@/core/rootStore";
import { appSelector } from "@/store";
import { getTheme } from "@/store/settings";
import { getCurrentTheme } from "@/constants/theme";
import { generateClusterDataForRadialChart } from "@/utils/fakeData";
import { getStakeholder } from "@/store/stakeholder";
import { TabPanel, TabView } from "primereact/tabview";
import Values from "./viewTabs/Values";
import Relationships from "./viewTabs/Relationships";
import DataSources from "./viewTabs/DataSources";
import { solvChevronLeft } from "@/assets/svg/icons";
import Identity from "./viewTabs/Identity";

interface IProps {
  id: string;
}

const StakeholderView: FC<IProps> = ({ id }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {
    stakeholder: { isGetting, stakeholder },
  } = useSelector(appSelector);

  useEffect(() => {
    dispatch(getStakeholder({ id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, []);
  return (
    <>
      {isGetting ? (
        "Loading"
      ) : (
        <>
          <div className="mb-2 font-semibold text-lg flex align-items-center">
            <span className="cursor-pointer mr-4" onClick={() => router.back()}>
              <FontAwesomeIcon icon={solvChevronLeft} />
            </span>
            {stakeholder?.name}
            <span
              className="p-2 ml-2 text-white text-sm border-round-2xl"
              style={{ background: "#519560" }}
            >
              approved
            </span>
          </div>
          <TabView
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
            className="w-full"
          >
            <TabPanel header="Values">
              <Values id={id} />
            </TabPanel>
            <TabPanel header="Relationships">
              <Relationships id={id} />
            </TabPanel>
            <TabPanel header="Data Sources">
              <DataSources id={id} />
            </TabPanel>
            <TabPanel header="Identity">
              <Identity id={id} />
            </TabPanel>
          </TabView>
        </>
      )}
    </>
  );
};

export default StakeholderView;
