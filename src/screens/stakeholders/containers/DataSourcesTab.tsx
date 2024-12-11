"use client";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/core/rootStore";
import { appSelector } from "@/store";
import {
  IStakeholderDocument,
  IStakeholderMergingOf,
  getStakeholderDocuments,
  getStakeholderMergingOf,
  getStakeholderPolling,
  getStakeholderTranscripts,
} from "@/store/stakeholder";
import { CardComponent } from "@/components";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProgressBar } from "primereact/progressbar";
import { getBgColor } from "@/utils/helpers/color";

interface IProps {
  id: string;
}

const DataSources: FC<IProps> = ({ id }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    stakeholder: {
      stakeholderDocuments,
      stakeholderMergingOf,
      stakeholderPolling,
      stakeholderTranscripts,
    },
  } = useSelector(appSelector);

  useEffect(() => {
    dispatch(getStakeholderDocuments({ id }));
    dispatch(getStakeholderTranscripts({ id }));
    dispatch(getStakeholderPolling({ id }));
    dispatch(getStakeholderMergingOf({ id }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <>
          <h5 className="text-lg font-semibold">Documents</h5>
          <DataTable
            value={stakeholderDocuments}
            paginator
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
              header="Format"
              style={{ width: "20%" }}
            ></Column>
            <Column
              field="addedBy"
              header="Added By"
              style={{ width: "15%" }}
            ></Column>
          </DataTable>
          <h5 className="text-lg font-semibold">Engagement transcripts</h5>
          <DataTable
            value={stakeholderTranscripts}
            paginator
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
              field="type"
              header="Type"
              style={{ width: "15%" }}
            ></Column>
          </DataTable>
          <h5 className="text-lg font-semibold">Polling data</h5>
          <DataTable
            value={stakeholderPolling}
            paginator
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
              field="mediator"
              header="Mediator"
              style={{ width: "15%" }}
            ></Column>
          </DataTable>

          <h5 className="text-lg font-semibold">Merging of</h5>
          <DataTable
            value={stakeholderMergingOf}
            paginator
            rows={10}
            tableStyle={{ minWidth: "50rem" }}
            className="p-plain-datatable"
            stripedRows
          >
            <Column
              field="stakeholderName"
              header="Stakeholder"
              style={{ width: "15%" }}
            ></Column>
            <Column
              header="Merging Of"
              body={(rowData: IStakeholderMergingOf) =>
                rowData.mergingOf?.join(", ")
              }
              style={{ width: "15%" }}
            ></Column>
            <Column
              header="Occurred in"
              body={(rowData: IStakeholderMergingOf) =>
                rowData.occurredIn?.join(", ")
              }
              style={{ width: "20%" }}
            ></Column>
            <Column
              header="% approved ratings"
              body={(rowData: IStakeholderMergingOf) => (
                <div className="flex align-items-center px-2">
                  <span className="mr-2">{rowData.approvedRating}%</span>
                  <ProgressBar
                    value={rowData.approvedRating}
                    showValue={false}
                    className="w-full border-noround p-datatable-progress-bar"
                    color="#F49F9F"
                  ></ProgressBar>
                </div>
              )}
              style={{ width: "20%" }}
            ></Column>
            <Column
              header="% all ratings"
              body={(rowData: IStakeholderMergingOf) => (
                <div className="flex align-items-center px-2">
                  <span className="mr-2">{rowData.rating}%</span>
                  <ProgressBar
                    value={rowData.rating}
                    showValue={false}
                    className="w-full border-noround p-datatable-progress-bar"
                    color="#A3CA9A"
                  ></ProgressBar>
                </div>
              )}
              style={{ width: "20%" }}
            ></Column>
          </DataTable>
        </>
      }
    />
  );
};

export default DataSources;
