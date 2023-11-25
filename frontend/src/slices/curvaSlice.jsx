import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import curvaService from "../services/curvaService"; // Importe o serviço atualizado

const initialState = {
  curvas: [],
  curva: {},
  subFilterValues: [],
  error: false,
  success: false,
  loading: false,
  message: null,
};

export const getCurvas = createAsyncThunk(
  "curva/getall", 
  async (_, thunkAPI) => {
    const data = await curvaService.getCurvas();

    return data;
});

export const getCurvaSudesteConv = createAsyncThunk( //get S
  "curva/getSudesteConv", 
  async (_, thunkAPI) => {
    const data = await curvaService.getCurvaSudesteConv();

    return data;
  }
);

export const getCurvaSudeste1Conv = createAsyncThunk( // get SE
  "curva/getSudesteConv",
  async (_, thunkAPI) => {
    const data = await curvaService.getCurvaSudeste1Conv();

    return data;
  }
);

export const getCurvaNordesteConv = createAsyncThunk(
  "curva/getSudesteConv",
  async (_, thunkAPI) => {
    const data = await curvaService.getCurvaNordesteConv();

    return data;
  }
);

export const getCurvaNorteConv = createAsyncThunk(
  "curva/getSudesteConv",
  async (_, thunkAPI) => {
    const data = await curvaService.getCurvaNorteConv();

    return data;
  }
);

export const getDataFromSubmarket = createAsyncThunk(
  "curva/getDataFromSubmarket",
  async (param, thunkAPI) => {
    
    const data = await curvaService.getDataFromSubmarket(param);

    return data;
  }
);


export const getDatafwdCurva = createAsyncThunk(
  "curva/getDatafwdCurva",
  async (_, thunkAPI) => {
    const data = await curvaService.getDatafwdCurva();

    return data;
  }
);

export const curvaSlice = createSlice({
  name: "curva",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurvas.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getCurvas.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.curvas = action.payload;
      })
      .addCase(getCurvas.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      })
      .addCase(getCurvaSudesteConv.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getCurvaSudesteConv.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.curvas = action.payload;
      })
      .addCase(getCurvaSudesteConv.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      })
      .addCase(getDatafwdCurva.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getDatafwdCurva.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.curvas = action.payload;
      })
      .addCase(getDatafwdCurva.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      })
      .addCase(getDataFromSubmarket.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getDataFromSubmarket.fulfilled, (state, action) => {
        console.log('getdata', action)
        state.loading = false;
        state.success = true;
        state.error = null;
        state.subFilterValues = action.payload;
      })
      .addCase(getDataFromSubmarket.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      });
  },
});

export const { resetMessage } = curvaSlice.actions;
export default curvaSlice.reducer;
