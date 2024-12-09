import {
  IStakeholderDocument,
  IStakeholderMergingOf,
  IStakeholderPolling,
  IStakeholderTranscript,
} from "@/store/stakeholder";
import { v4 as uuidv4 } from "uuid"; // For generating random IDs

const privacyStatuses = ["shared", "nda", "confidential"];
const formats = ["doc", "pdf", "excel"];
const categories = [
  "personal notes",
  "format meeting notes",
  "solv data-intake",
];
const names = [
  "John Doe",
  "Jane Smith",
  "Alice Johnson",
  "Bob Brown",
  "Charlie Davis",
];

const types = ["name 1", "name 2", "name 3"];

const getRandomElement = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const generateRandomName = (): string => {
  const firstNames = ["John", "Jane", "Alex", "Emma", "Michael", "Sophia"];
  const lastNames = ["Smith", "Johnson", "Brown", "Taylor", "Anderson", "Lee"];
  return `${getRandomElement(firstNames)} ${getRandomElement(lastNames)}`;
};

export const getStakeholderDocuments = (
  count: number
): IStakeholderDocument[] => {
  const fakeData: IStakeholderDocument[] = [];

  for (let i = 0; i < count; i++) {
    const document: IStakeholderDocument = {
      id: uuidv4(), // Generate a random ID
      name: "Document-" + i,
      updatedDate: formatDate(new Date()), // Current date in ISO format
      privacyStatus: getRandomElement(privacyStatuses), // Random privacy status
      format: getRandomElement(formats), // Random format
      category: getRandomElement(categories), // Random category
      addedBy: getRandomElement(names), // Random name
    };

    fakeData.push(document);
  }

  return fakeData;
};

export const getStakeholderTranscripts = (
  count: number
): IStakeholderTranscript[] => {
  const fakeData: IStakeholderTranscript[] = [];

  for (let i = 0; i < count; i++) {
    const document: IStakeholderTranscript = {
      id: uuidv4(), // Generate a random ID
      name: "Document-" + i,
      updatedDate: formatDate(new Date()), // Current date in ISO format
      type: getRandomElement(types), // Random privacy status
    };

    fakeData.push(document);
  }

  return fakeData;
};

export const getStakeholderPolling = (count: number): IStakeholderPolling[] => {
  const fakeData: IStakeholderPolling[] = [];

  for (let i = 0; i < count; i++) {
    const document: IStakeholderPolling = {
      id: uuidv4(), // Generate a random ID
      name: "Document-" + i,
      updatedDate: formatDate(new Date()), // Current date in ISO format
      mediator: getRandomElement(types), // Random privacy status
    };

    fakeData.push(document);
  }

  return fakeData;
};

export const getStakeholderMergingOf = (
  count: number
): IStakeholderMergingOf[] => {
  const fakeData: IStakeholderMergingOf[] = [];
  const possibleMergingOf = ["none", "noise", "noise disturbance"];
  const documents = Array.from({ length: 100 }, (_, i) => `Document ${i + 1}`);

  const getRandomInt = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const getRandomElement = <T>(array: T[]): T =>
    array[getRandomInt(0, array.length - 1)];

  const getRandomElements = <T>(array: T[], count: number): T[] =>
    Array.from({ length: count }, () => getRandomElement(array)).filter(
      (value, index, self) => self.indexOf(value) === index
    );

  for (let i = 0; i < count; i++) {
    const document: IStakeholderMergingOf = {
      id: uuidv4(), // Generate a random ID
      stakeholderName: generateRandomName(),
      mergingOf: getRandomElements(possibleMergingOf, getRandomInt(1, 3)),
      occurredIn: getRandomElements(documents, getRandomInt(1, 5)),
      approvedRating: getRandomInt(5, 100),
      rating: getRandomInt(5, 100),
    };

    fakeData.push(document);
  }

  return fakeData;
};
