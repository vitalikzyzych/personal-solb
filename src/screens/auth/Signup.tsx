/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import useForm from "@/hooks/useForm";
import { ISignUp, ISignUpResponse, createUser } from "@/store/auth";
import * as Yup from "yup";
import { EMAIL_REGEX } from "@/constants/general";
import { classNames } from "primereact/utils";
import { AppDispatch } from "@/core/rootStore";
import { useDispatch } from "react-redux";

export const getFormErrorMessage = (message: string) => {
  return message ? (
    <div>
      <small className="p-error">{message}</small>
    </div>
  ) : (
    ""
  );
};

// TODO: work on responsiveness
const Signup = () => {
  const [agreeTerms, setAgreeTerms] = React.useState(false);

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: ISignUp) => {
    const { payload } = (await dispatch(
      createUser({ ...data, username: data.email.split("@")[0] })
    )) as { payload: ISignUpResponse };
    if (payload.registered) {
      router.push("/account-verification");
    }
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .required("Email is required")
      .matches(EMAIL_REGEX, "Please enter a valid email address"),
    organizationName: Yup.string().required("Organization Name is required"),
  });

  const { formik } = useForm<ISignUp>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      organizationName: "",
      username: "",
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
                  <p className="text-5xl font-medium mb-4 ">
                    Create an account
                  </p>
                </div>
                <span className=" w-full mb-4">
                  <InputText
                    id="firstName"
                    name="firstName"
                    type="text"
                    className={classNames(
                      "w-full md:w-25rem text-color-secondary surface-50 border-200",
                      {
                        "p-invalid":
                          formik.touched?.firstName && formik.errors?.firstName,
                      }
                    )}
                    onBlur={() => formik.setFieldTouched("firstName", true)}
                    placeholder="First Name"
                    onChange={(e) => {
                      formik.setFieldValue("firstName", e.target.value);
                    }}
                  />
                  {formik.touched?.firstName &&
                    formik.errors?.firstName &&
                    getFormErrorMessage(formik.errors?.firstName)}
                </span>
                <span className=" w-full mb-4">
                  <InputText
                    id="lastName"
                    name="lastName"
                    type="text"
                    className={classNames(
                      "w-full md:w-25rem text-color-secondary surface-50 border-200",
                      {
                        "p-invalid":
                          formik.touched?.lastName && formik.errors?.lastName,
                      }
                    )}
                    value={formik.values.lastName}
                    placeholder="Last Name"
                    onBlur={() => formik.setFieldTouched("lastName", true)}
                    onChange={(e) => {
                      formik.setFieldValue("lastName", e.target.value);
                    }}
                  />
                  {formik.touched?.lastName &&
                    formik.errors?.lastName &&
                    getFormErrorMessage(formik.errors?.lastName)}
                </span>
                <span className=" w-full mb-4">
                  <InputText
                    id="email"
                    name="email"
                    type="text"
                    className={classNames(
                      "w-full md:w-25rem text-color-secondary surface-50 border-200",
                      {
                        "p-invalid":
                          formik.touched?.email && formik.errors?.email,
                      }
                    )}
                    value={formik.values.email}
                    placeholder="Email"
                    onBlur={() => formik.setFieldTouched("email", true)}
                    onChange={(e) => {
                      formik.setFieldValue("email", e.target.value);
                    }}
                  />
                  {formik.touched?.email &&
                    formik.errors?.email &&
                    getFormErrorMessage(formik.errors?.email)}
                </span>
                <span className=" w-full mb-4">
                  <InputText
                    id="organizationName"
                    name="organizationName"
                    type="text"
                    className={classNames(
                      "w-full md:w-25rem text-color-secondary surface-50 border-200",
                      {
                        "p-invalid":
                          formik.touched?.organizationName &&
                          formik.errors?.organizationName,
                      }
                    )}
                    value={formik.values.organizationName}
                    placeholder="Organization Name"
                    onBlur={() =>
                      formik.setFieldTouched("organizationName", true)
                    }
                    onChange={(e) => {
                      formik.setFieldValue("organizationName", e.target.value);
                    }}
                  />
                  {formik.touched?.organizationName &&
                    formik.errors?.organizationName &&
                    getFormErrorMessage(formik.errors?.organizationName)}
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
                      className="ml-2 text-sm text-gray-200"
                    >
                      I agree the terms and conditions
                    </label>
                  </div>
                </div>

                <Button
                  className="p-ripple w-full mb-4 text-0 flex align-items-center justify-content-center"
                  type="submit"
                  disabled={!formik.dirty || !formik.isValid}
                >
                  <p className="text-gray-900 font-medium">Next</p>
                </Button>
                <p className="text-center text-base text-600">
                  Already a member? log in{" "}
                  <Link href="/login" className="underline text-gray-200">
                    here
                  </Link>
                </p>
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

export default Signup;
