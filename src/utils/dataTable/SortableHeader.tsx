import { classNames } from "primereact/utils";
import { type FC } from "react";

const getSortIcon = (field: string, sortField: string, order: string) => {
  if (sortField !== field) {
    return <i className="pi pi-sort" style={{ fontSize: "1rem" }}></i>;
  } else if (order === "ASC") {
    return <i className="pi pi-sort-up" style={{ fontSize: "1rem" }}></i>;
  } else {
    return <i className="pi pi-sort-down" style={{ fontSize: "1rem" }}></i>;
  }
};
interface ISortableHeader {
  title: string;
  field: string;
  sortOrder: string;
  sortField: string;
  onClick: (field: string) => void;
}
const SortableHeader: FC<ISortableHeader> = ({
  title,
  field,
  sortOrder,
  sortField,
  onClick,
}) => {
  return (
    <div
      className={classNames(
        "cursor-pointer flex align-items-center gap-2 gray-900",
        {
          highlighted: field === sortField,
        }
      )}
      onClick={() => onClick(field)}
    >
      {getSortIcon(field, sortField, sortOrder)}
      {title}
    </div>
  );
};

export default SortableHeader;
