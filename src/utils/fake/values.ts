import { IHistoryItem, IHistoryItemComment } from "@/store/dataValues";
import { v4 as uuidv4 } from "uuid"; // Install uuid library for unique IDs

// Fake data generator
export function generateFakeHistoryItems(count: number): IHistoryItem[] {
  const actions: IHistoryItem["action"][] = [
    "approval",
    "failed_approval",
    "merge",
    "disapproval",
  ];
  const types: IHistoryItem["type"][] = ["value", "stakeholder"];

  const randomTimestamp = () =>
    new Date(
      Date.now() - Math.floor(Math.random() * 10000000000)
    ).toISOString();

  const generateComments = (): IHistoryItemComment[] => {
    const commentCount = Math.floor(Math.random() * 5) + 1; // Between 1 and 5 comments
    return Array.from({ length: commentCount }, () => ({
      id: uuidv4(),
      text: `This is a comment ${Math.random().toFixed(2)}`,
      timestamp: randomTimestamp(),
    }));
  };

  return Array.from({ length: count }, () => {
    const action = actions[Math.floor(Math.random() * actions.length)];
    const isMerge = action === "merge";
    const values = Array.from(
      { length: Math.floor(Math.random() * 5) + 1 }, // Between 1 and 5 values
      (_, i) => `Value_${i + 1}`
    );

    return {
      id: uuidv4(),
      type: types[Math.floor(Math.random() * types.length)],
      action,
      values,
      sourceValue: isMerge ? `Source_${Math.random().toFixed(2)}` : undefined,
      comments: Math.random() > 0.5 ? generateComments() : undefined, // 50% chance of having comments
      timestamp: randomTimestamp(),
    };
  });
}
