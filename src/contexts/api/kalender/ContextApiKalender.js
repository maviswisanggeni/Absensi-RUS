import { createContext, useEffect, useState, useContext } from "react";
import axios from 'axios';
import { useNavigate } from "react-router";

const ContextApiKalender = createContext({})

function useApiKalender() {
    return useContext(ContextApiKalender)
}

function KalenderProvider({ children }) {
    const d = new Date()
    const [listKalender, setListKalender] = useState([])
    const [bulan, setBulan] = useState(d.getMonth())
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    async function getKalender() {
        const url = "https://absensiguru.smkrus.com/api/kalender"
        setLoading(false);
        axios.get(url,
            {
                params: { bulan: bulan },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setListKalender(response.data.data);
                setLoading(true);
            }).catch((error) => {
                console.log(error);
            })
    }
    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
        // getKalender();
    }, []);

    const contextValue = {
        listKalender,
        setListKalender,
        loading,
        setLoading,
        getKalender
    }
    return (
        <ContextApiKalender.Provider value={contextValue}>
            {children}
        </ContextApiKalender.Provider>
    )
}

export { ContextApiKalender, useApiKalender, KalenderProvider }