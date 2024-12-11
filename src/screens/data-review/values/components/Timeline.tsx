import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Sidebar } from "primereact/sidebar";
import { Timeline } from "primereact/timeline";
import { Button } from "primereact/button";
import { AppDispatch } from "@/core/rootStore";
import { appSelector } from "@/store";
import {
  IHistoryItem,
  IHistoryItemComment,
  getValuesHistory,
} from "@/store/dataValues";
import { formatDateTime, formatRelativeTime } from "@/utils/date";
import { classNames } from "primereact/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solvCheck, solvChevronLeft, solvClose } from "@/assets/svg/icons";
import { InputText } from "primereact/inputtext";

const getAction = (action: string) => {
  switch (action) {
    case "approval":
      return "approved";
    case "merge":
      return "merged";
    case "failed_approval":
      return " tried to approve";
    case "disapproval":
      return "disapproved";

    default:
      return "";
  }
};

const getActionText = (item: IHistoryItem) => {
  return (
    <div>
      Process manager {getAction(item.action)}{" "}
      <span
        className={classNames({
          "font-semibold": item.action !== "merge",
        })}
      >
        {item.values?.length > 3
          ? `${item.values?.length} values`
          : item.values.join(", ")}
      </span>
      {item.action === "merge" && (
        <span className="ml-1">
          into
          <span className="font-semibold ml-1">{item.sourceValue}</span>
        </span>
      )}
    </div>
  );
};

const HistoryTimelineSidebar = () => {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const {
    dataValues: { isLoadingHistory, history },
  } = useSelector(appSelector);

  useEffect(() => {
    dispatch(getValuesHistory());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const customMarker = (item: IHistoryItem) => {
    return (
      <span
        className={classNames(`border-circle w-1rem h-1rem ${item.action}`, {
          "bg-green-200": item.action === "approval" || item.action === "merge",
          "bg-red-400":
            item.action === "disapproval" || item.action === "failed_approval",
        })}
      >
        <FontAwesomeIcon
          color="white"
          size="xs"
          icon={
            item.action === "approval" || item.action === "merge"
              ? solvCheck
              : solvClose
          }
          style={{ marginTop: "2px", marginLeft: "2px" }}
        />
      </span>
    );
  };

  const customContent = (item: IHistoryItem) => {
    return (
      <div>
        <p>{getActionText(item)}</p>
        <p>
          <small></small>
        </p>
        <div className="grid">
          <div className="col-6">
            <span className="text-sm text-gray-300">
              {formatDateTime(item.timestamp)}
            </span>
          </div>
          <div className="col-6 flex align-items-center">
            <Image
              src="/layout/images/search-paper.svg"
              alt="icon"
              width={14}
              height={14}
            />
            <span className="text-green-300 ml-2">{item.type}</span>
          </div>
        </div>
        {item.comments && (
          <div className="bg-green-100 mt-3 px-3 py-3 border-round-xl">
            {item?.comments.map(
              (comment: IHistoryItemComment, index: number) => (
                <div key={index} className="flex justify-content-between my-2">
                  <div>{comment.text}</div>
                  <div className="text-xs text-grey-300">
                    {formatRelativeTime(comment.timestamp)}
                  </div>
                </div>
              )
            )}
            <InputText
              className="p-inputtext-sm text-gray-900"
              placeholder="Add reply"
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <Button label="View History" onClick={() => setVisible(true)} />

      <Sidebar
        visible={visible}
        position="right"
        onHide={() => setVisible(false)}
        className="timeline-sidebar w-25rem"
        header={<div className="text-xl font-medium">History</div>}
      >
        <div className="history-timeline">
          <Timeline
            value={history}
            align="left"
            marker={customMarker}
            content={customContent}
          />
        </div>
      </Sidebar>
    </div>
  );
};

export default HistoryTimelineSidebar;
