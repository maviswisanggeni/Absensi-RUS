import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import formatDate from "../../components/useFormatCalendar";
const ContextApiKehadiranSearch = createContext({})

function useApiKehadiranSearch(){
    return useContext(ContextApiKehadiranSearch)
}

function KehadiranSearchProvider ({children}) {
    const [listSearch, setListSearch] = useState(null);
    const [search , setSearch] = useState(null);
    const [startTime, setStartTime] = useState(formatDate(new Date()))
    const [endTime, setEndTime] = useState(formatDate(new Date()))
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        async function getDataJmlKehadiran() {
            const url = "http://absensiguru.smkradenumarsaidkudus.sch.id/api/kehadiran/jml-kehadiran"
            const urlLocal = "http://127.0.0.1:8000/api/kehadiran/search"; 

            setLoading(false);
            const request = {
                search: search,
                // start_time: "2007-05-19",
                // end_time: null,
                start_time: startTime,
                end_time: endTime,
            }

            axios.post(urlLocal, request, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    setListSearch(response.data.data);
                    setLoading(true);
                }).catch((error) => {
                    console.log(error);
                })
        }
        getDataJmlKehadiran();
    }, [startTime, endTime]);

    const contextValue = {
        listSearch,
        setListSearch,
        startTime, 
        setStartTime, 
        endTime, 
        setEndTime,
        loading,
        setLoading,
        search,
        setSearch,
    }

    return(
        <ContextApiKehadiranSearch.Provider value={contextValue}>
            {children}
        </ContextApiKehadiranSearch.Provider>
    )
}

export {ContextApiKehadiranSearch, KehadiranSearchProvider, useApiKehadiranSearch}