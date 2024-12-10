import { createSlice } from "@reduxjs/toolkit";
import type {
  IDataValues,
  IDataValuesResponse,
  IProfileCardData,
} from "./dataValues.types";
import { type PaginatorMeta } from "@/types";
import { getProfilesList, getValuesList } from "./dataValues.actions";

interface IState {
  isLoading: boolean;
  isProfilesLoading: boolean;
  values: {
    data: IDataValues[];
    status: string;
  }[];
  profiles: IProfileCardData[];
  meta: PaginatorMeta;
  metaProfiles: PaginatorMeta;
}

const initialState: IState = {
  isLoading: false,
  isProfilesLoading: false,
  values: [],
  profiles: [],
  meta: {
    page: 1,
    pageSize: 10,
    total: 0,
  },
  metaProfiles: {
    page: 1,
    pageSize: 10,
    total: 0,
  },
};

const dataValuesSlice = createSlice({
  name: "dataValues",
  initialState,
  reducers: {
    resetMeta(state) {
      state.meta.page = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getValuesList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getValuesList.fulfilled,
      (state, { payload }: { payload: IDataValuesResponse }) => {
        const { content, totalElements, pageNumber } = payload;
        state.isLoading = false;
        state.values = content;
        state.meta.total = totalElements;

        state.meta.page = pageNumber - 1;
      }
    );
    builder.addCase(getValuesList.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getProfilesList.pending, (state) => {
      state.isProfilesLoading = true;
    });
    builder.addCase(
      getProfilesList.fulfilled,
      (state, { payload }: { payload: IProfileCardData[] }) => {
        state.isProfilesLoading = false;
        state.profiles = payload;
        state.metaProfiles.total = payload.length;
        state.metaProfiles.page = 0;
      }
    );
    builder.addCase(getProfilesList.rejected, (state) => {
      state.isProfilesLoading = false;
    });
  },
});

export const { resetMeta } = dataValuesSlice.actions;
export const dataValuesReducer = dataValuesSlice.reducer;
export default dataValuesReducer;
