import { SetStateAction, useEffect, useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumb';
import { Error, Success } from '../../../utils/Alerts';
import * as api from '../../../utils/Api';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdOutlineEdit } from 'react-icons/md';
import Select from '../../../components/Module/Select';
import Pagination from '../../../components/Module/Pagination';

const DataLogpalPage = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const[data, setData] = useState<Array<any>>([])

  const [ids, setIds] = useState(null)
  const[item, setItem] = useState({
    nama_barang: "",
    stok: "",
    satuan: "",
    tahun: "",
    sumber: "",
    kondisi: ""
  })

  const OnSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      if (!ids) {
        await api.postLogpal(item)
        Success()
        Reload()
      } else {
        await api.patchLogpal(ids, item)
        Success()
        Reload()
      }
    } catch (error) {
      Error()
    }
  }

  const OnDelete = async (id: any) => {
    try {
      await api.deleteLogpal(id)
      Success()
      Reload()
    } catch (error) {
      Error()
    }
  }

  const Reload = async () => {
    const response = await api.fetchLogpalSearch(keyword, page, limit);
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
        const response = await api.fetchLogpalById(ids);
        setItem(response.data);
      };
      Reload();
    }
  }, [ids]);

  
  const changePage = ({ selected } : any) => {
    setPage(selected);
  };

  const Clear = () => {
    setItem({...item, nama_barang: "", stok: "", satuan: "", tahun: "", sumber: "", kondisi: ""})
    setIds(null)
  }


  return (
    <>
      <Breadcrumb pageName="Logpal Page" />

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
                      Nama Barang
                    </label>
                    <input
                      type="text"
                      value={item?.nama_barang}
                      required
                      name="nama_barang"
                      onChange={(e) => setItem({ ...item, nama_barang: e.target.value })}
                      placeholder="Nama Barang"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:border-form-strokedark"
                    />
                  </div>

                  <div className="flex flex-col md:w-1/2">
                    <label className="mb-3 block text-black dark:text-white">
                      Stok
                    </label>
                    <input
                      type="text"
                      value={item?.stok}
                      required
                      name="stok"
                      onChange={(e) => setItem({ ...item, stok: e.target.value })}
                      placeholder="Stok"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:border-form-strokedark"
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row w-full gap-3">
                  <div className="flex flex-col md:w-1/2">
                    <label className="mb-3 block text-black dark:text-white">
                      Tahun
                    </label>
                    <input
                      type="text"
                      value={item?.tahun}
                      required
                      name="tahun"
                      onChange={(e) => setItem({ ...item, tahun: e.target.value })}
                      placeholder="Tahun"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:border-form-strokedark"
                    />
                  </div>

                  <div className="flex flex-col md:w-1/2">
                    <label className="mb-3 block text-black dark:text-white">
                      Satuan
                    </label>
                    <div className="relative z-20 bg-white dark:bg-form-input">
                      <select
                        name="satuan"
                        onChange={(e) => setItem({ ...item, satuan: e.target.value })}
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                      >
                        <option value={ids ? item?.satuan : ""}>{ids ? item?.satuan : "--Pilih Satuan--"}</option>
                        <option value="Unit">Unit</option>
                        <option value="Bungkus">Bungkus</option>
                        <option value="Lembar">Lembar</option>
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

                <div className="flex flex-col md:flex-row w-full gap-3">
                  <div className="flex flex-col md:w-1/2">
                    <label className="mb-3 block text-black dark:text-white">
                      Sumber
                    </label>
                    <div className="relative z-20 bg-white dark:bg-form-input">
                      <select
                        name="sumber"
                        onChange={(e) => setItem({ ...item, sumber: e.target.value })}
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                      >
                        <option value={ids ? item?.sumber : ""}>{ids ? item?.sumber : "--Pilih Sumber--"}</option>
                        <option value="Hibah BNPB">Hibah BNPB</option>
                        <option value="APBD">APBD</option>
                        <option value="CSR">CSR</option>
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

                  <div className="flex flex-col md:w-1/2">
                    <label className="mb-3 block text-black dark:text-white">
                      Kondisi
                    </label>
                    <div className="relative z-20 bg-white dark:bg-form-input">
                      <select
                        name="kondisi"
                        onChange={(e) => setItem({ ...item, kondisi: e.target.value })}
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                      >
                        <option value={ids ? item?.kondisi : ""}>{ids ? item?.kondisi : "--Pilih Kondisi--"}</option>
                        <option value="Baik">Baik</option>
                        <option value="Rusak">Rusak</option>
                        <option value="Rusak Sedang">Rusak Sedang</option>
                        <option value="Rusak Berat">Rusak Berat</option>
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
              <div>
                  <input
                    type="text"
                    onChange={(e: { target: { value: SetStateAction<string>; }; }) => setKeyword(e.target.value)}
                    placeholder="Nama Barang"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:border-form-strokedark"
                  />
              </div>
              <Select label="--Tahun--" onChange={(e: { target: { value: SetStateAction<string>; }; }) => setKeyword(e.target.value)} option={[{value: "2025", label: "2025"}, {value: "2024", label: "2024"}, {value: "2023", label: "2023"}, {value: "2022", label: "2022"},]}/>
              <Select label="--Kondisi--" onChange={(e: { target: { value: SetStateAction<string>; }; }) => setKeyword(e.target.value)} option={[{value: "Baik", label: "Baik"}, {value: "Rusak", label: "Rusak"}, {value: "Rusak Sedang", label: "Rusak Sedang"}, {value: "Rusak Berat", label: "Rusak Berat"},]}/>
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
                      Nama Barang
                    </th>
                    <th className="w-[25%] py-4 px-4 font-semibold text-black dark:text-white">
                      Satuan
                    </th>
                    <th className="w-[25%] py-4 px-4 font-semibold text-black dark:text-white">
                      Stok
                    </th>
                    <th className="w-[25%] py-4 px-4 font-semibold text-black dark:text-white">
                      Tahun
                    </th>
                    <th className="w-[25%] py-4 px-4 font-semibold text-black dark:text-white">
                      Sumber
                    </th>
                    <th className="w-[25%] py-4 px-4 font-semibold text-black dark:text-white">
                      Kondisi
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
                        <p className="text-black dark:text-white">{value?.nama_barang}</p>
                      </td>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{value?.satuan}</p>
                      </td>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{value?.stok}</p>
                      </td>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{value?.tahun}</p>
                      </td>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{value?.sumber}</p>
                      </td>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{value?.kondisi}</p>
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

export default DataLogpalPage;
