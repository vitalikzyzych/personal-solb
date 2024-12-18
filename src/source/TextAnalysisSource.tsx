import { type IGetDocumentsParams } from "@/store/textanalysis";
import { generateTableData } from "@/utils/values/textanalysis";

export const getDocuments = async (payload: IGetDocumentsParams) => {
  return {
    content: generateTableData(),
    totalElements: 50,
    pageNumber: payload.page || 1,
  };
};

export const getReviewValues = async (payload: IGetDocumentsParams) => {
  return [
    {
      id: 1,
      name: "Value 1",
      occurredIn: ["Document 1", "Document 3", "Document 3"],
      ratings: 5,
      rejected: false,
    },
    {
      id: 2,
      name: "Value 2",
      occurredIn: ["Document 2"],
      ratings: 10,
      rejected: true,
    },
    {
      id: 3,
      name: "Value 3",
      occurredIn: ["Document 3", "Document 2"],
      ratings: 10,
      rejected: false,
    },
    {
      id: 4,
      name: "Value 4",
      occurredIn: ["Document 5", "Document 3"],
      ratings: 10,
      rejected: true,
    },
    {
      id: 5,
      name: "Value 5",
      occurredIn: ["Document 1"],
      ratings: 10,
      rejected: false,
    },
  ];
};
export const getReviewStakeholders = async (payload: IGetDocumentsParams) => {
  return [
    {
      id: 1,
      name: "Stakeholder 1",
      occurredIn: ["Document 1", "Document 3", "Document 3"],
      ratings: 5,
      affiliation: "Affiliation 1",
      rejected: false,
    },
    {
      id: 2,
      name: "Stakeholder 2",
      occurredIn: ["Document 2"],
      ratings: 10,
      affiliation: "Affiliation 2",
      rejected: true,
    },
    {
      id: 3,
      name: "Stakeholder 3",
      occurredIn: ["Document 3", "Document 2"],
      ratings: 10,
      affiliation: "Affiliation 3",
      rejected: false,
    },
    {
      id: 4,
      name: "Stakeholder 4",
      occurredIn: ["Document 5", "Document 3"],
      ratings: 10,
      affiliation: "Affiliation 4",
      rejected: true,
    },
    {
      id: 5,
      name: "Stakeholder 5",
      occurredIn: ["Document 1"],
      affiliation: "Affiliation 5",
      ratings: 10,
      rejected: false,
    },
  ];
};
