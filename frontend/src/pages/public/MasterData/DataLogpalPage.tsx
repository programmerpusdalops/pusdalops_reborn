import { useState, useEffect, SetStateAction } from 'react';
import * as api from '../../../utils/Api';
import Select from '../../../components/Module/Select';
import Pagination from '../../../components/Module/Pagination';

const DataLogpalPage = () => {
  const[data, setData] = useState<Array<any>>([])
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");


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

  const changePage = ({ selected }: any) => {
    setPage(selected);
  };

  return (
    <div className="relative rounded-xl border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark mb-5 overflow-x-auto">
      <div className="mb-5">
        <p className="font-bold text-lg">
          Data Logistik & Peralatan BPBD Provinsi Sulawesi Tengah
        </p>
      </div>

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
                    <th className="w-[10%] py-4 px-4 font-semibold text-black dark:text-white">
                      Satuan
                    </th>
                    <th className="w-[10%] py-4 px-4 font-semibold text-black dark:text-white">
                      Stok
                    </th>
                    <th className="w-[10%] py-4 px-4 font-semibold text-black dark:text-white">
                      Tahun
                    </th>
                    <th className="w-[15%] py-4 px-4 font-semibold text-black dark:text-white">
                      Sumber
                    </th>
                    <th className="w-[25%] py-4 px-4 font-semibold text-black dark:text-white">
                      Kondisi
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
                        {value?.kondisi === "Baik" && (
                          <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">{value?.kondisi}</p>
                        )}
                        {value?.kondisi === "Rusak" && (
                          <p className="inline-flex rounded-full bg-danger bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">{value?.kondisi}</p>
                        )}
                        {value?.kondisi === "Rusak Sedang" && (
                          <p className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">{value?.kondisi}</p>
                        )}
                        {value?.kondisi === "Rusak Berat" && (
                          <p className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-danger">{value?.kondisi}</p>
                        )}
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
  );
};

export default DataLogpalPage;
