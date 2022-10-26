import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  pageCount: 1,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
  orderSort: {
    name: "A",
    sortOrderProperty: "asc",
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setOrderSort(state, action) {
      state.orderSort = action.payload;
    },
    setPageCount(state, action) {
      state.pageCount = action.payload;
    },
    setFilters(state, action) {
      state.pageCount = Number(action.payload.pageCount);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
      state.orderSort = action.payload.orderSort;
    },
  },
});

export const {
  setCategoryId,
  setSort,
  setOrderSort,
  setPageCount,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
