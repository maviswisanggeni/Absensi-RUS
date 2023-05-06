import { createContext, useEffect, useState, useContext } from "react";
import axios from 'axios';
import { useNavigate } from "react-router";

const ContextApiKaryawan = createContext({})

function useApiKaryawan(){
    return useContext(ContextApiKaryawan)
}

function KaryawanProvider ({children}) {
    const [listKaryawan, setListKaryawan] = useState([])
    const [listPengajar, setListPengajar] = useState([])
    const [listStaff, setListStaff] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [keterangan, setKeterangan] = useState(true)
    const [urutan, setUrutan] = useState('Sesuai abjad')
    const [current, setCurrent] = useState(1)
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    async function getKaryawan() {
        const url = "https://absensiguru.smkrus.com/api/karyawan"
        setLoading(false);
        axios.get(url, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setListKaryawan(response.data);
                setListPengajar(response.data.pengajar)
                setListStaff(response.data.staff)
                setLoading(true);
            }).catch((error) => {
                console.log(error);
            })
    }
    useEffect(() => {
        if(!token){
            navigate('/login')
        }
        // getKaryawan();
    }, []);

    const contextValue = {
        listKaryawan, setListKaryawan,
        listPengajar, setListPengajar,
        listStaff, setListStaff,
        currentPage, setCurrentPage,
        keterangan, setKeterangan,
        current, setCurrent,
        loading, setLoading,
        getKaryawan,
        urutan, setUrutan,
    }
    return(
        <ContextApiKaryawan.Provider value={contextValue}>
            {children}
        </ContextApiKaryawan.Provider>
    )
}

export {ContextApiKaryawan, useApiKaryawan, KaryawanProvider}