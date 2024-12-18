import { type FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch } from "@/core/rootStore";
import { appSelector } from "@/store";
import {
  type IGetDocumentsParams,
  IReviewStakeholder,
  getReviewValues,
} from "@/store/textanalysis";
import ResultTable from "./ResultTable";

const ResultValue: FC = () => {
  const {
    textanalysis: { isGettingReviewValues, reviewValues },
  } = useSelector(appSelector);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const payload = {} as IGetDocumentsParams;
    dispatch(getReviewValues(payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const preselectedRows = reviewValues;

  const columnsForStakeholders = [
    {
      field: "name",
      header: "Name",
      body: (rowData: IReviewStakeholder) => (
        <span className="text-gray-900 text-sm">{rowData.name}</span>
      ),
    },
    {
      field: "occurredIn",
      header: "Occurred In",
      body: (rowData: IReviewStakeholder) => (
        <span className="text-gray-900 text-sm">
          {rowData.occurredIn.join(", ")}
        </span>
      ),
    },
    { field: "ratings", header: "# Ratings" },
  ];
  return (
    <ResultTable
      data={reviewValues}
      initialSelected={preselectedRows}
      title="Values"
      columns={columnsForStakeholders}
    />
  );
};

export default ResultValue;
