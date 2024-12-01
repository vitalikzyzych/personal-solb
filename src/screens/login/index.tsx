"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { signIn } from "source/AuthSource"; // Adjust the import path

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const tokenData = await signIn(username, password);
      console.log("Token Data:", tokenData);

      // Store token locally if needed (optional)
      localStorage.setItem("accessToken", tokenData.access_token);
      localStorage.setItem("refreshToken", tokenData.refresh_token);

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="surface-0">
        <div className="flex align-items-center justify-content-between flex-column h-screen">
          <div className="flex flex-column align-items-center justify-content-center w-full md:w-4 h-full text-center py-6 px-4">
            <img
              className="mb-3"
              src="/logo.webp"
              alt="Profile"
              style={{
                width: "290px",
                height: "220px",
              }}
            />
            <div className="flex flex-column">
              <span className="p-input-icon-left w-full mb-4">
                <i className="pi pi-user"></i>
                <InputText
                  id="username"
                  type="text"
                  className="w-full md:w-25rem text-color-secondary surface-50 border-200"
                  placeholder="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </span>
              <span className="p-input-icon-left w-full mb-4">
                <i className="pi pi-lock"></i>
                <InputText
                  id="password"
                  type="password"
                  className="w-full md:w-25rem text-color-secondary surface-50 border-200"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </span>

              <Button
                label="Sign In"
                className="p-ripple w-full mb-4"
                onClick={handleSubmit}
              ></Button>
            </div>
          </div>
          <div className="flex flex-wrap align-items-center pb-8 px-4">
            <h6
              className="m-0 font-medium text-300"
              style={{ lineHeight: "17px" }}
            >
              Copyright Ⓒ Solv
            </h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
