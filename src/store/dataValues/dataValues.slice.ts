import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type IDataValues, IDataValuesResponse } from "./dataValues.types";
import { type PaginatorMeta } from "@/types";
import { getValuesList } from "./dataValues.actions";

interface IState {
  isLoading: boolean;
  values: {
    data: IDataValues[];
    status: string;
  }[];
  meta: PaginatorMeta;
}

const initialState: IState = {
  isLoading: false,
  values: [],
  meta: {
    page: 1,
    pageSize: 10,
    total: 0,
  },
};

const dataValuesSlice = createSlice({
  name: "dataValues",
  initialState,
  reducers: {},
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
  },
});

export const dataValuesReducer = dataValuesSlice.reducer;
export default dataValuesReducer;
