import { useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumb'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import RadioButtonTrue from '../../../components/Module/RadioButtonTrue';
// import RadioButtonFalse from '../../../components/Module/RadioButtonFalse';
import Swal from 'sweetalert2';
import * as api from '../../../utils/Api';
import { Error, Success } from '../../../utils/Alerts';


export default function TambahTipsPage() {
  const[file, setFile] = useState("")
  const [item, setItem] = useState({
    judul: "",
    kategori: "",
    tanggal: "",
    penulis: "",
    status: "Ya",
    content: ""
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
      formData.append("judul", item?.judul);
    //   formData.append("kategori", item?.kategori);
    //   formData.append("tanggal", item?.tanggal);
      formData.append("penulis", item?.penulis);
    //   formData.append("status", item?.status);
    //   formData.append("content", item?.content);
      formData.append("file", file);

      try {
        await api.postBerita(formData)
        Success()
      } catch (error) {
        Error()
      }
    
  }

  return (
    <>
    <Breadcrumb pageName="Tambah Tips Bencana" />

    <div className="flex flex-col gap-10">
        {/* <!-- Tambah Data --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Tambah Data
            </h3>
          </div>
          <form onSubmit={OnSubmit}>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div className="flex flex-col md:flex-row w-full gap-3">
                <div className="flex flex-col md:w-1/2">
                  <label className="mb-3 block text-black dark:text-white">
                    Judul
                  </label>
                  <input
                    type="text"
                    name="judul"
                    onChange={(e) => setItem({ ...item, judul: e.target.value })}
                    placeholder="Penulis"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:border-form-strokedark"
                  />
                </div>
              </div>
              
                {/* <div className="flex flex-col md:w-1/2">
                  <label className="mb-3 block text-black dark:text-white">
                    Kategori
                  </label>
                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <select
                      name="kategori"
                      onChange={(e) => setItem({ ...item, kategori: e.target.value })}
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                    >
                      <option value="terbaru">--Pilih Kategori--</option>
                      <option value="terbaru">terbaru</option>
                      <option value="favorit">favorit</option>
                      <option value="rekomendasi">rekomendasi</option>
                    </select>
                    <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill="#637381"
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div> */}
              {/* <div className="flex flex-col md:flex-row w-full gap-3">
                <div className="flex flex-col md:w-1/2">
                  <label className="mb-3 block text-black dark:text-white">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    name="tanggal"
                    onChange={(e) => setItem({ ...item, tanggal: e.target.value })}
                    placeholder="Tanggal"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:border-form-strokedark"
                  />
                </div>
              </div> */}
              <div className="flex flex-col md:flex-row w-full gap-3">
                <div className="flex flex-col md:w-1/2">
                  <label className="mb-3 block text-black dark:text-white">
                    Penulis
                  </label>
                  <input
                    type="text"
                    name="penulis"
                    onChange={(e) => setItem({ ...item, penulis: e.target.value })}
                    placeholder="Penulis"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:border-form-strokedark"
                  />
                </div>
              </div>
              

              <div className="flex flex-col md:flex-row w-full gap-3">
                <div className="flex flex-col md:w-1/2">
                  <label className="mb-3 block text-black dark:text-white">
                    Unggah Dokumen
                  </label>
                  <input
                    type="file"
                    accept='.png, .jpg, .jpeg'
                    onChange={(event) => loadImage(event)}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              {/* <div  className="mb-4.5 flex flex-col gap-6 xl:flex-row mt-5">
                <div className="w-full xl:w-1/4">
                  <h3 className="text-black dark:text-white">Status Berita?</h3>
                </div>
                <div className="w-full xl:w-4/4 flex flex-col gap-10 xl:flex-row">
                  <RadioButtonTrue id="statusTrue" name="status" onChange={(e: { target: { value: any; }; }) => setItem({ ...item, status: e.target.value })} isChecked={item?.status === "Ya" ? true : false}/>
                  <RadioButtonFalse id="statusFalse" name="status" onChange={(e: { target: { value: any; }; }) => setItem({ ...item, status: e.target.value })} isChecked={item?.status === "Tidak" ? true : false}/>
                </div>
              </div> */}

              <div>
                <ReactQuill
                  theme="snow"
                  onChange={(event) => setItem({ ...item, content: event })}
                  className="h-100 w-full mb-10 rounded-lg bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input"
                />
              
              </div>
              <div className="flex gap-3 justify-end">
                <button type='reset' className="px-5 py-2 border border-primary rounded-md text-primary hover:text-button-primary hover:border-button-primary dark:text-bodydark dark:border-form-strokedark dark:hover:text-white dark:hover:border-white dark:hover:bg-transparent">
                  Kosongkan
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary rounded-md text-white  hover:bg-button-primary dark:bg-body dark:hover:bg-graydark"
                >
                  Simpan
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* Table */}

    </div>
  </>
  )
}
