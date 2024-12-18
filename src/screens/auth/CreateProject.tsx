/* eslint-disable @next/next/no-img-element */
"use client";
import { AppDispatch } from "@/core/rootStore";
import { appSelector } from "@/store";
import { createProject } from "@/store/auth";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";

import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// TODO: work on responsiveness
const CreateProject = () => {
  const [projectName, setProjectName] = useState("");
  const {
    auth: { user },
  } = useSelector(appSelector);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { payload } = (await dispatch(
      createProject({
        organization_id: user.attributes.organizationId[0],
        name: projectName,
      })
    )) as { payload: { status: string } };
    if (payload.status === "success") {
      router.push("/");
    }
  };
  return (
    <div>
      {/* TODO: REFactor positioning of this image */}
      <img
        src="/logo.png"
        alt="Profile"
        style={{
          width: "90px",
          height: "29px",
          position: "absolute",
          top: "1.5rem",
          left: "1.5rem",
        }}
      />
      <div className="flex  align-items-center h-screen max-h-screen">
        <div className="surface-0 w-6">
          <div className="flex align-items-center justify-content-between flex-column h-screen">
            <div className="flex flex-column align-items-center justify-content-center w-full md:w-4 h-full py-6 px-4">
              <div className="flex flex-column">
                <div className="">
                  <p className="text-5xl font-medium mb-4 ">
                    Create your first project
                  </p>
                </div>
                <span className="w-full mb-4">
                  <InputText
                    id="verificationCode"
                    type="text"
                    className="w-full md:w-25rem text-color-secondary surface-50 border-200"
                    placeholder="project name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </span>

                <Button
                  className="p-ripple w-full surface-50 border-50 mt-8 mb-4 text-0 flex align-items-center justify-content-center"
                  onClick={handleSubmit}
                  disabled={!projectName}
                >
                  <p className="text-gray-900 font-medium">Create</p>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className=" surface-300 flex align-items-center justify-content-center w-6">
          {/* <img
            src="/logo.webp"
            alt="Profile"
            style={{
              width: "290px",
              height: "220px",
            }}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
