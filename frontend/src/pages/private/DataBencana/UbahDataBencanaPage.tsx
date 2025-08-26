import { ChangeEvent, Fragment, SetStateAction, useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import Breadcrumb from '../../../components/Breadcrumb'
import Swal from 'sweetalert2';
import * as api from '../../../utils/Api';
import { Icon } from '@iconify/react';
import { Error, Success } from '../../../utils/Alerts';
import { v4 as uuidv4 } from 'uuid';
import SelectKabupaten from '../../../components/Module/SelectKabupaten';
import SelectKecamatan from '../../../components/Module/SelectKecamatan';
import SelectKelurahan from '../../../components/Module/SelectKelurahan';
import RadioButtonTrue from '../../../components/Module/RadioButtonTrue';
import RadioButtonFalse from '../../../components/Module/RadioButtonFalse';



export default function UbahDataBencanaPage() {
  const[jenisKejadian, setJenisKejadian] = useState<Array<any>>([])
  const[show, setShow] = useState("")

  const { id } = useParams()
  
  const[fileLaporan, setFileLaporan] = useState<any>("")
  const[kejadian, setKejadian] = useState<any>({
    id_kejadian: id,
    id_user: 1,
    id_jenis_kejadian: "",
    kronologis: "",
    tanggal: "",
    jam: "",
    titik_lokasi: "",
    status_ditangani: "",
    verification: false,
    ket: ""
  })
  const[data, setData] = useState<Array<any>>([{
    id_lokasi: "",
    id_kejadian: kejadian?.id_kejadian,
    kab: "",
    kec: "",
    desa: "",
    dusun: "",
    lat: "",
    long: "",

    id_korban: "",
    meninggal: "",
    luka_luka: "",
    sakit: "",
    hilang: "",
    menderita_kk: "",
    menderita_jiwa: "",
    mengungsi_kk: "",
    mengungsi_jiwa: "",

    id_kerusakan: "",
    rumah_terdampak: "",
    rm_rusak_ringan: "",
    rm_rusak_sedang: "",
    rm_rusak_berat: "",
    sarana_pendidikan: "",
    sarana_ibadah: "",
    sarana_kesehatan: "",
    perkantoran: "",
    bangunan_lain: "",
    jalan: "",
    jembatan: "",
    sawah: "",
    kebun: "",
    tambak: "",
    irigasi: ""
  }])

    // terdampak
    const AddParentTerdampak = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      setData([...data, {
        id_lokasi: uuidv4(),
        id_kejadian: kejadian?.id_kejadian,
        kab: "",
        kec: "",
        desa: "",
        dusun: "",
        lat: "",
        long: "",
  
        id_korban: uuidv4(),
        meninggal: "",
        luka_luka: "",
        sakit: "",
        hilang: "",
        menderita_kk: "",
        menderita_jiwa: "",
        mengungsi_kk: "",
        mengungsi_jiwa: "",
  
        id_kerusakan: uuidv4(),
        rumah_terdampak: "",
        rm_rusak_ringan: "",
        rm_rusak_sedang: "",
        rm_rusak_berat: "",
        sarana_pendidikan: "",
        sarana_ibadah: "",
        sarana_kesehatan: "",
        perkantoran: "",
        bangunan_lain: "",
        jalan: "",
        jembatan: "",
        sawah: "",
        kebun: "",
        tambak: "",
        irigasi: ""
      }])
    }
  
    const MinusParentTerdampak = (_event: any, _index: number) => {
      const state = [...data]
      state.splice(_index,1)
      setData(state)
    }

    const handleChangeInput = (_index: number, event: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
      const values = [...data];
      values[_index][event.target.name] = event.target.value;
      setData(values);
    }

    const loadImage = (event: any) => {
        const image = event.target.files[0];
        if(image.size > 5000000) return  Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Gagal",
          text: "File Melebihi Kapasitas Penyimpanan, Max 5 MB",
          showConfirmButton: false,
          timer: 1500
        });
        setFileLaporan(image);
      };


      // Proses Bulk Create terdampak
  let lokasi: {id_lokasi: string, id_kejadian: string | undefined, kab: string; kec: string; desa: string; dusun: string; lat: string; long: string; }[] = []
  data.map((value) => {
      lokasi.push({
          id_lokasi: value?.id_lokasi,
          id_kejadian: kejadian?.id_kejadian,
          kab: value?.kab,
          kec: value?.kec,
          desa: value?.desa,
          dusun: value?.dusun,
          lat: value?.lat,
          long: value?.long
      })
  })

  let korban: {id_korban: string, id_kejadian: string | undefined, id_lokasi: string, meninggal: string; luka_luka: string; sakit: string; hilang: string; menderita_kk: string; menderita_jiwa: string; mengungsi_kk: string; mengungsi_jiwa: string; }[] = []
  data.map((value) => {
      korban.push({
        id_korban: value?.id_korban,
        id_kejadian: kejadian?.id_kejadian,
        id_lokasi: value?.id_lokasi,
        meninggal: value?.meninggal,
        luka_luka: value?.luka_luka,
        sakit: value?.sakit,
        hilang: value?.hilang,
        menderita_kk: value?.menderita_kk,
        menderita_jiwa: value?.menderita_jiwa,
        mengungsi_kk: value?.mengungsi_kk,
        mengungsi_jiwa: value?.mengungsi_jiwa
      })
  })

  let kerusakan: {id_kerusakan: string, id_kejadian: string | undefined, id_lokasi: string, rumah_terdampak: string; rm_rusak_ringan: string; rm_rusak_sedang: string; rm_rusak_berat: string; sarana_pendidikan: string; sarana_ibadah: string; sarana_kesehatan: string; perkantoran: string; bangunan_lain: string; jalan: string; jembatan: string; sawah: string; kebun: string; tambak: string; irigasi: string; }[] = []
  data.map((value) => {
      kerusakan.push({
        id_kerusakan: value?.id_kerusakan,
        id_kejadian: kejadian?.id_kejadian,
        id_lokasi: value?.id_lokasi,
        rumah_terdampak: value?.rumah_terdampak,
        rm_rusak_ringan: value?.rm_rusak_ringan,
        rm_rusak_sedang: value?.rm_rusak_sedang,
        rm_rusak_berat: value?.rm_rusak_berat,
        sarana_pendidikan: value?.sarana_pendidikan,
        sarana_ibadah: value?.sarana_ibadah,
        sarana_kesehatan: value?.sarana_kesehatan,
        perkantoran: value?.perkantoran,
        bangunan_lain: value?.bangunan_lain,
        jalan: value?.jalan,
        jembatan: value?.jembatan,
        sawah: value?.sawah,
        kebun: value?.kebun,
        tambak: value?.tambak,
        irigasi: value?.irigasi,
      })
  })

    const OnSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

      // terdampak
      const formData = new FormData();
      formData.append("id_user", kejadian.id_user);
      formData.append("id_jenis_kejadian", kejadian.id_jenis_kejadian);
      formData.append("kronologis", kejadian.kronologis);
      formData.append("tanggal", kejadian.tanggal);
      formData.append("jam", kejadian.jam);
      formData.append("titik_lokasi", kejadian.titik_lokasi);
      formData.append("file", fileLaporan);
      formData.append("status_ditangani", kejadian.status_ditangani);
      formData.append("verification", kejadian.verification);
      formData.append("ket", data[0]?.kab);


        try {
          await api.patchKejadian(id, formData)
          data.map((val) => {
            api.patchKorban(val?.id_korban, korban)
            api.patchKerusakan(val?.id_kerusakan, kerusakan)
            api.patchLokasi(val?.id_lokasi, lokasi)
          })
          Success()
        } catch (error) {
          Error()
        }

    }

    useEffect(() => {
      const ReloadJenis = async () => {
        const response = await api.fetchJenisKejadian();
        setJenisKejadian(response?.data);
      };
      ReloadJenis();
    }, []);
  
    useEffect(() => {
      const ReloadKejadian = async () => {
        const response = await api.fetchKejadianById(id);
        setKejadian(response?.data);
        setShow(response?.data?.file_laporan_akhir ? "Ya" : "Tidak")
        setFileLaporan(response?.data?.file_laporan_akhir)
      };
  
      ReloadKejadian();

      const ReloadKejadianTerdampak = async () => {
        const response = await api.fetchKejadianTerdampak(id);
        setData(response?.data);
      };
      ReloadKejadianTerdampak();
    }, [id]);

  return (
    <>
    <Breadcrumb pageName="Tambah Data Bencana" />

    <div className="flex flex-col gap-9">
      {/* <!-- Contact Form --> */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
          📌 Kejadian Bencana
          </h3>
        </div>

        <form onSubmit={OnSubmit}>
          <div className="p-6.5">

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

              <div className="w-full xl:w-1/4">
                <label className="mb-2.5 block text-black dark:text-white">
                  Jenis Bencana
                </label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select onChange={(e) => setKejadian({ ...kejadian, id_jenis_kejadian: e.target.value })} className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                  <option value={kejadian?.id_jenis_kejadian}>-- {kejadian?.jenis_kejadian?.nama} --</option>
                    {jenisKejadian?.map((item) => (
                      <>
                        <option key={item?.id} value={item?.id}>{item?.nama}</option>
                      </>
                    ))}
                  </select>
                  <Icon
                    icon="mingcute:down-line"
                    className="absolute top-1/2 right-4 z-30 -translate-y-1/2 fill-current w-5 h-5"
                  />
                </div>
              </div>

              <div className="w-full xl:w-1/4">
                <label className="mb-2.5 block text-black dark:text-white">
                  Tanggal Kejadian
                </label>
                <input
                  type="date"
                  value={kejadian?.tanggal}
                  onChange={(e) => setKejadian({ ...kejadian, tanggal: e.target.value })}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/4">
                <label className="mb-2.5 block text-black dark:text-white">
                  Waktu Kejadian
                </label>
                <input
                  type="time"
                  value={kejadian?.jam}
                  onChange={(e) => setKejadian({ ...kejadian, jam: e.target.value })}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/4">
                <label className="mb-2.5 block text-black dark:text-white">
                  Titik Lokasi
                </label>
                <input
                  type="text"
                  value={kejadian?.titik_lokasi}
                  onChange={(e) => setKejadian({ ...kejadian, titik_lokasi: e.target.value })}
                  placeholder="Masukkan titik lokasi"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-4/4">
                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Kronologis
                  </label>
                  <textarea
                    rows={4}
                    value={kejadian?.kronologis}
                    onChange={(e) => setKejadian({ ...kejadian, kronologis: e.target.value })}
                    placeholder="Kronologis Kejadian"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  ></textarea>
                </div>
              </div>
            </div>

            <div  className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/4">
                <h3 className="text-black dark:text-white">Apakah Sudah Turun Lapangan ?</h3>
              </div>
              <div className="w-full xl:w-1/4 flex flex-col gap-10 xl:flex-row">
                  <RadioButtonTrue id="lapanganTrue" name="show" onChange={(e: { target: { value: SetStateAction<string>; }; }) => setShow(e.target.value)} isChecked={show === "Ya" ? true : false}/>
                  <RadioButtonFalse id="lapanganFalse" name="show" onChange={(e: { target: { value: SetStateAction<string>; }; }) => setShow(e.target.value)} isChecked={show === "Tidak" ? true : false}/>
                </div>
            </div>

                {show === "Ya" && (
                  <div
                    id="FileUpload"
                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                  >
                    <input
                      type="file"
                      onChange={(event) => loadImage(event)}
                      accept=".pdf"
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                    />
                    <div className="flex flex-col items-center justify-center space-y-1">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                            fill="#3C50E0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                            fill="#3C50E0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                            fill="#3C50E0"
                          />
                        </svg>
                      </span>
                      <p>
                        <span className="text-primary">Click to upload</span> or
                        drag and drop
                      </p>
                      {fileLaporan ? (
                          <p>{fileLaporan?.name ? fileLaporan?.name : fileLaporan }</p>
                      ) : (
                        <>
                          <p className="mt-1.5">PDF</p>
                          <p>(max, 5 mb)</p>
                        </>
                      )}
                    </div>
                  </div>
                )}

            <div className="mb-10 flex flex-col gap-6 xl:flex-row ">
              <div className="w-full xl:w-1/4">
                <h3 className="text-black dark:text-white">Apakah Sudah Status Ditangani ?</h3>
              </div>
              <div className="w-full xl:w-1/4 flex flex-col gap-10 xl:flex-row">
                  <RadioButtonTrue id="ditanganiTrue" name="status_ditangani" onChange={(e: { target: { value: any; }; }) => setKejadian({ ...kejadian, status_ditangani: e.target.value })} isChecked={kejadian?.status_ditangani === 'Ya' ? true : false}/>
                  <RadioButtonFalse id="ditanganiFalse" name="status_ditangani" onChange={(e: { target: { value: any; }; }) => setKejadian({ ...kejadian, status_ditangani: e.target.value })} isChecked={kejadian?.status_ditangani === 'Tidak' ? true : false}/>
                </div>
            </div>


            <div className="flex border-y border-stroke py-5 font-medium text-black dark:text-white dark:border-strokedark mt-5">
                📌 Terdampak
              </div>

            {data.map((value: any, _index: any) => (
              <Fragment key={_index}>
                {_index !== 0 && (
                  <div className="flex w-full justify-end my-2">
                    <button onClick={(event) => MinusParentTerdampak(event, _index)} className="flex w-full sm:w-1/6 justify-center rounded border border-gray-200 px-1 py-1 text-base text-gray-200">
                      Hapus
                    </button>
                  </div>
                )}

                {/* LOKASI */}
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row py-3">
                <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Kabupaten
                    </label>
                    <SelectKabupaten value={value?.kab} onChange={(event: any) => handleChangeInput(_index, event)}/>
                  </div>
                  

                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Kecamatan
                    </label>
                    <SelectKecamatan value={value?.kec} current={value?.kab} onChange={(event: any) => handleChangeInput(_index, event)}/>

                  </div>


                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Desa/Kelurahan
                    </label>
                    <SelectKelurahan value={value?.desa} current={value?.kec} onChange={(event: any) => handleChangeInput(_index, event)}/>
                  </div>

                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Dusun
                    </label>
                    <input
                      type="text"
                      name="dusun"
                      value={value?.dusun}
                      onChange={event => handleChangeInput(_index, event)}
                      placeholder="Dusun"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Latitude
                    </label>
                    <input
                      type="text"
                      name="lat"
                      value={value?.lat}
                      onChange={event => handleChangeInput(_index, event)}
                      placeholder="Lat"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Longitude
                    </label>
                    <input
                      type="text"
                      name="long"
                      value={value?.long}
                      onChange={event => handleChangeInput(_index, event)}
                      placeholder="Long"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                </div>

                {/* KORBAN */}
                <div className="mb-4.5 flex flex-col gap-3 xl:flex-row bg-gray-2 py-3 px-3 dark:bg-[#1f2937]">
                  <div className="w-full flex-none md:w-2/12 flex justify-center items-center">
                    <label className="mb-2.5 flex font-bold text-black dark:text-white">
                      Korban
                    </label>
                  </div>
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-3">
                    <div className="w-full md:w-[11%] flex-none">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Meninggal
                      </label>
                      <input
                        type="text"
                        name="meninggal"
                        value={value?.meninggal}
                        onChange={event => handleChangeInput(_index, event)}
                        placeholder="Jiwa"
                        className="w-full rounded border-[1.5px] border-stroke py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full md:w-[11%] flex-none">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Luka-luka
                      </label>
                      <input
                        type="text"
                        name="luka_luka"
                        value={value?.luka_luka}
                        onChange={event => handleChangeInput(_index, event)}
                        placeholder="Jiwa"
                        className="w-full rounded border-[1.5px] border-stroke py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full md:w-[11%] flex-none">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Sakit
                      </label>
                      <input
                        type="text"
                        name="sakit"
                        value={value?.sakit}
                        onChange={event => handleChangeInput(_index, event)}
                        placeholder="Jiwa"
                        className="w-full rounded border-[1.5px] border-stroke py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full md:w-[11%] flex-none">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Hilang
                      </label>
                      <input
                        type="text"
                        name="hilang"
                        value={value?.hilang}
                        onChange={event => handleChangeInput(_index, event)}
                        placeholder="Jiwa"
                        className="w-full rounded border-[1.5px] border-stroke py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full md:w-[11%] flex-none">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Menderita
                      </label>
                      <input
                        type="text"
                        name="menderita_kk"
                        value={value?.menderita_kk}
                        onChange={event => handleChangeInput(_index, event)}
                        placeholder="KK"
                        className="w-full rounded border-[1.5px] border-stroke py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full md:w-[11%] flex-none">
                      <label className="mb-2.5 block invisible hidden md:inline-flex text-black dark:text-white">
                        .
                      </label>
                      <input
                        type="text"
                        name="menderita_jiwa"
                        value={value?.menderita_jiwa}
                        onChange={event => handleChangeInput(_index, event)}
                        placeholder="Jiwa"
                        className="w-full rounded border-[1.5px] border-stroke py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full md:w-[11%] flex-none">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Mengungsi
                      </label>
                      <input
                        type="text"
                        name="mengungsi_kk"
                        value={value?.mengungsi_kk}
                        onChange={event => handleChangeInput(_index, event)}
                        placeholder="KK"
                        className="w-full rounded border-[1.5px] border-stroke py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full md:w-[11%] flex-none">
                      <label className="mb-2.5 block invisible hidden md:inline-flex text-black dark:text-white">
                        .
                      </label>
                      <input
                        type="text"
                        name="mengungsi_jiwa"
                        value={value?.mengungsi_jiwa}
                        onChange={event => handleChangeInput(_index, event)}
                        placeholder="Jiwa"
                        className="w-full rounded border-[1.5px] border-stroke py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* KERUSAKAN */}
                <div className="mb-4.5 flex flex-col gap-3 xl:flex-row bg-gray-2 py-3 px-3 dark:bg-[#1f2937]">
                  <div className="w-full flex-none md:w-2/12 flex justify-center items-center">
                    <label className="mb-2.5 flex font-bold text-black dark:text-white">
                      Pemukiman
                    </label>
                  </div>
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-3">
                    <div className="w-full md:w-[18%] flex-none">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Rumah Terdampak
                      </label>
                      <input
                        type="text"
                        name="rumah_terdampak"
                        value={value?.rumah_terdampak}
                        onChange={event => handleChangeInput(_index, event)}
                        placeholder="KK"
                        className="w-full rounded border-[1.5px] border-stroke py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full md:w-[18%] flex-none">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Rusak Ringan
                      </label>
                      <input
                        type="text"
                        name="rm_rusak_ringan"
                        value={value?.rm_rusak_ringan}
                        onChange={event => handleChangeInput(_index, event)}
                        placeholder="Unit"
                        className="w-full rounded border-[1.5px] border-stroke py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full md:w-[18%] flex-none">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Rusak Sedang
                      </label>
                      <input
                        type="text"
                        name="rm_rusak_sedang"
                        value={value?.rm_rusak_sedang}
                        onChange={event => handleChangeInput(_index, event)}
                        placeholder="Unit"
                        className="w-full rounded border-[1.5px] border-stroke py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full md:w-[18%] flex-none">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Rusak Berat
                      </label>
                      <input
                        type="text"
                        name="rm_rusak_berat"
                        value={value?.rm_rusak_berat}
                        onChange={event => handleChangeInput(_index, event)}
                        placeholder="Unit"
                        className="w-full rounded border-[1.5px] border-stroke py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-3 xl:flex-row bg-gray-2 py-3 px-3 dark:bg-[#1f2937]">
                  <div className="w-full flex-none md:w-2/12 flex justify-center items-center">
                    <label className="mb-2.5 flex font-bold text-black dark:text-white">
                      Fasilitas Umum
                    </label>
                  </div>
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-3">
                    <div className="w-full md:w-[18%] flex-none">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Sarana Pendidikan
                      </label>
                      <input
                        type="text"
                        name="sarana_pendidikan"
                        value={value?.sarana_pendidikan}
                        onChange={event => handleChangeInput(_index, event)}
                        placeholder="Unit"
                        className="w-full rounded border-[1.5px] border-stroke py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full md:w-[18%] flex-none">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Sarana Ibadah
                      </label>
                      <input
                        type="text"
                        name="sarana_ibadah"
                        value={value?.sarana_ibadah}
                        onChange={event => handleChangeInput(_index, event)}
                        placeholder="Unit"
                        className="w-full rounded border-[1.5px] border-stroke py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full md:w-[18%] flex-none">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Sarana Kesehatan
                      </label>
                      <input
                        type="text"
                        name="sarana_kesehatan"
                        value={value?.sarana_kesehatan}
                        onChange={event => handleChangeInput(_index, event)}
                        placeholder="Unit"
                        className="w-full rounded border-[1.5px] border-stroke py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full md:w-[18%] flex-none">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Perkantoran
                      </label>
                      <input
                        type="text"
                        name="perkantoran"
                        value={value?.perkantoran}
                        onChange={event => handleChangeInput(_index, event)}
                        placeholder="Unit"
                        className="w-full rounded border-[1.5px] border-stroke py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full md:w-[18%] flex-none">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Bangunan Lain
                      </label>
                      <input
                        type="text"
                        name="bangunan_lain"
                        value={value?.bangunan_lain}
                        onChange={event => handleChangeInput(_index, event)}
                        placeholder="Unit"
                        className="w-full rounded border-[1.5px] border-stroke py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-3 xl:flex-row bg-gray-2 py-3 px-3 dark:bg-[#1f2937]">
                  <div className="w-full flex-none md:w-2/12 flex justify-center items-center">
                    <label className="mb-2.5 flex font-bold text-black dark:text-white">
                      Sarpras Vital
                    </label>
                  </div>
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-3">
                    <div className="w-full md:w-[18%] flex-none">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Jembatan
                      </label>
                      <input
                        type="text"
                        name="jembatan"
                        value={value?.jembatan}
                        onChange={event => handleChangeInput(_index, event)}
                        placeholder="m"
                        className="w-full rounded border-[1.5px] border-stroke py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full md:w-[18%] flex-none">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Jalan
                      </label>
                      <input
                        type="text"
                        name="jalan"
                        value={value?.jalan}
                        onChange={event => handleChangeInput(_index, event)}
                        placeholder="m"
                        className="w-full rounded border-[1.5px] border-stroke py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-3 xl:flex-row bg-gray-2 py-3 px-3 dark:bg-[#1f2937]">
                  <div className="w-full flex-none md:w-2/12 flex justify-center items-center">
                    <label className="mb-2.5 flex font-bold text-black dark:text-white">
                      Ekonomi
                    </label>
                  </div>
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-3">
                    <div className="w-full md:w-[18%] flex-none">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Sawah
                      </label>
                      <input
                        type="text"
                        name="sawah"
                        value={value?.sawah}
                        onChange={event => handleChangeInput(_index, event)}
                        placeholder="Ha"
                        className="w-full rounded border-[1.5px] border-stroke py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full md:w-[18%] flex-none">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Kebun/Hutan
                      </label>
                      <input
                        type="text"
                        name="kebun"
                        value={value?.kebun}
                        onChange={event => handleChangeInput(_index, event)}
                        placeholder="Ha"
                        className="w-full rounded border-[1.5px] border-stroke py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full md:w-[18%] flex-none">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Kolam/Tambak
                      </label>
                      <input
                        type="text"
                        name="tambak"
                        value={value?.tambak}
                        onChange={event => handleChangeInput(_index, event)}
                        placeholder="Ha"
                        className="w-full rounded border-[1.5px] border-stroke py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full md:w-[18%] flex-none">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Irigasi
                      </label>
                      <input
                        type="text"
                        name="irigasi"
                        value={value?.irigasi}
                        onChange={event => handleChangeInput(_index, event)}
                        placeholder="m"
                        className="w-full rounded border-[1.5px] border-stroke py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
                <hr/>
              </Fragment>
            ))}

              <div className="flex w-full justify-end my-7">
                <button onClick={AddParentTerdampak} className="flex w-full md:w-2/6 justify-center rounded border border-gray-200 px-16 py-3 font-medium text-gray-200">
                  Tambah Terdampak
                  <Icon icon="icons8:plus" className="text-2xl ml-2" />
                </button>
              </div>


            <div className="flex w-full justify-end my-7 gap-3">
              <NavLink  to="/data-bencana" className="flex w-full md:w-3/12 justify-center rounded border border-primary px-16 py-3 font-medium text-primary">
                Kembali
              </NavLink>
              <button type='submit' className="flex w-full md:w-3/12 justify-center rounded border border-gray-200 px-16 py-3 bg-primary p-3 font-medium text-gray">
                Simpan
              </button>
            </div>
          </div>
        </form>



      </div>
    </div>
  </>
  )
}
