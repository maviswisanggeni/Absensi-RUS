import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";
import getBaseUrl from "../datas/apiUrl";
import token from "../datas/tokenAuthorization";
import formatDate from "../components/useFormatCalendar";

export const getKehadiran = createAsyncThunk("kehadiran/getKehadiran", async ({ start_time, end_time, search }) => {
    const response = await axios.get(
        getBaseUrl() + 'kehadiran',
        {
            headers: {
                Authorization: `Bearer ${token()}`,
            },
            params: {
                start_time,
                end_time,
                search
            }
        }
    )
    return response.data
})

export const getKehadiranTerbaru = createAsyncThunk("kehadiran/getKehadiranTerbaru", async ({ start_time }) => {
    const response = await axios.get(
        getBaseUrl() + 'kehadiran',
        {
            headers: {
                Authorization: `Bearer ${token()}`,
            },
            params: {
                start_time,
            }
        }
    )
    return response.data
})

const kehadiranSlice = createSlice({
    name: 'kehadiran',
    initialState: {
        kehadiranMasuk: [],
        kehadiranKeluar: [],
        kehadiranIzin: [],
        kehadiranTerbaru: [],
        search: '',
        startTime: formatDate(new Date()),
        endTime: null,
        startText: 'Tanggal mulai',
        endText: 'Tanggal berakhir',
        currentPage: 1,
        keterangan: 'Masuk',
        urutan: 'Tercepat',
        loading: false,
        loadingKehadiranTerbaru: false,
        kategoriId: null
    },
    reducers: {
        setKehadiranMasuk: (state, action) => {
            state.kehadiranMasuk = state.kehadiranMasuk.concat(action.payload);
        },
        setKehadiranKeluar: (state, action) => {
            state.kehadiranKeluar = state.kehadiranKeluar.concat(action.payload);
        },
        setKehadiranIzin: (state, action) => {
            state.kehadiranIzin = state.kehadiranIzin.concat(action.payload);
        },
        tabbarToggle: (state, action) => {
            state.keterangan = action.payload
        },
        updateStateKehadiran: (state, action) => {
            const { name, value } = action.payload
            state[name] = value
        },
        filterToggle: (state, action) => {
            state.urutan = action.payload
        },
        setStartTIme: (state, action) => {
            state.startTime = action.payload
        },
        setEndTime: (state, action) => {
            state.endTime = action.payload
        },
        setSearch: (state, action) => {
            state.search = action.payload
        },
        setStartText: (state, action) => {
            state.startText = action.payload
        },
        setEndText: (state, action) => {
            state.endText = action.payload
        },
        updateKehadiranState: (state, action) => {
            const { field, value } = action.payload
            state[field] = value
        },
    },
    extraReducers: {
        [getKehadiran.pending]: (state) => {
            state.loading = false
        },
        [getKehadiran.fulfilled]: (state, action) => {
            state.loading = true
            state.kehadiranMasuk = action.payload.data.masuk
            state.kehadiranKeluar = action.payload.data.pulang
            state.kehadiranIzin = action.payload.data.izin
        },
        [getKehadiranTerbaru.pending]: (state) => {
            state.loadingKehadiranTerbaru = false
        },
        [getKehadiranTerbaru.fulfilled]: (state, action) => {
            state.loadingKehadiranTerbaru = true
            state.kehadiranTerbaru = action.payload.data.masuk
        }
    }
})

export const {
    tabbarToggle, setStartTIme, setEndTime, setSearch, setStartText, setEndText,
    filterToggle, setKehadiranIzin, setKehadiranKeluar, setKehadiranMasuk, updateKehadiranState,
    updateStateKehadiran
} = kehadiranSlice.actions
export default kehadiranSlice.reducer;