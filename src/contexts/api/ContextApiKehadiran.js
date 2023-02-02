import { createContext, useEffect, useState, useContext } from "react";
import axios from 'axios';
import formatDate from "../../components/useFormatCalendar";

const ContextApiKehadiranJmlKehadiran = createContext({})

function useKehadiranJmlKehadiran(){
    return useContext(ContextApiKehadiranJmlKehadiran)
}

function KehadiranJmlKehadiranProvider ({children}) {
    const [jmlKehadiran, setJmlKehadiran] = useState(null);
    const [date, setDate] = useState(formatDate(new Date()))
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        // async function getDataJmlKehadiran() {
        //     const url = "http://absensiguru.smkradenumarsaidkudus.sch.id/api/kehadiran/jml-kehadiran"
        //     const urlLocal = "http://127.0.0.1:8000/api/kehadiran"; 
        //     const request = {   
        //         start_time: date,
        //         end_time: date,
        //     }
        //     setLoading(false);
        //     axios.get(urlLocal, 
        //         {
        //             headers: {
        //                 Authorization: `Bearer ${token}`,
        //             },
        //         })
        //         .then((response) => {
        //             setJmlKehadiran(response.data.data.jml_kehadiran); 
        //             setLoading(true);
        //         }).catch((error) => {
        //             console.log(error);
        //         })
        // }
        // getDataJmlKehadiran();
    }, [date]);

    const contextValue = {
        jmlKehadiran,
        setJmlKehadiran, 
        date, 
        setDate,        
        loading,
        setLoading
    }
    return(
        <ContextApiKehadiranJmlKehadiran.Provider value={contextValue}>
            {children}
        </ContextApiKehadiranJmlKehadiran.Provider>
    )
}

export {ContextApiKehadiranJmlKehadiran, useKehadiranJmlKehadiran, KehadiranJmlKehadiranProvider}