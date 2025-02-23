import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getApi = createAsyncThunk("getApi", async () => {
  try {
    let response = await axios.get(`http://localhost:3000/products`);
    let res = response.data || [];
    return res;
  } catch (error) {
    throw new Error(
      error.response?.data || "Failed to get data from the json server."
    );
  }
});

export const postApi = createAsyncThunk("postApiData", async (formData) => {
  try {
    let response = await axios.post(`http://localhost:3000/products`, formData);
    let res = response.data;

    return res;
  } catch (error) {
    throw new Error(
      error.response?.data || "Failed to post data into json server."
    );
  }
});

export const deleteApi = createAsyncThunk("deleteApiData", async (id) => {
  try {
    let response = await axios.delete(`http://localhost:3000/products/${id}`);
    let res = response.data;
    return res;
  } catch (error) {
    throw new Error(
      error.response?.data || "Failed to delete data into json server."
    );
  }
});

export const editApi = createAsyncThunk(
  "editApiData",
  async ({ id, formData }) => {
    try {
      let response = await axios.put(
        `http://localhost:3000/products/${id}`,
        formData
      );
      let res = response.data;
      return res;
    } catch (error) {
      throw new Error(
        error.response?.data || "Failed to edit data into json server."
      );
    }
  }
);

export const ApiSlice = createSlice({
  name: "apiSlice",
  initialState: { data: [], loading: true, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getApi.pending, (state) => {
      (state.loading = true), (state.error = null);
    });
    builder.addCase(getApi.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getApi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(postApi.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(postApi.fulfilled, (state, action) => {
      state.loading = false;
      state.data.push(action.payload);
    });
    builder.addCase(postApi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(deleteApi.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteApi.fulfilled, (state, action) => {
      state.loading = false;

      // way 1
      // state.data = state.data.filter(item => item.id !== action.meta.arg);

      // way 2
      state.data = state.data.filter((item) => item.id !== action.payload.id);
      // console.log(state.data);
    });
    builder.addCase(deleteApi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(editApi.pending, (state) => {
      (state.loading = true), (state.error = null);
    });
    builder.addCase(editApi.fulfilled, (state, action) => {
      state.loading = false;
      state.data.map((e) => {
        if (e.id == action.payload.id) {
          action.payload.formData;
        } else {
          e;
        }
      });
    });
    builder.addCase(editApi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default ApiSlice.reducer;
