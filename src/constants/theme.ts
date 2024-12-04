export const themes = [
  {
    name: "vibrant",
    values: [
      "#f44336", // Red
      "#e91e63", // Pink
      "#9c27b0", // Purple
      "#673ab7", // Deep Purple
      "#3f51b5", // Indigo
      "#2196f3", // Blue
      "#03a9f4", // Light Blue
      "#00bcd4", // Cyan
      "#009688", // Teal
      "#4caf50", // Green
    ],
  },
  {
    name: "earthy",
    values: [
      "#8d6e63", // Brown
      "#d7ccc8", // Warm Beige
      "#c5e1a5", // Light Green
      "#aed581", // Soft Green
      "#ffcc80", // Soft Orange
      "#ffb74d", // Orange
      "#bcaaa4", // Muted Brown
      "#ffab91", // Coral
      "#d7ccc8", // Soft Stone
      "#90a4ae", // Cool Gray
    ],
  },
  {
    name: "monochromatic",
    values: [
      "#e3f2fd", // Light Blue
      "#bbdefb", // Sky Blue
      "#90caf9", // Soft Blue
      "#64b5f6", // Light Azure
      "#42a5f5", // Azure
      "#2196f3", // Medium Blue
      "#1e88e5", // Deep Blue
      "#1976d2", // Classic Blue
      "#1565c0", // Navy Blue
      "#0d47a1", // Midnight Blue
    ],
  },
  {
    name: "warm",
    values: [
      "#f44336", // Red
      "#ef5350", // Soft Red
      "#e57373", // Coral
      "#ff5722", // Deep Orange
      "#ff7043", // Bright Orange
      "#ffb74d", // Warm Yellow
      "#ffcc80", // Soft Orange
      "#ffd54f", // Sunny Yellow
      "#ffeb3b", // Bright Yellow
      "#fbc02d", // Golden Yellow
    ],
  },
  {
    name: "cool",
    values: [
      "#7986cb", // Soft Indigo
      "#64b5f6", // Light Azure
      "#4fc3f7", // Sky Blue
      "#4dd0e1", // Aqua
      "#4db6ac", // Teal Green
      "#81c784", // Soft Green
      "#aed581", // Light Lime
      "#dce775", // Light Olive
      "#ffb74d", // Muted Orange
      "#ff8a65", // Coral Pink
    ],
  },
  {
    name: "pastel",
    values: [
      "#f8bbd0", // Pastel Pink
      "#e1bee7", // Lavender
      "#d1c4e9", // Lilac
      "#c5cae9", // Soft Indigo
      "#b3e5fc", // Soft Blue
      "#b2dfdb", // Mint
      "#c8e6c9", // Pastel Green
      "#dcedc8", // Lime Green
      "#ffe0b2", // Peach
      "#ffccbc", // Pastel Coral
    ],
  },
];

export const getCurrentTheme = (name: string) =>
  themes.find((theme) => theme.name === name) || themes[0];
