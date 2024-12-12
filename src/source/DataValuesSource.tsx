import {
  IDataValues,
  type IDataValuesParams,
  IDataValuesResponse,
  IProfileCardData,
} from "@/store/dataValues";
import { processRequest } from "./processor";
import { generateFakeHistoryItems } from "@/utils/fake/values";
import { getStakeholderDocuments } from "@/utils/fake/stakeholder";

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

export const getHistory = async () => {
  // const res = await processRequest({
  //   url: 'bookings',
  //   method: 'GET',
  //   params: payload,
  // });
  return generateFakeHistoryItems(10);
};

export const getProfielsList = async (payload: IDataValuesParams) => {
  // const res = await processRequest({
  //   url: 'bookings',
  //   method: 'GET',
  //   params: payload,
  // });
  return generateCardData(20);
};

export const getDocuments = async (payload: string) => {
  return getStakeholderDocuments(20);
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

function generateCardData(numberOfCards: number): IProfileCardData[] {
  const statuses = ["approved", "potential"];
  const titles = [
    "Vermindering van geluidshinder en nog veel meer...",
    "Verbetering van milieu en duurzaamheid",
    "Kostenbesparing en efficiëntie",
    "Betere samenwerking en betrokkenheid",
    "Groei in technologische innovaties",
  ];

  const cards: IProfileCardData[] = [];

  for (let i = 0; i < numberOfCards; i++) {
    const titleIndex = i % titles.length;
    const statusIndex = Math.floor(Math.random() * statuses.length);

    cards.push({
      id: i.toString(),
      title: titles[titleIndex],
      status: statuses[statusIndex],
      value: Math.floor(Math.random() * 100) + 1, // random value between 1 and 100
      approvedRatings: Math.floor(Math.random() * 100), // random percentage
      allRatings: Math.floor(Math.random() * 100), // random percentage
    });
  }

  return cards;
}
