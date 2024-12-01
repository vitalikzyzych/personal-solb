import { ToastPosition, toast } from "react-toastify";

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

const getIcon = (type: string) => {
  switch (type) {
    case TYPES.INFO:
      return "pi-info-circle";
    case TYPES.SUCCESS:
      return "pi-check-circle";
    case TYPES.WARNING:
      return "pi-exclamation-circle";
    case TYPES.ERROR:
      return "pi-exclamation-triangle";
    default:
      return "pi-info-circle";
  }
};

type ToaserOptions = {
  text?: string;
  autoClose?: number;
  type?: (typeof TYPES)[keyof typeof TYPES];
  position?: ToastPosition;
  className?: string;
};

const toaster = ({
  text = "",
  autoClose = 5000,
  type = TYPES.SUCCESS,
  position = "top-right",
  className = "",
}: ToaserOptions) => {
  return toast[type](text, {
    position: position,
    autoClose: autoClose,
    className: `${type} ${className}`,
    icon: (
      <i
        className={`pi pi-fw ${getIcon(type)} mr-2`}
        style={{ color: getColor(type) }}
      ></i>
    ),
  });
};

export default toaster;
