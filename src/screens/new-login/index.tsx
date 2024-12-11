"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { signIn } from "source/AuthSource";
import { Checkbox } from "primereact/checkbox";
import Link from "next/link";

const NewLoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = React.useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const tokenData = await signIn(username, password);

      // Store token locally if needed (optional)
      localStorage.setItem("accessToken", tokenData.access_token);
      localStorage.setItem("refreshToken", tokenData.refresh_token);

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex  align-items-center h-screen max-h-screen">
      <div className="surface-0 w-6">
        <div className="flex align-items-center justify-content-between flex-column h-screen">
          <div className="flex flex-column align-items-center justify-content-center w-full md:w-4 h-full py-6 px-4">
            <div className="flex flex-column">
              <div className="">
                <p className="text-5xl font-medium mb-4 ">Welcome Back</p>
                <p className="m-0 font-medium text-200 mb-4">
                  Please enter your email and password
                </p>
              </div>
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
              <div className="flex align-items-center justify-content-between mb-4">
                <div className="flex align-items-center">
                  <Checkbox
                    inputId="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.checked!)}
                  />
                  <label htmlFor="rememberMe" className="ml-2 text-sm">
                    Remember me
                  </label>
                </div>
                <Link
                  href="#"
                  className="text-sm text-500 underline cursor-pointer"
                >
                  Forgot password
                </Link>
              </div>

              <Button
                label="Log In"
                className="p-ripple w-full mb-4"
                onClick={handleSubmit}
              ></Button>
              <p className="text-center text-base text-500">
                New member? Sign up{" "}
                <Link href="#" className="underline text-500">
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
  );
};

export default NewLoginScreen;
