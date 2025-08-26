import { useEffect, useState } from 'react';
import { PaperClipIcon } from '@heroicons/react/24/outline';
import { Link, useParams } from 'react-router-dom';
import * as api from '../../../utils/Api';
import ViewKabupaten from '../../../components/Module/ViewKabupaten';

const DetailDataBencanaPage = () => {
  const[kejadian, setKejadian] = useState<any>()
  const[korban, setKorban] = useState<Array<any>>([])
  const[kerusakan, setKerusakan] = useState<Array<any>>([])
  const[dokumntasi, setDokumentasi] = useState<Array<any>>([])

  const {id} = useParams()


  useEffect(() => {
    const Kejadian = async () => {
      const response = await api.fetchKejadianById(id);
      setKejadian(response.data);
    };
    Kejadian();

    const Korban = async () => {
      const response = await api.fetchKorbanByIdLokasi(id);
      setKorban(response.data);
    };
    Korban();

    const Kerusakan = async () => {
      const response = await api.fetchKerusakanByIdLokasi(id);
      setKerusakan(response.data);
    };
    Kerusakan();

    const Dokumentasi = async () => {
      const response = await api.fetchDokumentasiByIdKejadian(id);
      setDokumentasi(response.data);
    };
    Dokumentasi();
  }, [id])

  let list_korban: { label: string; value: any; value1: any; }[] = []
  korban.map((val: { meninggal: any; hilang: any; sakit: any; luka_luka: any; menderita_jiwa: any; menderita_kk: any; mengungsi_jiwa: any; mengungsi_kk: any; }) => (
    list_korban.push(
    {
      'label' : "Meninggal",
      'value' : val?.meninggal,
      'value1' : ""
    },
    {
      'label' : "Hilang",
      'value' : val?.hilang,
      'value1' : ""
    },
    {
      'label' : "Sakit",
      'value' : val?.sakit,
      'value1' : ""
    },
    {
      'label' : "Luka-luka",
      'value' : val?.luka_luka,
      'value1' : ""
    },
    {
      'label' : "Menderita",
      'value' : val?.menderita_jiwa,
      'value1' : val?.menderita_kk
    },
    {
      'label' : "Mengungsi",
      'value' : val?.mengungsi_jiwa,
      'value1' : val?.mengungsi_kk
    },
    
  )
  ))

  let pemukiman: { label: string; value: any; }[] = []
  kerusakan.map((val: { rm_rusak_berat: any; rm_rusak_sedang: any; rm_rusak_ringan: any; rumah_terdampak: any; }) => (
    pemukiman.push(
      {
        'label' : "Rumah Rusak Berat",
        'value' : val?.rm_rusak_berat,
      },
      {
        'label' : "Rumah Rusak Sedang",
        'value' : val?.rm_rusak_sedang,
      },
      {
        'label' : "Rumah Rusak Ringan",
        'value' : val?.rm_rusak_ringan,
      },
      {
        'label' : "Rumah Terdampak",
        'value' : val?.rumah_terdampak,
      }
    )
  ))

  let fasilitas: { label: string; value: any; }[] = []
  kerusakan.map((val: { sarana_pendidikan: any; sarana_ibadah: any; sarana_kesehatan: any; perkantoran: any; bangunan_lain: any; }) => (
    fasilitas.push(
      {
        'label' : "Sarana Pendidikan",
        'value' : val?.sarana_pendidikan,
      },
      {
        'label' : "Sarana Ibadah",
        'value' : val?.sarana_ibadah,
      },
      {
        'label' : "Sarana Kesehatan",
        'value' : val?.sarana_kesehatan,
      },
      {
        'label' : "Perkantoran",
        'value' : val?.perkantoran,
      },
      {
        'label' : "Bangunan Lain",
        'value' : val?.bangunan_lain,
      }
    )
  ))

  let sarpras: { label: string; value: any; }[] = []
  kerusakan.map((val: { jembatan: any; jalan: any; }) => (
    sarpras.push(
      {
        'label' : "Jembatan",
        'value' : val?.jembatan,
      },
      {
        'label' : "Jalan",
        'value' : val?.jalan,
      }
    )
  ))

  let ekonomi: { label: string; value: any; }[] = []
  kerusakan.map((val: { sawah: any; kebun: any; tambak: any; irigasi: any; }) => (
    ekonomi.push(
      {
        'label' : "Sawah",
        'value' : val?.sawah,
      },
      {
        'label' : "Kebun",
        'value' : val?.kebun,
      },
      {
        'label' : "Kolam",
        'value' : val?.tambak,
      },
      {
        'label' : "Irigasi",
        'value' : val?.irigasi,
      }
    )
  ))


  console.log('====================================');
  console.log(list_korban);
  console.log('====================================');

  return (
    <>
      <div className="flex flex-col gap-9">
        {/* <!-- Contact Form --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex border-b border-gray-100 justify-between py-4 px-6.5 dark:border-gray-100 mb-5">
            <h1 className="font-bold text-xl text-black dark:text-white">
            {kejadian?.jenis_kejadian?.nama?.toUpperCase()} ✅
            </h1>
            <p className="inline-flex bg-primary bg-opacity-10 py-2 px-4 text-sm font-bold text-primary rounded border border-primary">Verification</p>
          </div>

          <div className="py-4 px-6.5">
            <h3 className="font-medium text-black dark:text-white">
              📌 Kejadian Bencana
            </h3>
          </div>

          <div className="px-10">
              <dl className="divide-gray-100">
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Jenis Bencana</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{kejadian?.jenis_kejadian?.nama}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Tanggal & Jam Kejadian</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{kejadian?.tanggal} | {kejadian?.jam} WITA</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Alamat</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <ViewKabupaten
                        kab={true}
                        kec={true}
                        id_kejadian={id}
                     />
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Titik Lokasi</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{kejadian?.titik_lokasi}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Status Tindak Lanjut</dt>
                  {kejadian?.status_ditangani === "Ya" ? (
                    <p className="bg-success bg-opacity-10 py-2 px-4 text-sm font-bold text-success w-50 text-center rounded border border-success">Sudah Tertangani</p>
                  ) : (
                    <p className="bg-danger bg-opacity-10 py-2 px-4 text-sm font-bold text-danger w-50 text-center rounded border border-danger">Belum Tertangani</p>
                  )}
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Kronologis</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{kejadian?.kronologis}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Laporan Asessment</dt>
                  <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                      <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                        <div className="flex w-0 flex-1 items-center">
                          <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                          <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          {kejadian?.file_laporan_akhir !== "" ? (
                            <span className="truncate font-medium">{kejadian?.file_laporan_akhir}</span>
                          ) : (
                            <span className="truncate font-medium">Data Tidak Ada</span>
                          )}
                          </div>
                        </div>
                        {kejadian?.file_laporan_akhir !== "" && (
                          <div className="ml-4 flex-shrink-0">
                            <Link to={kejadian?.url} className="font-medium text-indigo-600 hover:text-indigo-500">
                              Download
                            </Link>
                          </div>
                        )}

                      </li>
                    </ul>
                  </dd>
                </div>
              </dl>
          </div>


          <div className="py-4 px-6.5">
            <h3 className="font-medium text-black dark:text-white">
              📌 Terdampak
            </h3>
          </div>

          <div className="px-10 flex flex-col gap-6 xl:flex-row" >

            <div className="w-full overflow-x-auto rounded-md shadow-default  border border-gray-100">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="w-auto py-4 px-4 font-semibold text-black dark:text-white">
                      Korban
                    </th>
                    <th className="w-auto py-4 px-4 font-semibold text-black dark:text-white">
                      Jiwa
                    </th>
                    <th className="w-auto py-4 px-4 font-semibold text-black dark:text-white">
                      KK
                    </th>
                  </tr>
                </thead>
                <tbody>

                  {list_korban.map((val, index) => (
                    <tr key={index}>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {val?.label}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                        {val?.value}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {val?.value1}
                        </p>
                      </td>
                    </tr>
                  ))}


                    
                </tbody>
              </table>
            </div>

            <div className="w-full overflow-x-auto rounded-md shadow-default  border border-gray-100">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="w-auto py-4 px-4 font-semibold text-black dark:text-white">
                      Pemukiman
                    </th>
                    <th className="w-auto py-4 px-4 font-semibold text-black dark:text-white">
                      Unit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pemukiman.map((val, index) => (
                    <tr key={index}>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {val?.label}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {val?.value}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="w-full overflow-x-auto rounded-md shadow-default  border border-gray-100">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="w-auto py-4 px-4 font-semibold text-black dark:text-white">
                      Fasilitas Umum
                    </th>
                    <th className="w-auto py-4 px-4 font-semibold text-black dark:text-white">
                      Unit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {fasilitas.map((val, index) => (
                    <tr key={index}>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {val?.label}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                        {val?.value}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="w-full overflow-x-auto rounded-md shadow-default  border border-gray-100">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="w-auto py-4 px-4 font-semibold text-black dark:text-white">
                      Sarpras Vital
                    </th>
                    <th className="w-auto py-4 px-4 font-semibold text-black dark:text-white">
                      Unit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sarpras.map((val, index) => (
                    <tr key={index}>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {val?.label}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {val?.value}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="w-full overflow-x-auto rounded-md shadow-default  border border-gray-100">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="w-auto py-4 px-4 font-semibold text-black dark:text-white">
                      Ekonomi
                    </th>
                    <th className="w-auto py-4 px-4 font-semibold text-black dark:text-white">
                      Unit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ekonomi.map((val, index) => (
                    <tr key={index}>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {val?.label}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {val?.value}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
          </div>



          <div className="py-6 px-6.5">
            <h3 className="font-medium text-black dark:text-white">
              📌 Dokumentasi
            </h3>
          </div>

          <div className="px-10 mb-10">
            <div className="flex flex-col">
              <div className="flex overflow-x-scroll gap-2 w-full no-scrollbar">
                {dokumntasi.map((val) => {
                  return (
                    <div className="flex flex-col min-w-60 shadow-default  border border-gray-100 rounded-md p-2 bg-white shadow-default dark:bg-boxdark" >
                      <div
                        className="flex w-full mb-2 h-[150px] bg-cover relative rounded-md"
                        style={{ backgroundImage: `url(${val?.url})` }}
                      ></div>
                      <div className="flex flex-col gap-2">
                        <label className="font-medium text-black dark:text-white line-clamp-2">
                          {val?.jenis_file}
                        </label>
                        <p className="line-clamp-4 font-light text-sm">{val?.keterangan}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>


          

        </div>
      </div>
    </>
  );
};

export default DetailDataBencanaPage;
