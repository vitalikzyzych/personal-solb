"use client";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import useForm from "@/hooks/useForm";
import { AppDispatch } from "@/core/rootStore";
import { appSelector } from "@/store";
import {
  IStakeholderIdentity,
  getStakeholderIdentity,
} from "@/store/stakeholder";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { EMAIL_REGEX } from "@/constants/general";
import { classNames } from "primereact/utils";
import { Dropdown } from "primereact/dropdown";
import { CardComponent } from "@/components";

export const getFormErrorMessage = (message: string) => {
  return message ? (
    <div>
      <small className="p-error">{message}</small>
    </div>
  ) : (
    ""
  );
};

interface IProps {
  id: string;
}

const Identity: FC<IProps> = ({ id }) => {
  const [isEditMode, setEditMode] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const {
    stakeholder: { isGettingIdentity, stakeholderIdentity },
  } = useSelector(appSelector);

  useEffect(() => {
    dispatch(getStakeholderIdentity({ id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: IStakeholderIdentity) => {
    if (formik.isValid) {
      console.log(data);
    }
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .required("Email is required")
      .matches(EMAIL_REGEX, "Please enter a valid email address"),
    phone: Yup.string()
      .required("Phone is required")
      .min(14, "The phone number is not valid"),
    profileType: Yup.string().required("Profile Type is required"),
    affiliation: Yup.string().required("Affiliation is required"),
    stakeholderType: Yup.string().required("Stakeholder Type is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    street: Yup.string().required("Street is required"),
    zip: Yup.string().required("Zip is required"),
    hairColor: Yup.string().required("Hair Color is required"),
    politicalParty: Yup.string().required("Political Party is required"),
  });

  const { formik } = useForm<IStakeholderIdentity>({
    initialValues: id && stakeholderIdentity ? stakeholderIdentity : {},
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  return (
    <>
      {isGettingIdentity ? (
        "Loading"
      ) : (
        <CardComponent
          className="mt-3"
          content={
            <div className="grid">
              <div className="col-12 flex justify-content-end">
                <Button
                  className="shadow-0"
                  label={isEditMode ? "Cancel" : "Edit"}
                  severity="secondary"
                  text
                  raised
                  onClick={() => {
                    formik.setSubmitting(false);
                    formik.resetForm();
                    setEditMode(!isEditMode);
                  }}
                />
              </div>
              {isEditMode ? (
                <div className="col-12">
                  <form className="grid" onSubmit={formik.handleSubmit}>
                    <div className="col-12 lg:col-6 border-right-0 lg:border-right-1 border-gray-100 px-2 md:px-3 lg:px-4">
                      <h5 className="text-lg mb-5 font-medium">
                        Personal information
                      </h5>
                      <div className="grid mb-5">
                        <div className="col-12 md:col-6">
                          <div className="text-gray-500 mb-1">First Name</div>
                          <InputText
                            id="firstName"
                            name="firstName"
                            value={formik.values.firstName}
                            onChange={(e) => {
                              formik.setFieldValue("firstName", e.target.value);
                            }}
                            onBlur={() =>
                              formik.setFieldTouched("firstName", true)
                            }
                            className={classNames(
                              " p-d-block w-full text-gray-900",
                              {
                                "p-invalid":
                                  formik.touched?.firstName &&
                                  formik.errors?.firstName,
                              }
                            )}
                          />
                          {formik.touched?.firstName &&
                            formik.errors?.firstName &&
                            getFormErrorMessage(formik.errors?.firstName)}
                        </div>
                        <div className="col-12 md:col-6">
                          <div className="text-gray-500 mb-1">Last Name</div>
                          <InputText
                            id="lastName"
                            name="lastName"
                            value={formik.values.lastName}
                            onChange={(e) => {
                              formik.setFieldValue("lastName", e.target.value);
                            }}
                            onBlur={() =>
                              formik.setFieldTouched("lastName", true)
                            }
                            className={classNames(
                              "p-d-block w-full text-gray-900",
                              {
                                "p-invalid":
                                  formik.touched?.lastName &&
                                  formik.errors?.lastName,
                              }
                            )}
                          />
                          {formik.touched?.lastName &&
                            formik.errors?.lastName &&
                            getFormErrorMessage(formik.errors?.lastName)}
                        </div>
                      </div>
                      <div className="grid">
                        <div className="col-12 md:col-6">
                          <div className="text-gray-500 mb-1">
                            Email address
                          </div>
                          <InputText
                            id="email"
                            name="email"
                            value={formik.values.email}
                            onChange={(e) => {
                              formik.setFieldValue("email", e.target.value);
                            }}
                            onBlur={() => formik.setFieldTouched("email", true)}
                            className={classNames(
                              " p-d-block w-full text-gray-900",
                              {
                                "p-invalid":
                                  formik.touched?.email && formik.errors?.email,
                              }
                            )}
                          />
                          {formik.touched?.email &&
                            formik.errors?.email &&
                            getFormErrorMessage(formik.errors?.email)}
                        </div>
                        <div className="col-12 md:col-6">
                          <div className="text-gray-500 mb-1">Phone</div>
                          <InputText
                            id="phone"
                            name="phone"
                            value={formik.values.phone}
                            onChange={(e) => {
                              formik.setFieldValue("phone", e.target.value);
                            }}
                            onBlur={() => formik.setFieldTouched("phone", true)}
                            className={classNames(
                              "p-d-block w-full text-gray-900",
                              {
                                "p-invalid":
                                  formik.touched?.phone && formik.errors?.phone,
                              }
                            )}
                          />
                          {formik.touched?.phone &&
                            formik.errors?.phone &&
                            getFormErrorMessage(formik.errors?.phone)}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 lg:col-6 px-2 md:px-3 lg:px-4">
                      <h5 className="text-lg mb-5 font-medium">
                        Professional information
                      </h5>
                      <div className="grid mb-5">
                        <div className="col-12 md:col-6">
                          <div className="text-gray-500 mb-1">Profile Type</div>
                          <InputText
                            id="profileType"
                            name="profileType"
                            value={formik.values.profileType}
                            onChange={(e) => {
                              formik.setFieldValue(
                                "profileType",
                                e.target.value
                              );
                            }}
                            onBlur={() =>
                              formik.setFieldTouched("profileType", true)
                            }
                            className={classNames(
                              " p-d-block w-full text-gray-900",
                              {
                                "p-invalid":
                                  formik.touched?.profileType &&
                                  formik.errors?.profileType,
                              }
                            )}
                          />
                          {formik.touched?.profileType &&
                            formik.errors?.profileType &&
                            getFormErrorMessage(formik.errors?.profileType)}
                        </div>
                        <div className="col-12 md:col-6">
                          <div className="text-gray-500 mb-1">Affiliation</div>
                          <InputText
                            id="affiliation"
                            name="affiliation"
                            value={formik.values.affiliation}
                            onChange={(e) => {
                              formik.setFieldValue(
                                "affiliation",
                                e.target.value
                              );
                            }}
                            onBlur={() =>
                              formik.setFieldTouched("affiliation", true)
                            }
                            className={classNames(
                              "p-d-block w-full text-gray-900",
                              {
                                "p-invalid":
                                  formik.touched?.affiliation &&
                                  formik.errors?.affiliation,
                              }
                            )}
                          />
                          {formik.touched?.affiliation &&
                            formik.errors?.affiliation &&
                            getFormErrorMessage(formik.errors?.affiliation)}
                        </div>
                      </div>
                      <div className="grid">
                        <div className="col-12 md:col-6">
                          <div className="text-gray-500 mb-1">
                            Stakeholder Type
                          </div>
                          <InputText
                            id="stakeholderType"
                            name="stakeholderType"
                            value={formik.values.stakeholderType}
                            onChange={(e) => {
                              formik.setFieldValue(
                                "stakeholderType",
                                e.target.value
                              );
                            }}
                            onBlur={() =>
                              formik.setFieldTouched("stakeholderType", true)
                            }
                            className={classNames(
                              " p-d-block w-full text-gray-900",
                              {
                                "p-invalid":
                                  formik.touched?.stakeholderType &&
                                  formik.errors?.stakeholderType,
                              }
                            )}
                          />
                          {formik.touched?.stakeholderType &&
                            formik.errors?.stakeholderType &&
                            getFormErrorMessage(formik.errors?.stakeholderType)}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 lg:col-6 border-right-0 lg:border-right-1 border-gray-100 px-2 md:px-3 lg:px-4 mt-5">
                      <h5 className="text-lg mb-5 font-medium">Location</h5>
                      <div className="grid mb-5">
                        <div className="col-12 md:col-6">
                          <div className="text-gray-500 mb-1">Country</div>
                          <InputText
                            id="country"
                            name="country"
                            value={formik.values.country}
                            onChange={(e) => {
                              formik.setFieldValue("country", e.target.value);
                            }}
                            onBlur={() =>
                              formik.setFieldTouched("country", true)
                            }
                            className={classNames(
                              " p-d-block w-full text-gray-900",
                              {
                                "p-invalid":
                                  formik.touched?.country &&
                                  formik.errors?.country,
                              }
                            )}
                          />
                          {formik.touched?.country &&
                            formik.errors?.country &&
                            getFormErrorMessage(formik.errors?.country)}
                        </div>
                        <div className="col-12 md:col-6">
                          <div className="text-gray-500 mb-1">City</div>
                          <InputText
                            id="city"
                            name="city"
                            value={formik.values.city}
                            onChange={(e) => {
                              formik.setFieldValue("city", e.target.value);
                            }}
                            onBlur={() => formik.setFieldTouched("city", true)}
                            className={classNames(
                              "p-d-block w-full text-gray-900",
                              {
                                "p-invalid":
                                  formik.touched?.city &&
                                  formik.errors?.lastName,
                              }
                            )}
                          />
                          {formik.touched?.city &&
                            formik.errors?.city &&
                            getFormErrorMessage(formik.errors?.city)}
                        </div>
                      </div>
                      <div className="grid">
                        <div className="col-12 md:col-6">
                          <div className="text-gray-500 mb-1">Street</div>
                          <InputText
                            id="street"
                            name="street"
                            value={formik.values.street}
                            onChange={(e) => {
                              formik.setFieldValue("street", e.target.value);
                            }}
                            onBlur={() =>
                              formik.setFieldTouched("street", true)
                            }
                            className={classNames(
                              " p-d-block w-full text-gray-900",
                              {
                                "p-invalid":
                                  formik.touched?.street &&
                                  formik.errors?.street,
                              }
                            )}
                          />
                          {formik.touched?.street &&
                            formik.errors?.street &&
                            getFormErrorMessage(formik.errors?.street)}
                        </div>
                        <div className="col-12 md:col-6">
                          <div className="text-gray-500 mb-1">Zip</div>
                          <InputText
                            id="zip"
                            name="zip"
                            value={formik.values.zip}
                            onChange={(e) => {
                              formik.setFieldValue("zip", e.target.value);
                            }}
                            onBlur={() => formik.setFieldTouched("zip", true)}
                            className={classNames(
                              "p-d-block w-full text-gray-900",
                              {
                                "p-invalid":
                                  formik.touched?.zip && formik.errors?.zip,
                              }
                            )}
                          />
                          {formik.touched?.zip &&
                            formik.errors?.zip &&
                            getFormErrorMessage(formik.errors?.zip)}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 lg:col-6 px-2 md:px-3 lg:px-4 mt-5">
                      <h5 className="text-lg mb-5 font-medium">
                        Custom values
                      </h5>
                      <div className="grid mb-5">
                        <div className="col-12 md:col-6">
                          <div className="text-gray-500 mb-1">Hair Color</div>
                          <Dropdown
                            id="hairColor"
                            name="hairColor"
                            value={formik.values.hairColor}
                            onChange={(e) => {
                              formik.setFieldValue("hairColor", e.target.value);
                            }}
                            options={["Brown", "Black", "Red"]}
                            onBlur={() =>
                              formik.setFieldTouched("hairColor", true)
                            }
                            className={classNames(
                              "w-full p-d-block w-full text-gray-900",
                              {
                                "p-invalid":
                                  formik.touched?.hairColor &&
                                  formik.errors?.hairColor,
                              }
                            )}
                          />
                          {formik.touched?.hairColor &&
                            formik.errors?.hairColor &&
                            getFormErrorMessage(formik.errors?.hairColor)}
                        </div>
                        <div className="col-12 md:col-6">
                          <div className="text-gray-500 mb-1">
                            Political Party
                          </div>
                          <Dropdown
                            id="politicalParty"
                            name="politicalParty"
                            value={formik.values.politicalParty}
                            onChange={(e) => {
                              formik.setFieldValue(
                                "politicalParty",
                                e.target.value
                              );
                            }}
                            options={["Independent", "Mixed"]}
                            onBlur={() =>
                              formik.setFieldTouched("politicalParty", true)
                            }
                            className={classNames(
                              "p-d-block w-full w-full text-gray-900",
                              {
                                "p-invalid":
                                  formik.touched?.politicalParty &&
                                  formik.errors?.politicalParty,
                              }
                            )}
                          />
                          {formik.touched?.politicalParty &&
                            formik.errors?.politicalParty &&
                            getFormErrorMessage(formik.errors?.politicalParty)}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 flex justify-content-end">
                      <Button
                        label="Save"
                        type="submit"
                        className="text-gray-900 font-normal"
                        style={{ boxShadow: "none" }}
                      />
                    </div>
                  </form>
                </div>
              ) : (
                <>
                  <div className="col-12 lg:col-6 border-right-0 lg:border-right-1 border-gray-100 px-2 md:px-3 lg:px-4">
                    <h5 className="text-lg mb-5 font-medium">
                      Personal information
                    </h5>
                    <div className="grid mb-5">
                      <div className="col-12 md:col-6">
                        <div className="text-gray-500 mb-1">First Name</div>
                        <div className="px-2 mx-1 py-2 mt-2 mb-1 text-gray-900 border-1 border-0">
                          {stakeholderIdentity.firstName}
                        </div>
                      </div>
                      <div className="col-12 md:col-6">
                        <div className="text-gray-500 mb-1">Last Name</div>
                        <div className="px-2 mx-1 py-2 mt-2 mb-1 text-gray-900 border-1 border-0">
                          {stakeholderIdentity.lastName}
                        </div>
                      </div>
                    </div>
                    <div className="grid">
                      <div className="col-12 md:col-6">
                        <div className="text-gray-500 mb-1">Email address</div>
                        <div className="px-2 mx-1 py-2 mt-2 mb-1 text-gray-900 border-1 border-0">
                          {stakeholderIdentity.email}
                        </div>
                      </div>
                      <div className="col-12 md:col-6">
                        <div className="text-gray-500 mb-1">Phone</div>
                        <div className="px-2 mx-1 py-2 mt-2 mb-1 text-gray-900 border-1 border-0">
                          {stakeholderIdentity.phone}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 lg:col-6 px-2 md:px-3 lg:px-4">
                    <h5 className="text-lg mb-5 font-medium">
                      Professional information
                    </h5>
                    <div className="grid mb-5">
                      <div className="col-12 md:col-6">
                        <div className="text-gray-500 mb-1">Profile Type</div>
                        <div className="px-2 mx-1 py-2 mt-2 mb-1 text-gray-900 border-1 border-0">
                          {stakeholderIdentity.profileType}
                        </div>
                      </div>
                      <div className="col-12 md:col-6">
                        <div className="text-gray-500 mb-1">Affiliation</div>
                        <div className="px-2 mx-1 py-2 mt-2 mb-1 text-gray-900 border-1 border-0">
                          {stakeholderIdentity.affiliation}
                        </div>
                      </div>
                    </div>
                    <div className="grid">
                      <div className="col-12 md:col-6">
                        <div className="text-gray-500 mb-1">
                          Stakeholder Type
                        </div>
                        <div className="px-2 mx-1 py-2 mt-2 mb-1 text-gray-900 border-1 border-0">
                          {stakeholderIdentity.stakeholderType}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 lg:col-6 border-right-0 lg:border-right-1 border-gray-100 px-2 md:px-3 lg:px-4 mt-5">
                    <h5 className="text-lg mb-5 font-medium">Location</h5>
                    <div className="grid mb-5">
                      <div className="col-12 md:col-6">
                        <div className="text-gray-500 mb-1">Country</div>
                        <div className="px-2 mx-1 py-2 mt-2 mb-1 text-gray-900 border-1 border-0">
                          {stakeholderIdentity.country}
                        </div>
                      </div>
                      <div className="col-12 md:col-6">
                        <div className="text-gray-500 mb-1">City</div>
                        <div className="px-2 mx-1 py-2 mt-2 mb-1 text-gray-900 border-1 border-0">
                          {stakeholderIdentity.city}
                        </div>
                      </div>
                    </div>
                    <div className="grid">
                      <div className="col-12 md:col-6">
                        <div className="text-gray-500 mb-1">Street</div>
                        <div className="px-2 mx-1 py-2 mt-2 mb-1 text-gray-900 border-1 border-0">
                          {stakeholderIdentity.street}
                        </div>
                      </div>
                      <div className="col-12 md:col-6">
                        <div className="text-gray-500 mb-1">Zip</div>
                        <div className="px-2 mx-1 py-2 mt-2 mb-1 text-gray-900 border-1 border-0">
                          {stakeholderIdentity.zip}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 lg:col-6 px-2 md:px-3 lg:px-4 mt-5">
                    <h5 className="text-lg mb-5 font-medium">Custom values</h5>
                    <div className="grid mb-5">
                      <div className="col-12 md:col-6">
                        <div className="text-gray-500 mb-1">Hair Color</div>
                        <div className="px-2 mx-1 py-2 mt-2 mb-1 text-gray-900 border-1 border-0">
                          {stakeholderIdentity.hairColor}
                        </div>
                      </div>
                      <div className="col-12 md:col-6">
                        <div className="text-gray-500 mb-1">
                          Political Party
                        </div>
                        <div className="px-2 mx-1 py-2 mt-2 mb-1 text-gray-900 border-1 border-0">
                          {stakeholderIdentity.politicalParty}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          }
        />
      )}
    </>
  );
};

export default Identity;
