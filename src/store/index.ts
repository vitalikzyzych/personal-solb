import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "core/rootStore";
import auth from "./auth";
import organization from "./organization";
import settings from "./settings";
import stakeholder from "./stakeholder";
import dataValues from "./dataValues";
import gapAnalytics from "./gapAnalytics";
import textanalysis from "./textanalysis";

export const appSelector = createSelector(
  (state: RootState) => state,
  (state) => state
);

export default {
  auth,
  dataValues,
  organization,
  settings,
  stakeholder,
  gapAnalytics,
  textanalysis,
};
