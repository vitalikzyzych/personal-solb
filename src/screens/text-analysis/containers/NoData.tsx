"use client";
import Image from "next/image";
import { Button } from "primereact/button";
import { type FC } from "react";

const NoData: FC = () => {
  return (
    <div className="flex flex-column justify-content-center align-items-center gap-5 mb-4">
      <Image
        src="/layout/images/no-documents.webp"
        alt="icon"
        width={138}
        height={138}
      />
      <span className="text-gray-900 text-lg font-medium">
        No documents uploaded
      </span>
      <span className="text-gray-300  font-medium">
        Upload your document in the data vault and start analysing.
      </span>
      <Button
        label="+ upload document"
        aria-controls="popup_menu_left"
        className="text-gray-900"
        onClick={() => {}}
      />
    </div>
  );
};

export default NoData;
