"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { themes } from "@/constants/theme";
import { AppDispatch } from "@/core/rootStore";
import { appSelector } from "@/store";
import { getUser } from "@/store/auth";
import { getTheme, setTheme } from "@/store/settings";
import { RadioButton } from "primereact/radiobutton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type Page } from "types";
import { InputText } from "primereact/inputtext";
import {
  IOrganization,
  IOrganizationProject,
  getList,
  getProjects,
} from "@/store/organization";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solvChevronLeft } from "@/assets/svg/icons";
import { toaster } from "@/components";

const Settings: Page = () => {
  const [id, setId] = useState<string>("");

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {
    organization: { organizations, projects },
  } = useSelector(appSelector);

  useEffect(() => {
    toaster({
      text: "Success toast",
      description: "10 documents analyzed, you canreview them",
      type: "success",
      autoClose: 10000,
    });
    toaster({
      text: "Error toast",
      description: "10 documents analyzed, you canreview them",
      type: "error",
      autoClose: 10000,
    });
    toaster({
      text: "Warning toast",
      description: "10 documents analyzed, you canreview them",
      type: "warning",
      autoClose: 10000,
    });
    toaster({
      text: "Info toast",
      description: "10 documents analyzed, you canreview them",
      type: "info",
      autoClose: 10000,
    });
    dispatch(getList());
    dispatch(getProjects());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (id: string) => {
    setId(id);
  };
  return (
    <div className="flex align-items-center flex-column">
      {!id ? (
        <>
          <Image
            alt="Organization"
            src="/building.png"
            width={42}
            height={42}
          />
          <h4 className="font-medium text-2xl">Select organization</h4>
          <span className="p-input-icon-left mb-4">
            <i className="pi pi-search"></i>
            <InputText
              id="search"
              name="search"
              placeholder="Search"
              className="p-inputtext-md text-gray-900 bg-gray-100"
            />
          </span>
          <div className="grid" style={{ maxWidth: "60rem" }}>
            {organizations.map((organization: IOrganization) => (
              <div
                key={organization.id}
                onClick={() => handleClick(organization.name)}
                className="col-12 md:col-6  cursor-pointer p-3"
              >
                <div className="grid py-3 -mb-2 card py-4">
                  <div className="col-5 px-3 flex align-items-center border-right-1 border-gray-100">
                    <img
                      alt="Organization"
                      src="/wwo-logo.jpeg"
                      className="w-full"
                    />
                  </div>
                  <div className="col-7 pl-3 flex flex-column align-items-start justify-content-center">
                    <div className="text-lg font-medium mb-1">
                      {organization.name}
                    </div>
                    <div className="text-gray-300 mt-1">
                      {organization.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <Image
            alt="Organization"
            src="/building.png"
            width={42}
            height={42}
          />
          <h4 className="font-medium text-2xl">Select project</h4>
          <span className="p-input-icon-left mb-4">
            <i className="pi pi-search"></i>
            <InputText
              id="search"
              name="search"
              placeholder="Search"
              className="p-inputtext-md text-gray-900 bg-gray-100"
            />
          </span>
          <div className="flex relative w-full justify-content-center mb-4">
            <span
              className="cursor-pointer absolute left-0"
              onClick={() => setId("")}
            >
              <FontAwesomeIcon
                className="font-medium"
                icon={solvChevronLeft}
                size="xl"
              />
            </span>
            <div className="font-medium text-lg">{id}</div>
          </div>
          <div className="grid" style={{ maxWidth: "60rem" }}>
            {projects.map((project: IOrganizationProject) => (
              <div
                key={project.id}
                // onClick={() => handleClick(project.id)}
                className="col-12 md:col-6  cursor-pointer p-3"
              >
                <div className="grid py-3 -mb-2 card py-4">
                  <div className="col-5 px-3 flex align-items-center border-right-1 border-gray-100">
                    <img
                      alt="Organization"
                      src="/wwo-logo.jpeg"
                      className="w-full"
                    />
                  </div>
                  <div className="col-7 pl-3 flex flex-column align-items-start justify-content-center">
                    <div className="text-lg font-medium mb-1">
                      {project.name}
                    </div>
                    <div className="text-gray-300 mt-1">{project.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Settings;
