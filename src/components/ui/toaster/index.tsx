import {
  solvCheck,
  solvChevronLeft,
  solvClose,
  solvInfo,
} from "@/assets/svg/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { classNames } from "primereact/utils";
import { ToastPosition, toast } from "react-toastify";

import "./style.scss";

const TYPES = {
  INFO: "info",
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error",
} as const;

const getColor = (type: string) => {
  switch (type) {
    case TYPES.INFO:
      return "#666";
    case TYPES.SUCCESS:
      return "#26c281";
    case TYPES.WARNING:
      return "#FFA726";
    case TYPES.ERROR:
      return "#f22613";
    default:
      return "#FFF";
  }
};

const getCloseButton = ({
  closeToast,
}: {
  closeToast: (e: React.MouseEvent<HTMLElement>) => void;
}) => (
  <span
    className="border-circle w-2rem h-2rem absolute cursor-pointer -mt-2 absolute right-0 mr-2"
    style={{ background: "#f7f7f7" }}
    onClick={closeToast}
  >
    <FontAwesomeIcon
      color="#706E6E"
      size="1x"
      icon={solvClose}
      className="mt-2 ml-2"
    />
  </span>
);
const getIcon = (type: string) => {
  switch (type) {
    case TYPES.SUCCESS:
      return (
        <span
          className="border-circle w-2rem h-2rem"
          style={{ background: "#25AE88" }}
        >
          <FontAwesomeIcon
            color="white"
            // size="2x"
            style={{ fontSize: "18px", marginTop: "7px", marginLeft: "7px" }}
            icon={solvCheck}
          />
        </span>
      );
    case TYPES.ERROR:
      return (
        <span
          className="border-circle w-2rem h-2rem"
          style={{ background: "#d75a4a" }}
        >
          <FontAwesomeIcon
            color="white"
            size="1x"
            icon={solvClose}
            style={{ fontSize: "18px", marginTop: "7px", marginLeft: "7px" }}
          />
        </span>
      );
    case TYPES.INFO:
      return (
        <span className="border-circle w-2rem h-2rem bg-gray-100">
          <FontAwesomeIcon
            color="black"
            size="1x"
            style={{ fontSize: "18px", marginTop: "7px", marginLeft: "7px" }}
            icon={solvInfo}
          />
        </span>
      );
    case TYPES.WARNING:
      return (
        <img
          className=""
          src="/layout/images/toaster_warning.png"
          alt="Warning"
          style={{
            width: "32px",
            height: "32px",
          }}
        />
      );
    default:
      return (
        <span className="border-circle w-2rem h-2rem bg-grey-400">
          <FontAwesomeIcon
            color="black"
            size="1x"
            icon={solvInfo}
            className="mt-1 ml-1"
          />
        </span>
      );
  }
};

type ToaserOptions = {
  text?: string;
  description?: string;

  autoClose?: number;
  type?: (typeof TYPES)[keyof typeof TYPES];
  position?: ToastPosition;
  className?: string;
};

const toaster = ({
  text = "",
  description = "",
  autoClose = 5000,
  type = TYPES.SUCCESS,
  position = "top-right",
  className = "",
}: ToaserOptions) => {
  return toast[type](
    <div className="flex flex-column pl-2 py-1">
      <div className="text-xl">{text}</div>
      <div className="text-gray-800 mt-1">{description}</div>
    </div>,
    {
      position: position,
      autoClose: autoClose,
      className: `${type} ${className}`,
      icon: getIcon(type),
      closeButton: getCloseButton,
    }
  );
};

export default toaster;
