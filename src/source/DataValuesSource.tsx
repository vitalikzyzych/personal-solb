import {
  IDataValues,
  type IDataValuesParams,
  IDataValuesResponse,
} from "@/store/dataValues";
import { processRequest } from "./processor";

export const getValuesList = async (payload: IDataValuesParams) => {
  // const res = await processRequest({
  //   url: 'bookings',
  //   method: 'GET',
  //   params: payload,
  // });
  const res = {
    content: generateData(100),
    totalElements: 100,
    pageNumber: payload.page || 1,
  };
  return res as IDataValuesResponse;
};

const generateData = (count: number) => {
  const statuses = ["Approved", "Potential", "Rejected"];
  const randomPercentage = () => Math.floor(Math.random() * 100);

  return statuses.map((status) => ({
    status,
    data: Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      value: `Value ${i + 1}`,
      mergingOf: i % 2 === 0 ? "Recycling, cafe" : "None",
      occurredIn: `Document ${String.fromCharCode(65 + (i % 3))}`,
      approvedRatings: randomPercentage(),
      allRatings: randomPercentage(),
      typeLabel: "Exotic",
    })) as IDataValues[],
  }));
};
