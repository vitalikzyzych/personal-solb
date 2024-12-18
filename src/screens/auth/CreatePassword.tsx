/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { signIn } from "@/source/AuthSource";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import * as Yup from "yup";
import { classNames } from "primereact/utils";
import useForm from "@/hooks/useForm";
import { IResetPassword, changePassword, checkUser } from "@/store/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/core/rootStore";
import { appSelector } from "@/store";

export const getFormErrorMessage = (message: string) => {
  return message ? (
    <div>
      <small className="p-error">{message}</small>
    </div>
  ) : (
    ""
  );
};

const CreatePassword = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {
    auth: { tempUserData },
  } = useSelector(appSelector);

  const onSubmit = async (data: IResetPassword) => {
    const { payload } = (await dispatch(
      changePassword({
        newPassword: data.password,
        userId: tempUserData.userId as string,
      })
    )) as { payload: { reset: boolean } };
    if (payload.reset) {
      const tokenData = await signIn(
        tempUserData.username as string,
        data.password
      );
      if (tokenData?.access_token) {
        await dispatch(checkUser());
        router.push("/create-project");
      }
    }
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&.,]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const { formik } = useForm<IResetPassword>({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

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
              <form className="flex flex-column" onSubmit={formik.handleSubmit}>
                <div className="">
                  <p className="text-5xl font-medium mb-4 ">Create password</p>
                </div>
                <span className="w-full mb-4">
                  <InputText
                    id="password"
                    name="password"
                    type="password"
                    value={formik.values.password}
                    onChange={(e) => {
                      formik.setFieldValue("password", e.target.value);
                    }}
                    placeholder="password"
                    onBlur={() => formik.setFieldTouched("password", true)}
                    className={classNames(
                      "w-full md:w-25rem text-color-secondary surface-50 border-200",
                      {
                        "p-invalid":
                          formik.touched?.password && formik.errors?.password,
                      }
                    )}
                  />
                  {formik.touched?.password &&
                    formik.errors?.password &&
                    getFormErrorMessage(formik.errors?.password)}
                </span>
                <span className="w-full mb-4">
                  <InputText
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formik.values.confirmPassword}
                    onChange={(e) => {
                      formik.setFieldValue("confirmPassword", e.target.value);
                    }}
                    placeholder="repeat password"
                    onBlur={() =>
                      formik.setFieldTouched("confirmPassword", true)
                    }
                    className={classNames(
                      "w-full md:w-25rem text-color-secondary surface-50 border-200",
                      {
                        "p-invalid":
                          formik.touched?.confirmPassword &&
                          formik.errors?.confirmPassword,
                      }
                    )}
                  />
                  {formik.touched?.confirmPassword &&
                    formik.errors?.confirmPassword &&
                    getFormErrorMessage(formik.errors?.confirmPassword)}
                </span>

                <Button
                  className="p-ripple w-full mb-4 text-0 flex align-items-center justify-content-center"
                  type="submit"
                  disabled={!formik.dirty || !formik.isValid}
                >
                  <p className="text-gray-900 font-medium">Next</p>
                </Button>
              </form>
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

export default CreatePassword;
