import { getCurrentTheme } from "@/constants/theme";

type Point = {
  title: string;
  distance: number;
};

type PreCluster = {
  clusterName: string;
  values: Point[];
};

type Cluster = {
  name: string;
  center: number[];
  points: {
    value: number[];
    label: number;
    distance: number;
  }[];
  color: string;
};

const generateDistinctColors = (numColors: number) => {
  const colors: string[] = [];
  const step = 360 / numColors; // Spread hues evenly
  for (let i = 0; i < numColors; i++) {
    const hue = Math.floor(i * step);
    const saturation = 70 + Math.random() * 20; // Random saturation between 70 and 90
    const lightness = 50 + Math.random() * 10; // Random lightness between 50 and 60
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }
  return colors;
};

export const generateInputData = (
  numClusters: number,
  minValues: number,
  maxValues: number,
  minDistance: number,
  maxDistance: number
) => {
  const inputData: PreCluster[] = [];
  for (let i = 0; i < numClusters; i++) {
    const numValues =
      Math.floor(Math.random() * (maxValues - minValues + 1)) + minValues; // Random count of values
    const values = Array.from({ length: numValues }, (_, idx) => ({
      title: `Point ${idx + 1}`, // Generate unique point titles
      distance: Number(
        // Parse distance to ensure it's a number
        (Math.random() * (maxDistance - minDistance) + minDistance).toFixed(0)
      ),
    }));
    inputData.push({
      clusterName: `Cluster ${i + 1}`, // Generate unique cluster names
      values: values,
    });
  }
  return inputData;
};

export const generateClusterData = (data: PreCluster[], theme: string) => {
  const clusters: Cluster[] = [];
  // Pre-generate colors based on the number of clusters
  const colors = getCurrentTheme(theme).values;
  // const colors = generateDistinctColors(data.length);
  data.forEach((cluster, index) => {
    // Randomly place cluster centers
    const center = [
      Math.random() * 10 - 5, // Random x-coordinate
      Math.random() * 10 - 5, // Random y-coordinate
    ];
    const points = cluster.values.map((point) => {
      // Calculate random position based on distance and angle
      const angle = Math.random() * 2 * Math.PI; // Random angle
      const x = center[0] + point.distance * Math.cos(angle); // Use point.distance as a number
      const y = center[1] + point.distance * Math.sin(angle); // Use point.distance as a number
      return {
        value: [x, y],
        label: parseInt(point.distance.toFixed(0), 10),
        distance: parseInt(point.distance.toFixed(0), 10), // Keep label as a string
        // Keep label as a string
      };
    });
    clusters.push({
      name: cluster.clusterName,
      center: center,
      points: points,
      color: colors[index],
    });
  });
  return clusters;
};

export function generateClusterDataForRadialChart(numArrays: number) {
  const clusterNames = [
    "Nature",
    "Community",
    "Vermindering van geluidhinder",
    "Optimalisatie van het busverkeer",
    "Progress",
  ];

  // Function to generate a random array of { name, value } objects
  const generateCluster = () => {
    return clusterNames.map((name) => ({
      name: name,
      value: Math.floor(Math.random() * 101), // Random value between 0 and 100
    }));
  };

  // Create an array of arrays
  const data = Array.from({ length: numArrays }, () => generateCluster());

  return data;
}
