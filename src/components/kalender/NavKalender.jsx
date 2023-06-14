import React from 'react'
import arrowLeft from '../../assets/icons/arrow-left.svg'
import trashWhite from '../../assets/icons/trashWhite.svg'
import { useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { deleteKalender, storeKalender, updateKalender } from '../../features/kalenderSlice'
import dayjs from 'dayjs'

function NavKalender() {
  let navigate = useNavigate()
  let id = useParams()
  const { isAddPage, judul, kategoriEvent, lokasi, waktuMulai, waktuSelesai, deskripsi, peserta, loading, waktuMulaiLibur, waktuSelesaiLibur
  } = useSelector((state) => state.kalender)
  const dispatch = useDispatch()

  function handleSubmit() {
    const filteredPeserta = peserta.filter(item => item.isChecked === true)

    if (isAddPage) {
      dispatch(storeKalender({
        judul,
        lokasi,
        kategori_event: kategoriEvent,
        waktu_mulai: kategoriEvent === 'libur' ? dayjs(waktuMulaiLibur).format('YYYY-MM-DD') : waktuMulai,
        waktu_selesai: kategoriEvent === 'libur' ? dayjs(waktuSelesaiLibur).format('YYYY-MM-DD') : waktuSelesai,
        deskripsi,
        peserta: filteredPeserta,
      }))
        .then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            navigate('/kalender')
          }
        })
        .catch((err) => {
          console.log(err);
        })

    } else {
      dispatch(updateKalender({
        id: id.id,
        judul,
        lokasi,
        kategori_event: kategoriEvent,
        waktu_mulai: kategoriEvent === 'libur' ? dayjs(waktuMulaiLibur).format('YYYY-MM-DD') : waktuMulai,
        waktu_selesai: kategoriEvent === 'libur' ? dayjs(waktuSelesaiLibur).format('YYYY-MM-DD') : waktuSelesai,
        deskripsi,
        peserta: filteredPeserta,
      }))
        .then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            navigate('/kalender')
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  function handleDelete() {
    dispatch(deleteKalender(id.id))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          navigate('/kalender')
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function validateBtnEvent() {
    return judul.trim() !== '' &&
      lokasi?.trim() !== '' &&
      lokasi !== null &&
      kategoriEvent.trim() !== '' &&
      waktuMulai.trim() !== '' &&
      waktuSelesai.trim() !== '' &&
      deskripsi.trim() !== '' &&
      peserta.length !== 0
      ? false : true
  }

  function validateBtnLibur() {
    return judul.trim() !== '' &&
      kategoriEvent.trim() !== '' &&
      deskripsi.trim() !== '' &&
      peserta.length !== 0
      ? false : true
  }

  return (
    <div className='nav-kalender'>
      <div className='wrapper-back-btn'>
        <img src={arrowLeft} onClick={() => navigate(-1)} alt="" />
        <h1>Tambah Event</h1>
      </div>
      <div className='wrapper-action-btn'>
        {
          isAddPage ? null :
            <button onClick={handleDelete}>
              <img src={trashWhite} alt="" />
            </button>
        }
        <input
          type="submit"
          value='Konfirmasi'
          className='btn-submit'
          onClick={handleSubmit}
          disabled={
            kategoriEvent === 'event'
              ? validateBtnEvent()
              : validateBtnLibur()
          }
        />
      </div>
      {loading ? <div className='loading-fullscreen'><div className='loading'></div></div> : null}
    </div>
  )
}

export default NavKalender