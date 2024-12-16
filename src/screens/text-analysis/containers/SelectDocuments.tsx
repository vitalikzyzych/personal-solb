"use client";
import { type AppDispatch } from "@/core/rootStore";
import { appSelector } from "@/store";
import { type IGetDocumentsParams, getDocuments } from "@/store/textanalysis";
import { type FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectTable from "./SelectTable";
import NoData from "./NoData";

const SelectDocuments: FC = () => {
  const {
    textanalysis: { selectDocuments, selectedDocuments },
  } = useSelector(appSelector);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const payload = {} as IGetDocumentsParams;
    dispatch(getDocuments(payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="card w-full">
      {selectDocuments.length ? (
        <SelectTable
          data={selectDocuments}
          selectedDocuments={selectedDocuments}
        />
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default SelectDocuments;
