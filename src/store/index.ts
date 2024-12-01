import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "core/rootStore";
import auth from "./auth";

export const appSelector = createSelector(
  (state: RootState) => state,
  (state) => state
);

export default {
  auth: auth,
};
