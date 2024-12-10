import {
  PaginatorNextPageLinkOptions,
  PaginatorPrevPageLinkOptions,
} from "primereact/paginator";
import { classNames } from "primereact/utils";

export const paginatorTemplate = {
  layout:
    "RowsPerPageDropdown PrevPageLink PageLinks NextPageLink CurrentPageReport",
  PrevPageLink: (options: PaginatorPrevPageLinkOptions) => {
    return (
      <button
        type="button"
        className={classNames(options.className, "border-round-sm h-2rem px-3")}
        onClick={options.onClick}
        disabled={options.disabled}
      >
        Previous
      </button>
    );
  },
  NextPageLink: (options: PaginatorNextPageLinkOptions) => {
    return (
      <button
        type="button"
        className={classNames(options.className, "border-round-sm h-2rem px-3")}
        onClick={options.onClick}
        disabled={options.disabled}
      >
        Next
      </button>
    );
  },
};
