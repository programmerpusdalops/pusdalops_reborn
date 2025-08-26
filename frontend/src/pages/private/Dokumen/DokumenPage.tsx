import { SetStateAction, useEffect, useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumb';
import { Error, Success } from '../../../utils/Alerts';
import * as api from '../../../utils/Api';
import Swal from 'sweetalert2';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdOutlineEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Select from '../../../components/Module/Select';
import Pagination from '../../../components/Module/Pagination';

const DokumenPage = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const[data, setData] = useState<Array<any>>([])

  const[jenisDokumen, setJenisDokumen] = useState<Array<any>>([])
  const [ids, setIds] = useState(null)
  const[file, setFile] = useState("")
  const[item, setItem] = useState<any>({
    judul: "",
    id_jenis_dokumen: "",
    tahun: ""
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
      formData.append("id_jenis_dokumen", item?.id_jenis_dokumen);
      formData.append("tahun", item?.tahun);
      formData.append("file", file);

    try {
      if (!ids) {
        await api.postDokumen(formData)
        Success()
        Reload()
      } else {
        await api.patchDokumen(ids, formData)
        Success()
        Reload()
      }
    } catch (error) {
      Error()
    }
  }

  const OnDelete = async (id: any) => {
    try {
      await api.deleteDokumen(id)
      Success()
      Reload()
    } catch (error) {
      Error()
    }
  }

  const Reload = async () => {
    const response = await api.fetchDokumenSearch(keyword, page, limit);
    setData(response?.data?.result);
    setPage(response?.data?.page);
    setPages(response?.data?.totalPage);
    setRows(response?.data?.totalRows);
  };

  useEffect(() => {
    Reload();
  }, [keyword, page, limit]);

  useEffect(() => {
    if(ids){
      const Reload = async () => {
        const response = await api.fetchDokumenById(ids);
        setItem(response.data);
        setFile(response?.data?.file_name)
      };
      Reload();
    }
  }, [ids]);

  useEffect(() => {
    const JenisDokumen = async () => {
      const response = await api.fetchJenisDokumen();
      setJenisDokumen(response.data);
    };
    JenisDokumen()
  }, [])
  
  const changePage = ({ selected } : any) => {
    setPage(selected);
  };

  const Clear = () => {
    setItem({...item, judul: "", tahun: "", id_jenis_dokumen: ""})
    setIds(null)
  }


  return (
    <>
      <Breadcrumb pageName="Dokumen Page" />

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
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Judul
                  </label>
                  <input
                    type="text"
                    value={item?.judul}
                    name="judul"
                    onChange={(e) => setItem({ ...item, judul: e.target.value })}
                    placeholder="Judul"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:border-form-strokedark"
                  />
                </div>
                <div className="flex flex-col md:flex-row w-full gap-3">
                  <div className="flex flex-col md:w-1/2">
                    <label className="mb-3 block text-black dark:text-white">
                      Tahun
                    </label>
                    <input
                      type="text"
                      value={item?.tahun}
                      name="tahun"
                      onChange={(e) => setItem({ ...item, tahun: e.target.value })}
                      placeholder="Tahun"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:border-form-strokedark"
                    />
                  </div>
                  <div className="flex flex-col md:w-1/2">
                    <label className="mb-3 block text-black dark:text-white">
                      Jenis Dokumen
                    </label>
                    <div className="relative z-20 bg-white dark:bg-form-input">
                      <select
                        name="id_jenis_dokumen"
                        onChange={(e) => setItem({ ...item, id_jenis_dokumen: e.target.value })}
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                      >
                        <option value={ids ? item?.id_jenis_dokumen : ""}>{ids ? item?.jenis_dokumen?.nama : "--Pilih Jenis Dokumen"}</option>
                        {jenisDokumen.map((val) => (
                          <option value={val?.id}>{val?.nama}</option>
                        ))}
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
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Unggah Dokumen
                  </label>
                  <input
                    type="file"
                    onChange={(event) => loadImage(event)}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="flex gap-3 justify-end">
                  <button type='reset' onClick={Clear} className="px-5 py-2 border border-primary rounded-md text-primary hover:text-button-primary hover:border-button-primary dark:text-bodydark dark:border-form-strokedark dark:hover:text-white dark:hover:border-white dark:hover:bg-transparent">
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

          <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <Select label="--Jenis Dokumen--" onChange={(e: { target: { value: SetStateAction<string>; }; }) => setKeyword(e.target.value)} option={jenisDokumen.map((a) => ({value: a?.id, label: a?.nama}))}/>
              <Select label="--Tahun--" onChange={(e: { target: { value: SetStateAction<string>; }; }) => setKeyword(e.target.value)} option={[{value: "2025", label: "2025"}, {value: "2024", label: "2024"}, {value: "2023", label: "2023"}, {value: "2022", label: "2022"},]}/>
              <div>
                  <input
                    type="text"
                    onChange={(e: { target: { value: SetStateAction<string>; }; }) => setKeyword(e.target.value)}
                    placeholder="Judul"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:border-form-strokedark"
                  />
              </div>
              <button onClick={() => setKeyword("")} className="flex w-full xl:w-auto justify-center rounded border border-primary px-5 p-2 font-medium text-primary">
                Clear
              </button>
            </div>
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="w-[10%] py-4 px-4 font-semibold text-black dark:text-white">
                      No
                    </th>
                    <th className="w-[25%] py-4 px-4 font-semibold text-black dark:text-white">
                      Nama Dokumen
                    </th>
                    <th className="w-[25%] py-4 px-4 font-semibold text-black dark:text-white">
                      Jenis
                    </th>
                    <th className="w-[25%] py-4 px-4 font-semibold text-black dark:text-white">
                      Tahun
                    </th>
                    <th className="w-[25%] py-4 px-4 font-semibold text-black dark:text-white">
                      File
                    </th>
                    <th className="py-4 px-4 font-semibold text-black dark:text-white">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((value: {} | any, _index: any) => (
                    <tr key={value?.id}>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <h5 className="font-medium text-black dark:text-white">{_index + 1}</h5>
                      </td>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{value?.judul}</p>
                      </td>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{value?.jenis_dokumen?.nama}</p>
                      </td>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{value?.tahun}</p>
                      </td>
                      <td>
                        <Link to={value?.url}>Download Dokumen</Link>
                      </td>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <div className="flex items-center space-x-3.5">
                          <button className="hover:text-primary" onClick={() => setIds(value?.id)}>
                            <MdOutlineEdit />
                          </button>
                          <button className="hover:text-primary" onClick={() => OnDelete(value?.id)}>
                            <FaRegTrashAlt />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
          
                </tbody>
              </table>
              <Pagination
                setLimit={setLimit}
                rows={rows}
                page={page}
                pages={pages}
                changePage={changePage}
              />
            </div>
          </div>

      </div>
    </>
  );
};

export default DokumenPage;