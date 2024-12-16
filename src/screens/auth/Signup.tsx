"use client";
import { signIn } from "@/source/AuthSource";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";

// TODO: work on responsiveness
const Signup = () => {
  const [username, setUsername] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [agreeTerms, setAgreeTerms] = React.useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      //   const tokenData = await signIn(username, companyName, lastname);
      //   console.log("Token Data:", tokenData);

      // Store token locally if needed (optional)
      //   localStorage.setItem("accessToken", tokenData.access_token);
      //   localStorage.setItem("refreshToken", tokenData.refresh_token);
      console.log("name", username);
      console.log("lastname", lastname);
      console.log("companyName", companyName);
      console.log("email", email);
      router.push("/account-verification");
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
                    Create an account
                  </p>
                </div>
                <span className="p-input-icon-left w-full mb-4">
                  <InputText
                    id="name"
                    type="text"
                    className="w-full md:w-25rem text-color-secondary surface-50 border-200"
                    placeholder="name"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </span>
                <span className="p-input-icon-left w-full mb-4">
                  <InputText
                    id="lastname"
                    type="text"
                    className="w-full md:w-25rem text-color-secondary surface-50 border-200"
                    placeholder="lastname"
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </span>
                <span className="p-input-icon-left w-full mb-4">
                  <InputText
                    id="email"
                    type="email"
                    className="w-full md:w-25rem text-color-secondary surface-50 border-200"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </span>
                <span className="p-input-icon-left w-full mb-4">
                  <i className="pi pi-lock"></i>
                  <InputText
                    id="companyName"
                    type="text"
                    className="w-full md:w-25rem text-color-secondary surface-50 border-200"
                    placeholder="company name"
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </span>
                <div className="flex align-items-center justify-content-between mb-4">
                  <div className="flex align-items-center">
                    <Checkbox
                      inputId="agreeTerms"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.checked!)}
                    />
                    <label
                      htmlFor="agreeTerms"
                      className="ml-2 text-sm text-500"
                    >
                      I agree the terms and conditions
                    </label>
                  </div>
                </div>

                <Button
                  className="p-ripple w-full mb-4 text-0 flex align-items-center justify-content-center"
                  onClick={handleSubmit}
                >
                  <p className="text-gray-900 font-medium">Next</p>
                </Button>
                <p className="text-center text-base text-500">
                  Already a member? log in{" "}
                  <Link href="/login" className="underline text-500">
                    here
                  </Link>
                </p>
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

export default Signup;
