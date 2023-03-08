import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import formatDate from "../../../components/useFormatCalendar";
const ContextApiKehadiranSearch = createContext({})


function useApiKehadiranSearch(){
    return useContext(ContextApiKehadiranSearch)
}

function KehadiranSearchProvider ({children}) {
    const [listSearch, setListSearch] = useState([]);
    const [listSearchPulang, setListSearchPulang] = useState([]);
    const [listSearchMasuk, setListSearchMasuk] = useState([]);
    const [search , setSearch] = useState(null);
    const [startTime, setStartTime] = useState(formatDate(new Date()))
    const [endTime, setEndTime] = useState(null)
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    console.log(endTime)
    async function getSearch() {
        const url = "https://absensiguru.smkrus.com/api/kehadiran"
        setLoading(false);
        const request = {
            search: search,
            start_time: startTime,
            end_time: endTime === null ? null : endTime,
        }
        return axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
                params: request
            })
    }

    const contextValue = {
        listSearch,
        setListSearch,
        listSearchPulang,
        setListSearchPulang,
        listSearchMasuk,
        setListSearchMasuk,
        startTime, 
        setStartTime, 
        endTime, 
        setEndTime,
        loading,
        setLoading,
        search,
        setSearch,
        getSearch,
    }

    return(
        <ContextApiKehadiranSearch.Provider value={contextValue}>
            {children}
        </ContextApiKehadiranSearch.Provider>
    )
}

export {ContextApiKehadiranSearch, KehadiranSearchProvider, useApiKehadiranSearch}