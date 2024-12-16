"use client";
import { signIn } from "@/source/AuthSource";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";

import { InputText } from "primereact/inputtext";
import React, { useState } from "react";

// TODO: work on responsiveness
const OtpVerification = () => {
  const [verificationCode, setVerificationCode] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      //   const tokenData = await signIn(username, companyName, lastname);
      //   console.log("Token Data:", tokenData);

      // Store token locally if needed (optional)
      //   localStorage.setItem("accessToken", tokenData.access_token);
      //   localStorage.setItem("refreshToken", tokenData.refresh_token);
      console.log("name", verificationCode);
      router.push("/create-password");
    } catch (error) {
      console.log(error);
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
                    We have sent you a temporary password
                  </p>
                </div>
                <span className="p-input-icon-left w-full mb-4">
                  <InputText
                    id="verificationCode"
                    type="text"
                    className="w-full md:w-25rem text-color-secondary surface-50 border-200"
                    placeholder="verificationCode"
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                </span>
                <p className="text-sm text-500">
                  Received no email? Click{" "}
                  <Link href="/login" className="underline text-500">
                    here
                  </Link>{" "}
                  to resend email.
                </p>

                <Button
                  className="p-ripple w-full surface-50 border-50 mt-8 mb-4 text-0 flex align-items-center justify-content-center"
                  onClick={handleSubmit}
                >
                  <p className="text-gray-900 font-medium">Next</p>
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

export default OtpVerification;
