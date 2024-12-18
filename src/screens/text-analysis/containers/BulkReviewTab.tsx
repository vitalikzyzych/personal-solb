"use client";
import { type FC } from "react";
import { useSelector } from "react-redux";
import { appSelector } from "@/store";
import { ContentKeys } from "@/store/textanalysis";
import { type AppDispatch } from "@/core/rootStore";
import ResultMenu from "./ResultMenu";
import ResultValue from "./ResultValue";
import ResultStakeholder from "./ResultStakeholder";
import { Button } from "primereact/button";

const BulkReviewTab: FC = () => {
  // const dispatch = useDispatch<AppDispatch>();
  const activeMenu = useSelector(appSelector).textanalysis.activeMenu;

  const getContent = (activeMenu: ContentKeys) => {
    switch (activeMenu) {
      case ContentKeys.STAKEHOLDERS_NEW:
        return <ResultStakeholder />;
      case ContentKeys.STAKEHOLDERS_EXISTING:
        return <ResultStakeholder />;

      case ContentKeys.VALUES_NEW:
        return <ResultValue />;
      case ContentKeys.VALUES_EXISTING:
        return <ResultValue />;
    }
  };

  const content = getContent(activeMenu);

  return (
    <div className="grid">
      <div className="col-3">
        <div className="card h-full">
          <ResultMenu />
        </div>
      </div>
      <div className="col-9">
        <div className="card flex flex-column gap-5">
          {content}
          <Button
            label="Finish"
            type="button"
            className="text-gray-900 border-none align-self-end max-w-max"
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default BulkReviewTab;
