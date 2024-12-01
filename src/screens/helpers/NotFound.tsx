"use client";
import { Page } from "@/types";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import React from "react";

const NotFound: Page = () => {
  const router = useRouter();

  const navigateToDashboard = async () => {
    router.push("/");
  };

  return (
    <React.Fragment>
      <div>
        <div
          className="flex align-items-center py-0 px-3 w-full z-2 px-5"
          style={{
            height: "62px",
            boxShadow: "0 10px 40px 0 rgb(41 50 65 / 6%)",
            background: "var(--surface-card)",
          }}
        >
          <a id="logolink" onClick={navigateToDashboard}>
            <img
              className=""
              src="/layout/images/menu_logo.png"
              alt="Profile"
            />
          </a>
        </div>
        <div
          className="flex flex-column justify-content-center align-items-center px-4"
          style={{ minHeight: "calc(100vh - 62px)" }}
        >
          <div className="flex flex-column justify-content-center align-items-center text-center">
            <img
              src="/layout/images/pages/asset-404.svg"
              alt="solv-layout"
              style={{
                marginBottom: "-150px",
                width: "332px",
                height: "271px",
              }}
            />
            <span
              className=""
              style={{ fontSize: "140px", lineHeight: "171px" }}
            >
              404
            </span>
            <span className="block text-300 text-center font-medium">
              Looks like this page does&apos;t exist
            </span>
            <Button
              type="button"
              label="Back to home"
              className="mt-4 font-medium p-button-lg"
              onClick={navigateToDashboard}
            ></Button>
          </div>
          <div className="flex flex-wrap align-items-center pt-8 pb-4 px-4">
            <h6 className="m-0 mt-1 text-300 font-medium">Copyright Ⓒ Solv</h6>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NotFound;
