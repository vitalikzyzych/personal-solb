"use client";
import { IStakeholder } from "@/store/stakeholder";
import { useRouter } from "next/navigation";
import { Divider } from "primereact/divider";
import { ProgressBar } from "primereact/progressbar";
import { classNames } from "primereact/utils";
import { type FC } from "react";

const ProfileCardItem: FC<IStakeholder> = ({
  id,
  stakeholderName,
  status,
  stakeholderType,
  affiliation,
}) => {
  const { push } = useRouter();
  return (
    <div
      className="card flex flex-column h-full flex-wrap relative cursor-pointer gap-4"
      onClick={() => {
        push(`/data-review/stakeholders/${id}`);
      }}
    >
      <div className="">
        <p className="text-wrap-one-line text-lg font-medium text-gray-800">
          {stakeholderName}
        </p>
        <Divider className="m-0" />
      </div>
      <div className="flex justify-content-between align-items-center gap-2">
        <div className="flex flex-column gap-2 w-6">
          <span className="text-sm text-gray-700">Profile type</span>
          <div className="flex align-items-center gap-3">
            <span className="text-gray-900">{stakeholderType}</span>
          </div>
        </div>
        <div className="flex flex-column gap-2">
          <span className="text-2xl text-center font-medium text-gray-800">
            12
          </span>
          <span className="text-sm text-gray-500">Value rating</span>
        </div>
      </div>
      <div className="flex justify-content-between align-items-end gap-2">
        <div className="flex flex-column gap-2 w-6">
          <span className="text-sm text-gray-700">Affiliation</span>
          <div className="flex align-items-center gap-3">
            <span className="text-gray-900 text-wrap-two-line">
              {affiliation}
            </span>
          </div>
        </div>
        <div
          className={classNames(
            "flex justify-content-center align-items-center p-1 px-2 border-round-xl text-gray-800 text-xs",
            {
              "bg-green-200": status === "Approved",
              "bg-green-100": status === "Potential",
              "bg-red-200": status === "Rejected",
              "text-white": status === "Rejected",
            }
          )}
        >
          {status}
        </div>
      </div>
    </div>
  );
};

export default ProfileCardItem;
