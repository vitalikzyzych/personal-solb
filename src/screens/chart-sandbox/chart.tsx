import React, { FC, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";
import { FloatLabel } from "primereact/floatlabel";
import { InputSwitch } from "primereact/inputswitch"; // PrimeReact InputSwitch for toggling labels
import { Dropdown } from "primereact/dropdown"; // PrimeReact Dropdown for selecting clusters or top points
import { generateClusterData, generateInputData } from "utils/fakeData"; // Import dynamically generated cluster data
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";

const MultiCenterChart: FC<{ theme: string }> = ({ theme }) => {
  // Default parameters for generateInputData
  const [numClusters, setNumClusters] = useState(7);
  const [minPoints, setMinPoints] = useState(25);
  const [maxPoints, setMaxPoints] = useState(40);
  const [minDistance, setMinDistance] = useState(1);
  const [maxDistance, setMaxDistance] = useState(20);
  const [maxPointCount, setMaxPointCount] = useState(20);

  // State for chart data
  const [inputData, setInputData] = useState(() =>
    generateInputData(
      numClusters,
      minPoints,
      maxPoints,
      minDistance,
      maxDistance
    )
  );
  const [clusterData, setClusterData] = useState(() =>
    generateClusterData(inputData, theme)
  );

  // Function to update chart data based on form inputs
  const updateChartData = () => {
    const newInputData = generateInputData(
      numClusters,
      minPoints,
      maxPoints,
      minDistance,
      maxDistance
    );
    setInputData(newInputData);
    setClusterData(generateClusterData(newInputData, theme));
    setClustersToShow(numClusters); // Reset to show all clusters
    setSelectedCluster(null); // Reset any selected cluster
    setTopPoints(null); // Reset top points filter
  };

  console.log(clusterData);
  const chartRef = useRef(null);
  const [selectedCluster, setSelectedCluster] = useState(null); // Track selected cluster
  const [showLabels, setShowLabels] = useState(true); // Toggle labels visibility
  const [topPoints, setTopPoints] = useState(null); // Track top points filter (e.g., 5 or 10)
  const [clustersToShow, setClustersToShow] = useState(clusterData.length); // Track how many clusters to show

  const getOptions = () => {
    if (!selectedCluster) {
      const filteredClusters = clusterData.slice(0, clustersToShow);
      // Get the colors for legend items dynamically
      const legendColors = filteredClusters.map((cluster) => cluster.color);

      return {
        tooltip: {
          trigger: "item",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter: (params: any) => {
            const { data, name } = params;
            const label = data?.title || name || "No label";
            return `Label: ${label}`;
          },
        },
        legend: {
          top: "0%",
          left: "center",
          data: filteredClusters.map((cluster) => cluster.name),
          textStyle: {
            fontWeight: "bold",
          },
          // Add colors to legend using the `legendColors` array
          itemWidth: 10,
          itemHeight: 10,
          icon: "circle",
          formatter: (name: string) => name,
        },
        xAxis: { show: false },
        yAxis: { show: false },
        color: legendColors,
        series: filteredClusters.map((cluster) => {
          const showPoints = cluster.points.length <= maxPointCount;
          return {
            name: cluster.name,
            type: "scatter",
            data: [
              {
                value: cluster.center,
                symbolSize: 50,
                itemStyle: { color: cluster.color }, // Use cluster color
                symbol: "circle",
                label: {
                  show: showLabels,
                  position: "top",
                  formatter: cluster.name,
                  fontSize: 12,
                  color: "#000",
                },
                title: cluster.name,
              },
              ...(showPoints
                ? cluster.points.map((point) => ({
                    value: point.value,
                    label: {
                      show: showLabels,
                      position: "top",
                      formatter: () => point.label,
                      fontSize: 10,
                      color: "#000",
                    },
                    title: point.label,
                    itemStyle: {
                      color: cluster.color, // Set color for points
                    },
                    symbolSize: 15,
                  }))
                : []),
            ],
          };
        }),
      };
    } else {
      const cluster = clusterData.find((c) => c.name === selectedCluster);
      if (!cluster) {
        throw new Error(`Cluster with name "${selectedCluster}" not found.`);
      }
      const pointsToShow = topPoints
        ? cluster.points
            .slice()
            .sort((a, b) => a.distance - b.distance)
            .slice(0, topPoints)
        : cluster.points;

      return {
        title: {
          text: cluster.name,
          left: "center",
          top: "5%",
        },
        tooltip: {
          trigger: "item",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter: (params: any) => {
            const { data, name } = params;
            const label = data?.title || name || "No label";
            return `Label: ${label}`;
          },
        },
        xAxis: { show: false },
        yAxis: { show: false },
        series: [
          {
            name: cluster.name,
            type: "scatter",
            data: [
              {
                value: cluster.center,
                label: {
                  show: showLabels,
                  position: "top",
                  formatter: cluster.name,
                  fontSize: 12,
                },
                title: cluster.name,
                symbol: "triangle",
                symbolSize: 30,
                itemStyle: { color: cluster.color.replace("0.5", "1") }, // Adjust color opacity if needed
              },
              ...pointsToShow.map((point) => ({
                value: point.value,
                label: {
                  show: showLabels,
                  position: "top",
                  formatter: () => point.label,
                  fontSize: 10,
                  color: "#000",
                },
                title: point.label,
                itemStyle: { color: cluster.color.replace("0.5", "1") },
                symbolSize: 15,
              })),
            ],
          },
        ],
      };
    }
  };

  const handleEvents = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    click: (params: any) => {
      if (selectedCluster) {
        // Reset to initial view when a cluster is clicked again
        setSelectedCluster(null);
        setTopPoints(null);
      } else {
        console.log(params);
        const clickedClusterName = params.seriesName;
        setSelectedCluster(clickedClusterName);
      }
    },
  };

  const topPointsOptions = [
    { label: "Top 5 Closest", value: 5 },
    { label: "Top 10 Closest", value: 10 },
    { label: "Top 20 Closest", value: 20 },
  ];

  const clusterOptions = Array.from({ length: clusterData.length }, (_, i) => ({
    label: `${i + 1} Clusters`,
    value: i + 1,
  }));

  return (
    <div style={{ width: "100%" }}>
      {/* PrimeReact InputSwitch */}
      {/* Form Inputs */}
      <h5 className="mb-4">Chart Fake Data Settings</h5>
      <div className="grid mb-3">
        <div className="col-12 lg:col-6 mb-3">
          <FloatLabel>
            <InputNumber
              value={numClusters}
              onValueChange={(e) => setNumClusters(e.value as number)}
              min={1}
              max={20}
              style={{ width: "150px" }}
            />
            <label>Number of Clusters:</label>
          </FloatLabel>
        </div>
        <div className="col-12 lg:col-6 mb-3">
          <FloatLabel>
            <InputNumber
              value={maxPointCount}
              onValueChange={(e) => setMaxPointCount(e.value as number)}
              min={1}
              max={30}
              style={{ width: "150px" }}
            />
            <label>Show points if less then:</label>
          </FloatLabel>
        </div>
        <div className="col-12 lg:col-6 mb-3">
          <FloatLabel>
            <InputNumber
              value={minPoints}
              onValueChange={(e) => setMinPoints(e.value as number)}
              min={1}
              max={50}
              style={{ width: "150px" }}
            />
            <label>Min Points per Cluster:</label>
          </FloatLabel>
        </div>
        <div className="col-12 lg:col-6 mb-3">
          <FloatLabel>
            <InputNumber
              value={maxPoints}
              onValueChange={(e) => setMaxPoints(e.value as number)}
              min={1}
              max={100}
              style={{ width: "150px" }}
            />
            <label>Max Points per Cluster:</label>
          </FloatLabel>
        </div>
        <div className="col-12 lg:col-6 mb-3">
          <FloatLabel>
            <InputNumber
              value={minDistance}
              onValueChange={(e) => setMinDistance(e.value as number)}
              min={1}
              max={50}
              style={{ width: "150px" }}
            />
            <label>Min Distance:</label>
          </FloatLabel>
        </div>
        <div className="col-12 lg:col-6 mb-3">
          <FloatLabel>
            <InputNumber
              value={maxDistance}
              onValueChange={(e) => setMaxDistance(e.value as number)}
              min={1}
              max={100}
              style={{ width: "150px" }}
            />
            <label>Max Distance:</label>
          </FloatLabel>
        </div>
        <div className="col-12mb-3">
          <Button label="Update Chart" onClick={updateChartData} />
        </div>
      </div>

      <div className="flex mb-2 text-center align-items-center justify-content-center">
        <div className="flex align-items-center justify-content-center">
          <span className="mr-2" id="switch2">
            Show Values
          </span>
          <InputSwitch
            checked={showLabels}
            onChange={(e) => setShowLabels(e.value)}
          />
        </div>
        {/* Dropdown for selecting number of clusters */}
        {!selectedCluster && (
          <Dropdown
            value={clustersToShow}
            options={clusterOptions}
            onChange={(e) => setClustersToShow(e.value)}
            placeholder="Select Clusters"
            className="ml-2"
            style={{ width: "200px" }}
          />
        )}
      </div>

      {/* Dropdown for top points filter (only when a cluster is selected) */}
      {selectedCluster && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "10px",
          }}
        >
          <Dropdown
            value={topPoints}
            options={[
              {
                label: "All Points",
                value:
                  clusterData.find(
                    (cluster) => cluster.name === selectedCluster
                  )?.points?.length || null,
              }, // Option to show all points
              ...topPointsOptions, // Existing options for top points
            ]}
            onChange={(e) => setTopPoints(e.value)}
            placeholder="Select Top Points"
            style={{ width: "200px" }}
          />
          {selectedCluster && (
            <Button
              onClick={() => {
                setSelectedCluster(null);
                setTopPoints(null);
              }}
              style={{
                padding: "10px",
                fontSize: "16px",
                cursor: "pointer",
              }}
              className="ml-3"
            >
              Back to Clusters
            </Button>
          )}
        </div>
      )}

      <ReactECharts
        option={getOptions()}
        style={{ height: "500px", width: "100%" }}
        onEvents={handleEvents}
        ref={chartRef}
      />
    </div>
  );
};

export default MultiCenterChart;

{
  /* <div class="p-inputswitch p-component p-inputswitch-checked" role="checkbox" aria-checked="true" data-pc-name="inputswitch" data-pc-section="root"><div class="p-hidden-accessible" data-pc-section="hiddeninputwrapper"><input type="checkbox" role="switch" aria-checked="true" data-pc-section="hiddeninput" checked=""></div><span class="p-inputswitch-slider" data-pc-section="slider"></span></div>
<div class="p-inputswitch p-component p-highlight" role="checkbox" aria-checked="true" data-p-highlight="true" data-p-disabled="false" data-pc-name="inputswitch" data-pc-section="root"><input type="checkbox" role="switch" aria-checked="true" class="p-inputswitch-input" data-pc-section="input" checked=""><span class="p-inputswitch-slider" data-pc-section="slider"></span></div> */
}
