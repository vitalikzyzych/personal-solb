import { type FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch } from "@/core/rootStore";
import { appSelector } from "@/store";
import {
  type IGetDocumentsParams,
  IReviewStakeholder,
  getReviewStakeholders,
} from "@/store/textanalysis";
import ResultTable from "./ResultTable";

const ResultStakeholder: FC = () => {
  const {
    textanalysis: { isGettingReviewStakeholders, reviewStakeholders },
  } = useSelector(appSelector);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const payload = {} as IGetDocumentsParams;
    dispatch(getReviewStakeholders(payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnsForStakeholders = [
    {
      field: "name",
      header: "Name",
      body: (rowData: IReviewStakeholder) => (
        <span className="text-gray-900 text-sm">{rowData.name}</span>
      ),
    },
    { field: "affiliation", header: "Affiliation" },
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
      data={reviewStakeholders}
      initialSelected={reviewStakeholders}
      title="StakeHolders"
      columns={columnsForStakeholders}
    />
  );
};

export default ResultStakeholder;
