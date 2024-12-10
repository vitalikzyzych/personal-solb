"use client";
import { useRouter } from "next/navigation";
import { Divider } from "primereact/divider";
import { ProgressBar } from "primereact/progressbar";
import { classNames } from "primereact/utils";
import { type FC } from "react";

interface IProfileCard {
  id: string;
  title: string;
  status: string;
  value: number;
  approvedRatings: number;
  allRatings: number;
}

const ProfileCardItem: FC<IProfileCard> = ({
  id,
  title,
  status,
  value,
  allRatings,
  approvedRatings,
}) => {
  const { push } = useRouter();
  return (
    <div
      className="card flex flex-column h-full flex-wrap relative cursor-pointer gap-4"
      onClick={() => {
        push(`/data-review/values/${id}`);
      }}
    >
      <div className="">
        <p className="text-wrap-two-lines text-gray-800">{title}</p>
        <Divider className="m-0" />
      </div>
      <div className="flex justify-content-between align-items-center gap-2">
        <div className="flex flex-column gap-2 w-6">
          <span className="text-sm text-surface-400">% approved ratings</span>
          <div className="flex align-items-center gap-3">
            <span className="text-gray-900 text-sm">{approvedRatings}%</span>
            <ProgressBar
              color={approvedRatings < 50 ? "#F71014" : "#0AFFA5"}
              value={approvedRatings}
              showValue={false}
              className="h-0-5-rem  border-noround w-full"
            />
          </div>
        </div>
        <div className="flex flex-column gap-2">
          <span className="text-xl font-medium text-gray-800">{value}</span>
          <span className="text-sm text-surface-400">% approved ratings</span>
        </div>
      </div>
      <div className="flex justify-content-between align-items-center gap-2">
        <div className="flex flex-column gap-2 w-6">
          <span className="text-sm text-surface-400">% all ratings</span>
          <div className="flex align-items-center gap-3">
            <span className="text-gray-900 text-sm">{allRatings}%</span>
            <ProgressBar
              color={allRatings < 50 ? "#F71014" : "#0AFFA5"}
              value={allRatings}
              showValue={false}
              className="h-0-5-rem  border-noround w-full"
            />
          </div>
        </div>
        <div
          className={classNames(
            "flex justify-content-center align-items-center p-1 border-round-xl text-gray-800 text-xs",
            {
              "bg-green-200": status === "approved",
              "bg-green-100": status === "potential",
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
