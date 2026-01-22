import { useEffect, useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumb'
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2';
import * as api from '../../../utils/Api';
import { Error, Success } from '../../../utils/Alerts';
import { useParams } from 'react-router-dom';


export default function TambahTipsPage() {
  const[file, setFile] = useState("")
  const [item, setItem] = useState({
    judul: "",
  })

  const { id } = useParams()

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
    // Ambil tahun saat ini
      const tahunSekarang = new Date().getFullYear().toString();
      formData.append("tahun", tahunSekarang);
      formData.append("file", file);

      console.log(...formData);

      try {
        await api.patchTipsBencana(id, formData)
        Success()
      } catch (error) {
        Error()
      }
  }
  
  useEffect(() => {
      const Reload = async () => {
        const response = await api.fetchTipsBencanaById(id);
        setItem(response?.data);
      };
      Reload();
    }, []);

  return (
    <>
    <Breadcrumb pageName="Tambah Tips Bencana" />

    <div className="flex flex-col gap-10">
        {/* <!-- Tambah Data --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Ubah Data Tips Bencana
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
                    value={item?.judul}
                    onChange={(e) => setItem({ ...item, judul: e.target.value })}
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
              <div className="flex gap-3 justify-end">
                {/* <button type='reset' className="px-5 py-2 border border-primary rounded-md text-primary hover:text-button-primary hover:border-button-primary dark:text-bodydark dark:border-form-strokedark dark:hover:text-white dark:hover:border-white dark:hover:bg-transparent">
                  Kosongkan
                </button> */}
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
