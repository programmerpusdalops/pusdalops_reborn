import { useEffect, useState } from 'react';
import { PaperClipIcon } from '@heroicons/react/24/outline';
import { Link, useParams } from 'react-router-dom';
import * as api from '../../../utils/Api';
import ViewKabupaten from '../../../components/Module/ViewKabupaten';
import TableTerdampak from '../../../components/Module/TableTerdampak';

const DetailDataBencanaPage = () => {
  const[kejadian, setKejadian] = useState<any>()
  const[lokasi, setLokasi] = useState<Array<any>>([])
  const[dokumntasi, setDokumentasi] = useState<Array<any>>([])

  const {id} = useParams()


  useEffect(() => {
    const Kejadian = async () => {
      const response = await api.fetchKejadianById(id);
      setKejadian(response.data);
    };
    Kejadian();

    const Lokasi = async () => {
      const response = await api.fetchLokasiByIdKejadian(id);
      setLokasi(response.data);
    };
    Lokasi();

    const Dokumentasi = async () => {
      const response = await api.fetchDokumentasiByIdKejadian(id);
      setDokumentasi(response.data);
    };
    Dokumentasi();
  }, [id])

  return (
    <>
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex border-b border-gray-100 justify-between py-4 px-6.5 dark:border-gray-100 mb-5">
            <h1 className="font-bold text-xl text-black dark:text-white">
            {kejadian?.jenis_kejadian?.nama?.toUpperCase()} ✅
            </h1>
            <div>
              🇮🇩
            </div>
            {/* <p className="inline-flex bg-primary bg-opacity-10 py-2 px-4 text-sm font-bold text-primary rounded border border-primary">Verification</p> */}
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
                  <dt className="text-sm font-medium leading-6 text-gray-900">Kabupaten</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <ViewKabupaten
                        kab={true}
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
                            <Link to={kejadian?.url} target="_blank" className="font-medium text-indigo-600 hover:text-indigo-500">
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

          {lokasi.map((val) => (
            <div key={val?.id_lokasi} className="py-5 px-10">
              <h4 className="border-l-2 border-l-meta-1 px-5 mb-5 font-medium text-black dark:text-white">
              Kecamatan {val?.kecamatan?.name}, Desa {val?.kelurahan?.name}
              </h4>
              <TableTerdampak id_lokasi={val?.id_lokasi}/>
            </div>
          ))}



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
                    <div key={val?.id_dokumentasi} className="flex flex-col min-w-60 shadow-default  border border-gray-100 rounded-md p-2 bg-white shadow-default dark:bg-boxdark" >
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
