export function generateTableData() {
  const statuses = ["Confidential", "NDA", "Shared"];
  const analysisStates = ["Not analyzed", "Analyzed"];

  const data = [
    {
      name: "Document 1",
      privacyStatus: statuses[2],
      uploadDate: "28/04/2024",
      fileCategory: "Personal notes",
      analyzed: { state: analysisStates[0], count: null },
    },
    {
      name: "Document 2",
      privacyStatus: statuses[1],
      uploadDate: "28/04/2024",
      fileCategory: "Personal notes",
      analyzed: { state: analysisStates[1], count: 2 },
    },
    {
      name: "Document 3",
      privacyStatus: statuses[0],
      uploadDate: "28/04/2024",
      fileCategory: "Personal notes",
      analyzed: { state: analysisStates[1], count: 3 },
    },
  ];

  return data;
}
