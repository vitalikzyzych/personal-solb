export function darkenColor(hexColor: string, amount = 20) {
  // Remove the '#' if it exists
  hexColor = hexColor.replace(/^#/, "");

  // Parse the red, green, and blue values
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);

  // Darken each color component
  const darken = (color: number) => Math.max(0, color - amount); // Ensure it doesn't go below 0
  const newR = darken(r);
  const newG = darken(g);
  const newB = darken(b);

  // Convert back to a hex color string
  const toHex = (color: number) => color.toString(16).padStart(2, "0"); // Ensure 2 characters
  const darkenedColor = `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;

  return darkenedColor;
}

// Example usage:
console.log(darkenColor("#e1bee7")); // Output: A slightly darker version of #e1bee7

export const getBgColor = (status: string) => {
  switch (status) {
    case "shared":
      return "#0AFFA5";

    case "nda":
      return "#12402E";

    case "confidential":
      return "#3C8E6E";
    default:
      return "#0AFFA5";
  }
};
