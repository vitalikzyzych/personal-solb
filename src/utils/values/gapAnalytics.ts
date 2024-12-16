import { v4 as uuidv4 } from "uuid";
import { IGapAnalytics } from "@/store/gapAnalytics";

const generateRandomName = (): string => {
  const names = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank"];
  return names[Math.floor(Math.random() * names.length)];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getRandomElement = (arr: any[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getRandomRating = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate random records
export const generateRecords = (count: number): { data: IGapAnalytics[] } => {
  const validValues = ["Safety", "Missing", "Solv Generated"];
  const records: IGapAnalytics[] = [];

  for (let i = 0; i < count; i++) {
    records.push({
      id: uuidv4(),
      stakeholderName: generateRandomName(),
      community: getRandomElement(validValues),
      rating: getRandomRating(1, 100),
      progress: getRandomElement(validValues),
      safety: getRandomElement(validValues),
      network: getRandomElement(validValues),
    });
  }

  return { data: records };
};
