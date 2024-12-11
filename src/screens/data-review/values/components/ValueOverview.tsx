"use client";
import { type FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardComponent, paginatorTemplate } from "@/components";
import { appSelector } from "@/store";
import { getValueDocuments } from "@/store/dataValues";
import { IStakeholderDocument } from "@/store/stakeholder";
import { getBgColor } from "@/utils/helpers/color";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { type AppDispatch } from "@/core/rootStore";
import { RatingChart, WordCloudChart } from "../charts";

interface IValueOverview {
  id: string;
}

const ValueOverview: FC<IValueOverview> = ({ id }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    dataValues: { valueDocuments, isGettingDocuments },
  } = useSelector(appSelector);

  useEffect(() => {
    dispatch(getValueDocuments({ id }));
  }, []);

  const nameBody = (rowData: IStakeholderDocument) => {
    return (
      <div className="p-link hover:underline cursor-pointer">
        <a
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            //download document
          }}
        >
          {rowData?.name}
        </a>
      </div>
    );
  };

  const statusBody = (rowData: IStakeholderDocument) => {
    return (
      <div className="flex justify-content-start">
        <div
          className="border-round-xl px-2 py-1 text-white"
          style={{
            backgroundColor: getBgColor(rowData.privacyStatus as string),
          }}
        >
          {rowData?.privacyStatus}
        </div>
      </div>
    );
  };

  return (
    <CardComponent
      className="mt-3"
      content={
        <div className="grid">
          <div className="col-12 lg:col-6  border-right-0 lg:border-right-1 border-gray-100">
            <h5 className="text-lg font-semibold">Merging of</h5>
            <WordCloudChart />
          </div>
          <div className="col-12 lg:col-6 lg:pl-4">
            <h5 className="text-lg font-semibold">Rating percentage</h5>
            <RatingChart />
          </div>
          <div className="col-12">
            <h5 className="text-lg font-semibold">Documents</h5>
            <DataTable
              value={valueDocuments}
              paginator
              paginatorTemplate={paginatorTemplate}
              rows={10}
              tableStyle={{ minWidth: "50rem" }}
              className="p-plain-datatable"
              stripedRows
            >
              <Column
                field="name"
                header="Name"
                body={nameBody}
                style={{ width: "20%" }}
              ></Column>
              <Column
                field="updatedDate"
                header="Updated date"
                style={{ width: "15%" }}
              ></Column>
              <Column
                field="privacyStatus"
                body={statusBody}
                header="Privacy Status"
                style={{ width: "15%" }}
              ></Column>
              <Column
                field="format"
                header="Format"
                style={{ width: "15%" }}
              ></Column>
              <Column
                field="category"
                header="Format category"
                style={{ width: "20%" }}
              ></Column>
              <Column
                field="addedBy"
                header="Added By"
                style={{ width: "15%" }}
              ></Column>
            </DataTable>
          </div>
        </div>
      }
    />
  );
};

export default ValueOverview;
