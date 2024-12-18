import { AppDispatch } from "@/core/rootStore";
import { appSelector } from "@/store";
import { ContentKeys, setActiveMenu } from "@/store/textanalysis";
import { Accordion, AccordionTab } from "primereact/accordion";
import { classNames } from "primereact/utils";
import { type FC } from "react";
import { useDispatch, useSelector } from "react-redux";

const ResultMenu: FC = () => {
  const {
    textanalysis: { activeMenu },
  } = useSelector(appSelector);
  const dispatch = useDispatch<AppDispatch>();
  // Handler to update active content and highlight
  const handleOptionClick = (contentKey: ContentKeys) => {
    dispatch(setActiveMenu(contentKey));
  };
  return (
    <div className="flex flex-column">
      <h5 className="underline text-base text-gray-900">Data type</h5>
      <Accordion multiple activeIndex={[0, 1]}>
        <AccordionTab
          header="Stakeholders"
          contentClassName="accordion-content-menu"
          headerClassName="accordion-header-menu"
        >
          <div
            className={classNames(
              "p-3 border-round-xl text-gray-900 cursor-pointer",
              {
                "bg-green-100": activeMenu === ContentKeys.STAKEHOLDERS_NEW,
              }
            )}
            onClick={() => handleOptionClick(ContentKeys.STAKEHOLDERS_NEW)}
          >
            New
          </div>
          <div
            className={classNames(
              "p-3 border-round-xl text-gray-900 cursor-pointer",
              {
                "bg-green-100":
                  activeMenu === ContentKeys.STAKEHOLDERS_EXISTING,
              }
            )}
            onClick={() => handleOptionClick(ContentKeys.STAKEHOLDERS_EXISTING)}
          >
            Existing
          </div>
        </AccordionTab>
        <AccordionTab
          header="Values"
          contentClassName="accordion-content-menu"
          headerClassName="accordion-header-menu"
        >
          <div
            className={classNames(
              "p-3 border-round-xl text-gray-900 cursor-pointer",
              {
                "bg-green-100": activeMenu === ContentKeys.VALUES_NEW,
              }
            )}
            onClick={() => handleOptionClick(ContentKeys.VALUES_NEW)}
          >
            New
          </div>
          <div
            className={classNames(
              "p-3 border-round-xl text-gray-900 cursor-pointer",
              {
                "bg-green-100": activeMenu === ContentKeys.VALUES_EXISTING,
              }
            )}
            onClick={() => handleOptionClick(ContentKeys.VALUES_EXISTING)}
          >
            Existing
          </div>
        </AccordionTab>
      </Accordion>
    </div>
  );
};

export default ResultMenu;
