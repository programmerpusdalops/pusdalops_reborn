import { useEffect, useState } from 'react';
import { PaperClipIcon } from '@heroicons/react/24/outline';
import { Link, useParams } from 'react-router-dom';
import * as api from '../../../utils/Api';
import ViewKabupaten from '../../../components/Module/ViewKabupaten';
import TableTerdampak from '../../../components/Module/TableTerdampak';
import Swal from 'sweetalert2';
import { Error, Success } from '../../../utils/Alerts';
import { Icon } from '@iconify/react';
import { FaRegTrashAlt } from 'react-icons/fa';

const DetailDataBencanaPage = () => {
  const[kejadian, setKejadian] = useState<any>()
  const[lokasi, setLokasi] = useState<Array<any>>([])
  const[dokumentasi, setDokumentasi] = useState<Array<any>>([])
  
  const {id} : any = useParams()

  const[file, setFile] = useState<any>("")
  const[form, setForm] = useState({
    id_kejadian: id,
    keterangan: "",
    jenis_file: ""
  })

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
    setFile(image);
  };

  const OnSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const formData = new FormData();
      formData.append("id_kejadian", id);
      formData.append("keterangan", form?.keterangan);
      formData.append("jenis_file", form?.jenis_file);
      formData.append("dokumentasi", file);

    try {
      await api.postOneDokumentasi(formData)
      Success()
      Dokumentasi()
    } catch (error) {
      Error()
    }
  }

  const OnDelete = async (id: any) => {
    try {
      await api.deleteDokumentasi(id)
      Success()
      Dokumentasi()
    } catch (error) {
      Error()
    }
  }

  const Dokumentasi = async () => {
    const response = await api.fetchDokumentasiByIdKejadian(id);
    setDokumentasi(response.data);
  };

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

                {dokumentasi.map((val) => {
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
                      <div className="flex justify-end gap-4.5" style={{marginBottom: 0}}>
                        <button onClick={() => OnDelete(val?.id_dokumentasi)} className="justify-center font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white" type="button">
                        <FaRegTrashAlt />
                        </button>
                      </div>
                    </div>
                  );
                })}

                <div className="flex flex-col min-w-60 shadow-default  border border-gray-100 rounded-md p-2 bg-white shadow-default dark:bg-boxdark">
                  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="p-7">
                      <form onSubmit={OnSubmit}>
                        <div
                          id="FileUpload"
                          className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                        >
                          <input
                            type="file"
                            onChange={(event) => loadImage(event)}
                            accept="image/*"
                            className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                          />
                          <div className="flex flex-col items-center justify-center space-y-3">
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
                            {file ? (
                              <p className="mt-1.5">{file?.name}</p>
                            ) : (
                              <>
                              <p className="mt-1.5">PNG, JPG or JPEG</p>
                              <p>(max, 5 mb)</p>
                              </>
                            )}
                          </div>
                        </div>

                        {file && (
                        <>
                          <div className="relative z-20 bg-transparent dark:bg-form-input">
                            <select name="jenis_file" onChange={(e) => setForm({ ...form, jenis_file: e.target.value })} className="mb-3 relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                              <option value="">-- Jenis File --</option>
                              <option value="Kordinasi">Kordinasi</option>
                              <option value="Titik Ancaman">Titik Ancaman</option>
                              <option value="Titik Jebolan">Titik Jebolan</option>
                              <option value="Titik Luapan">Titik Luapan</option>
                              <option value="Infografis">Infografis</option>
                              <option value="Lainnya">Lainnya</option>
                            </select>
                            <Icon
                              icon="mingcute:down-line"
                              className="absolute top-1/2 right-4 z-30 -translate-y-1/2 fill-current w-5 h-5"
                            />
                          </div>

                          <div>
                            <input
                              type="text"
                              name="keterangan"
                              onChange={(e) => setForm({ ...form, keterangan: e.target.value })}
                              placeholder="Keterangan"
                              className="mb-3 w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:border-form-strokedark"
                            />
                          </div>

                          <div className="flex justify-end gap-4.5">
                            <button
                              onClick={() => setFile("")}
                              className="justify-center font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                              type="reset"
                            >
                              Batal
                            </button>
                            <button
                              className="justify-center font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                              type="submit"
                            >
                              Simpan
                            </button>
                          </div>
                        </>
                        )}


                      </form>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>


          

        </div>
      </div>
    </>
  );
};

export default DetailDataBencanaPage;
