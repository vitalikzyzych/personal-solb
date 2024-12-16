"use client";
import Image from "next/image";
import { Button } from "primereact/button";
import { type FC } from "react";

const NotReadyContent: FC = () => {
  return (
    <div className="flex flex-column justify-content-center align-items-center gap-5 mb-4">
      <Image
        src="/layout/images/not-ready.webp"
        alt="icon"
        width={220}
        height={124}
      />
      <span className="text-gray-900 text-lg font-medium">
        Analyzing documents
      </span>
      <span className="text-gray-300 text-center font-medium">
        You can leave this page and we’ll notify when <br />
        the documents are ready for review
      </span>
      <Button
        label="Cancel"
        aria-controls="cancel"
        className="text-0 border-none"
        style={{ backgroundColor: "#232323" }}
        onClick={() => {}}
      />
    </div>
  );
};

export default NotReadyContent;
