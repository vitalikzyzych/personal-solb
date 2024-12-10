"use client";

import React, { type FC, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Checkbox, type CheckboxChangeEvent } from "primereact/checkbox";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Chip, type ChipRemoveEvent } from "primereact/chip"; // Import the Chip component

interface IFilterBar {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
}

const FilterBar: FC<IFilterBar> = ({ onVisibleChange, visible }) => {
  const [checkboxValues, setCheckboxValues] = useState<{
    include: string[];
    cluster: string[];
    profileType: string[];
  }>({
    include: [],
    cluster: [],
    profileType: [],
  });

  const handleCheckboxChange = (
    e: CheckboxChangeEvent,
    category: "include" | "cluster" | "profileType"
  ) => {
    const { checked, value } = e;

    // Update `checkboxValues` state
    setCheckboxValues((prevState) => {
      const updatedCategory = checked
        ? [...prevState[category], value] // Add the selected value
        : prevState[category].filter((item) => item !== value); // Remove the deselected value

      return { ...prevState, [category]: updatedCategory };
    });
  };

  const clearAllFilters = () => {
    setCheckboxValues({ include: [], cluster: [], profileType: [] });
  };

  const saveFilters = () => {
    // const allSelected = Object.values(checkboxValues).flat();
    // setSelectedFilters(allSelected);
    onVisibleChange(false);
  };

  const removeFilter = (event: ChipRemoveEvent) => {
    const filter = event.value; // Get the filter value from the chip's event
    if (!filter) return;

    // Update `checkboxValues` to uncheck the corresponding checkbox
    setCheckboxValues((prevState) => {
      const updatedCheckboxValues = Object.entries(prevState).reduce(
        (acc, [category, values]) => {
          acc[category as keyof typeof checkboxValues] = values.filter(
            (item) => item !== filter
          ); // Remove the filter from the category
          return acc;
        },
        {} as typeof checkboxValues
      );
      return updatedCheckboxValues; // Return a new state object
    });
  };

  const derivedChips = React.useMemo(
    () => Object.values(checkboxValues).flat(),
    [checkboxValues]
  );

  const header = (
    <div className="flex align-items-center">
      <h2 className="text-lg font-medium m-0">Filter by</h2>
    </div>
  );

  return (
    <div>
      <Sidebar
        visible={visible}
        onHide={() => {
          onVisibleChange(false);
        }}
        className="filter-bar"
        position="right"
        appendTo="self"
        header={header}
      >
        <div style={{ padding: "0 1.25rem" }}>
          <div
            className="flex flex-column gap-3 border-y-1 border-gray-500"
            style={{ padding: "1.25rem 0" }}
          >
            <div className="flex align-items-center justify-content-between">
              <h4 className="m-0 text-base font-medium">Selected</h4>
              <Button
                label="Clear all"
                link
                onClick={clearAllFilters}
                className="text-sm text-gray-900 opacity-60 font-normal"
                style={{ boxShadow: "none" }}
              />
            </div>

            <div className="flex gap-2 align-itms-center flex-wrap">
              {derivedChips?.length ? (
                derivedChips.map((filter) => {
                  return (
                    <Chip
                      key={filter}
                      label={filter}
                      removable
                      onRemove={(e) => removeFilter(e)}
                      className="border-round-lg text-gray-900"
                    />
                  );
                })
              ) : (
                <span className="text-gray-400">No filters selected</span>
              )}
            </div>
          </div>

          {/* Accordion for filter options */}
          <Accordion multiple activeIndex={[0, 1, 2]}>
            {/* Include Section */}
            <AccordionTab
              header="Include"
              contentClassName="accordion-content-filter"
              headerClassName="accordion-header-filter"
            >
              <div className="flex flex-column gap-3">
                <div className="flex align-items-center gap-2">
                  <Checkbox
                    inputId="engagements"
                    value="Engagements"
                    onChange={(e) => handleCheckboxChange(e, "include")}
                    checked={checkboxValues.include.includes("Engagements")}
                  />
                  <label htmlFor="engagements" className="ml-2">
                    Engagements
                  </label>
                </div>
                <div className="flex align-items-center gap-2">
                  <Checkbox
                    inputId="online-polls"
                    value="Online polls"
                    onChange={(e) => handleCheckboxChange(e, "include")}
                    checked={checkboxValues.include.includes("Online polls")}
                  />
                  <label htmlFor="online-polls" className="ml-2">
                    Online polls
                  </label>
                </div>
              </div>
            </AccordionTab>

            {/* Cluster Section */}
            <AccordionTab
              header="Cluster"
              contentClassName="accordion-content-filter"
              headerClassName="accordion-header-filter"
            >
              <div className="flex flex-column gap-3">
                <div className="flex align-items-center gap-2">
                  <Checkbox
                    inputId="blue"
                    value="Blue"
                    onChange={(e) => handleCheckboxChange(e, "cluster")}
                    checked={checkboxValues.cluster.includes("Blue")}
                  />
                  <label htmlFor="blue" className="ml-2">
                    Blue
                  </label>
                </div>
                <div className="flex align-items-center gap-2">
                  <Checkbox
                    inputId="purple"
                    value="Purple"
                    onChange={(e) => handleCheckboxChange(e, "cluster")}
                    checked={checkboxValues.cluster.includes("Purple")}
                  />
                  <label htmlFor="purple" className="ml-2">
                    Purple
                  </label>
                </div>
                <div className="flex align-items-center gap-2">
                  <Checkbox
                    inputId="pink"
                    value="Pink"
                    onChange={(e) => handleCheckboxChange(e, "cluster")}
                    checked={checkboxValues.cluster.includes("Pink")}
                  />
                  <label htmlFor="pink" className="ml-2">
                    Pink
                  </label>
                </div>
              </div>
            </AccordionTab>

            {/* Profile Type Section */}
            <AccordionTab
              header="Profile type"
              contentClassName="accordion-content-filter"
              headerClassName="accordion-header-filter"
            >
              <div className="flex flex-column gap-3">
                <div className="flex align-items-center gap-2">
                  <Checkbox
                    inputId="project-initiator"
                    value="Project Initiator"
                    onChange={(e) => handleCheckboxChange(e, "profileType")}
                    checked={checkboxValues.profileType.includes(
                      "Project Initiator"
                    )}
                  />
                  <label htmlFor="project-initiator" className="ml-2">
                    Project Initiator
                  </label>
                </div>
                <div className="flex align-items-center gap-2">
                  <Checkbox
                    inputId="elected-official"
                    value="Elected Official"
                    onChange={(e) => handleCheckboxChange(e, "profileType")}
                    checked={checkboxValues.profileType.includes(
                      "Elected Official"
                    )}
                  />
                  <label htmlFor="elected-official" className="ml-2">
                    Elected Official
                  </label>
                </div>
                <div className="flex align-items-center gap-2">
                  <Checkbox
                    inputId="business-interest"
                    value="Business Interest"
                    onChange={(e) => handleCheckboxChange(e, "profileType")}
                    checked={checkboxValues.profileType.includes(
                      "Business Interest"
                    )}
                  />
                  <label htmlFor="business-interest" className="ml-2">
                    Business Interest
                  </label>
                </div>
              </div>
            </AccordionTab>
          </Accordion>
        </div>

        {/* Footer */}
        <div className="bg-green-500 mt-5" style={{ padding: "1.25rem" }}>
          <div className="flex justify-content-between align-items-center gap-3">
            <div className="flex flex-column">
              <p className="m-0 font-semibold">Current selection</p>
              <p className="m-0">
                {derivedChips.length} values, 10 stakeholders
              </p>
            </div>
            <Button
              label="Save"
              className="flex-shrink-0 bg-blue-400"
              onClick={saveFilters}
            />
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default FilterBar;
