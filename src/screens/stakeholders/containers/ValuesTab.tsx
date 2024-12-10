"use client";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/core/rootStore";
import { appSelector } from "@/store";
import { getStakeholderValues } from "@/store/stakeholder";
import StakeholderRatings from "../charts/ValueRatings";
import ScatterPlotMinimal from "../charts/ScatterPlot";

interface IProps {
  id: string;
}

const Values: FC<IProps> = ({ id }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    stakeholder: { isGettingValues },
  } = useSelector(appSelector);

  useEffect(() => {
    dispatch(getStakeholderValues({ id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, []);
  return (
    <>
      {isGettingValues ? (
        "Loading"
      ) : (
        <div className="grid">
          <div className="col-12">
            <StakeholderRatings
              title="Stakeholders values"
              subTitle="Overview of how stakeholders rate project specific values"
              isIcon={false}
            />
          </div>
          <div className="col-12">
            <ScatterPlotMinimal />
          </div>
        </div>
      )}
    </>
  );
};

export default Values;
