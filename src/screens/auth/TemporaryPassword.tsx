import { Divider } from "primereact/divider";
import React from "react";

const TemporaryPassword = () => {
  return (
    <div className="flex align-items-center suface-50 h-screen justify-content-center p-4">
      <div
        className="bg-white flex flex-column justify-content-between align-items-center mt-7 p-4"
        style={{
          height: "724px !important",
          width: "602px !important",
        }}
      >
        <img
          src="/logo.png"
          alt="Profile"
          style={{
            width: "67px",
            height: "21px",
          }}
        />
        <div className="surface-50 w-full mt-3 flex align-items-center justify-content-center">
          <img
            src="/visual.png"
            alt="Profile"
            style={{
              width: "218px",
              height: "214px",
            }}
          />
        </div>
        <h3 className="font-semibold w-7 text-center text-sm uppercase">
          You are one step away
        </h3>
        <h2 className="font-semibold w-8 text-center text-4xl">
          This is your temparary solv password
        </h2>
        <p className="text-500">DKZ72W1!</p>
        <p className="text-500 w-8 text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor
        </p>
        <Divider />
        <p className="text-500">
          Need help? Please reach out to info@solv.world if you have any
          questions{" "}
        </p>
      </div>
    </div>
  );
};

export default TemporaryPassword;
