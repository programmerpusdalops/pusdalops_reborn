import { SetStateAction, useEffect, useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import Select from "../../../components/Module/Select";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import Pagination from "../../../components/Module/Pagination";
import * as api from '../../../utils/Api';
import { Error, Success } from "../../../utils/Alerts";
import { NavLink } from "react-router-dom";
import { FiPlus } from "react-icons/fi";



export default function BeritaPage() {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const[data, setData] = useState<Array<any>>([])

  
  const Reload = async () => {
    const response = await api.fetchBeritaSearch(keyword, page, limit);
    setData(response?.data?.result);
    setPage(response?.data?.page);
    setPages(response?.data?.totalPage);
    setRows(response?.data?.totalRows);
  };

  useEffect(() => {
    Reload();
  }, [keyword, page, limit]);

  const changePage = ({ selected } : any) => {
    setPage(selected);
  };

  const OnDelete = async (id: any) => {
    try {
      await api.deleteBerita(id)
      Success()
      Reload()
    } catch (error) {
      Error()
    }
  }




  return (
    <>
    <Breadcrumb pageName="Dokumen Page" />

    <div className="flex flex-col gap-10">

        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-5">
        <div className="flex flex-row justify-between">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div>
                <input
                  type="text"
                  onChange={(e: { target: { value: SetStateAction<string>; }; }) => setKeyword(e.target.value)}
                  placeholder="Judul"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:border-form-strokedark"
                />
            </div>
            <Select label="--Kategori--" onChange={(e: { target: { value: SetStateAction<string>; }; }) => setKeyword(e.target.value)} option={[{value: "Rapat", label: "Rapat"}, {value: "Pertemuan", label: "Pertemuan"}, {value: "Seminar", label: "Seminar"}]}/>
            <Select label="--Status--" onChange={(e: { target: { value: SetStateAction<string>; }; }) => setKeyword(e.target.value)} option={[{value: "Ya", label: "Aktif"}, {value: "Tidak", label: "Tidak Aktif"}]}/>
            <button onClick={() => setKeyword("")} className="flex w-full xl:w-auto justify-center rounded border border-primary px-5 p-2 font-medium text-primary">
              Clear
            </button>
          </div>
          <div>
          <NavLink
            to={'/tambah-berita'}
            className="flex w-full justify-center rounded border border-gray-200 px-8 px-5 bg-primary p-2 font-medium text-gray"
          >
            <h3 className="mr-2">Tambah</h3>
            <FiPlus size={18} />
          </NavLink>
        </div>
        </div>

          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="w-[10%] py-4 px-4 font-semibold text-black dark:text-white">
                    No
                  </th>
                  <th className="w-[25%] py-4 px-4 font-semibold text-black dark:text-white">
                    Judul
                  </th>
                  <th className="w-[25%] py-4 px-4 font-semibold text-black dark:text-white">
                    Kategori
                  </th>
                  <th className="w-[25%] py-4 px-4 font-semibold text-black dark:text-white">
                    Penulis
                  </th>
                  <th className="w-[25%] py-4 px-4 font-semibold text-black dark:text-white">
                    Status
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
                      <p className="text-black dark:text-white">{value?.kategori}</p>
                    </td>
                    <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">{value?.penulis}</p>
                    </td>
                    <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                      {value?.status === "Ya" ? (
                        <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">Aktif</p>
                      ) : (
                        <p className="inline-flex rounded-full bg-danger bg-opacity-10 py-1 px-3 text-sm font-medium text-danger">Tidak Aktif</p>
                      )}
                    </td>
                    {/* <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                      <div className="text-black dark:text-white">
                        {parse(value?.content)}
                      </div>
                    </td> */}
                    <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <NavLink to={`/ubah-berita/${value?.id}`} className="hover:text-primary">
                          <MdOutlineEdit />
                        </NavLink>
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
  )
}
