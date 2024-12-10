import { IStakeholderListParams } from "@/store/stakeholder";
import {
  getAllStakeholders,
  getStakeholderDocuments,
  getStakeholderMergingOf,
  getStakeholderPolling,
  getStakeholderTranscripts,
  getStakeholders,
} from "@/utils/fakeGenerator/stakeholder";

export const getListAll = async (payload: IStakeholderListParams) => {
  return {
    content: getAllStakeholders(50),
    totalElements: 50,
    pageNumber: payload.page || 1,
  };
};

export const getList = async (payload: IStakeholderListParams) => {
  return {
    content: getStakeholders(50),
    totalElements: 50,
    pageNumber: payload.page || 1,
  };
};

export const get = async (payload: string) => {
  return getStakeholders(1)[0];
};

export const getValues = async (payload: string) => {
  return {};
};

export const getDocuments = async (payload: string) => {
  return getStakeholderDocuments(20);
};

export const getTranscripts = async (payload: string) => {
  return getStakeholderTranscripts(30);
};

export const getPolling = async (payload: string) => {
  return getStakeholderPolling(40);
};

export const getMergingOf = async (payload: string) => {
  return getStakeholderMergingOf(40);
};

export const getIdentity = async (payload: string) => {
  return {
    id: "1a2b3c4d5e",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    profileType: "individual",
    affiliation: "Global Tech Inc.",
    stakeholderType: "Investor",
    country: "USA",
    city: "New York",
    street: "123 Elm Street",
    zip: "10001",
    hairColor: "Brown",
    politicalParty: "Independent",
  };
};
