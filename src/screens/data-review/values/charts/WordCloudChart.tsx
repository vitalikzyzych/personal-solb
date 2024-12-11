"use client";
import { type FC, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactECharts from "echarts-for-react";
import "echarts-wordcloud";

import { getCurrentTheme } from "@/constants/theme";
import { AppDispatch } from "@/core/rootStore";
import { getTheme } from "@/store/settings";
import { appSelector } from "@/store";

const generateWordCloudData = () => {
  return [
    {
      name: "Machine Learning",
      value: 10000,
    },
    { name: "Deep Learning", value: 6181 },
    { name: "Computer Vision", value: 4386 },
    { name: "Artificial Intelligence", value: 4055 },
    { name: "Neural Network", value: 3500 },
    { name: "Algorithm", value: 3333 },
    { name: "Model", value: 2700 },
    { name: "Supervised", value: 2500 },
    { name: "Unsupervised", value: 2333 },
    { name: "Natural Language Processing", value: 1900 },
    { name: "Chatbot", value: 1800 },
    { name: "Virtual Assistant", value: 1500 },
    { name: "Speech Recognition", value: 1400 },
    { name: "Convolutional Neural Network", value: 1325 },
    { name: "Reinforcement Learning", value: 1300 },
    { name: "Training Data", value: 1250 },
    { name: "Classification", value: 1233 },
    { name: "Regression", value: 1000 },
    { name: "Decision Tree", value: 900 },
    { name: "K-Means", value: 875 },
    { name: "N-Gram Analysis", value: 850 },
    { name: "Microservices", value: 833 },
    { name: "Pattern Recognition", value: 790 },
    { name: "APIs", value: 775 },
    { name: "Feature Engineering", value: 700 },
    { name: "Random Forest", value: 650 },
    { name: "Bagging", value: 600 },
    { name: "Anomaly Detection", value: 575 },
  ];
};

const WordCloudChart: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const chartRef = useRef<ReactECharts>(null);
  useEffect(() => {
    dispatch(getTheme());
  }, []);

  const {
    settings: { theme },
  } = useSelector(appSelector);
  const values = generateWordCloudData().map((item) => {
    return {
      ...item,
      textStyle: {
        color: getCurrentTheme(theme).values[Math.floor(Math.random() * 10)],
      },
    };
  });

  const option = {
    tooltip: {},
    series: [
      {
        type: "wordCloud",
        gridSize: 2,
        sizeRange: [12, 50],
        rotationRange: [0, 0],
        shape: "apple",
        width: 600,
        height: 400,
        drawOutOfBound: true,
        textStyle: {
          normal: {
            color: function () {
              return (
                "rgb(" +
                [
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                ].join(",") +
                ")"
              );
            },
          },
          emphasis: {
            shadowBlur: 10,
            shadowColor: "#333",
          },
        },
        data: values,
      },
    ],
  };
  return (
    <ReactECharts
      ref={chartRef}
      option={option}
      style={{ width: "100%", height: "300px" }}
    />
  );
};

export default WordCloudChart;
