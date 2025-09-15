import { useState, useEffect, SetStateAction } from 'react';
import * as api from '../../../utils/Api';
import Pagination from '../../../components/Module/Pagination';
// import Select from '../../../components/Module/Select';
// import { Link } from 'react-router-dom';

const KontakPentingPage = () => {
//   const[data, setData] = useState<Array<any>>([])
//   const[jenisDokumen, setJenisDokumen] = useState<Array<any>>([])
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");

  
  // useEffect(() => {
  //   const Reload = async () => {
  //     const response = await api.fetchKontakSearch;
  //   //   setData(response?.data?.result);
  //     setPage(response?.data?.page);
  //     setPages(response?.data?.totalPage);
  //     setRows(response?.data?.totalRows);
  //   };
  //   Reload();
  // }, [keyword, page, limit]);

  useEffect(() => {
    const JenisKontak = async () => {
    //   const response = await api.fetchJenisDokumen();
    //   setJenisDokumen(response.data);
    };
    JenisKontak()
  }, [])

  const changePage = ({ selected } : any) => {
    setPage(selected);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-5">
    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
      {/* <Select label="--Jenis Dokumen--" onChange={(e: { target: { value: SetStateAction<string>; }; }) => setKeyword(e.target.value)} option={jenisDokumen.map((a) => ({value: a?.id, label: a?.nama}))}/>
      <Select label="--Tahun--" onChange={(e: { target: { value: SetStateAction<string>; }; }) => setKeyword(e.target.value)} option={[{value: "2025", label: "2025"}, {value: "2024", label: "2024"}, {value: "2023", label: "2023"}, {value: "2022", label: "2022"},]}/> */}
      <div>
          <input
            type="text"
            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setKeyword(e.target.value)}
            placeholder="Search"
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
            <th className="w-[40%] py-4 px-4 font-semibold text-black dark:text-white">
              Nama Kontak
            </th>
            <th className="w-[15%] py-4 px-4 font-semibold text-black dark:text-white">
              Nomor
            </th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                <p>1</p>
              </td>
              <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                <p>BNPB</p>
              </td>
              <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                <p>081134447623</p>
              </td>
            </tr>
            <tr>
              <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                <p>1</p>
              </td>
              <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                <p>pmi</p>
              </td>
              <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                <p>081134447623</p>
              </td>
            </tr>
          {/* {data.map((value: {} | any, _index: any) => (
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
                <Link to={value?.url} target='_BLANK'><button className="bg-meta-5 text-white w-full py-1 rounded-full">Lihat</button></Link>
              </td>
            </tr>
          ))} */}
  
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
  );
};

export default KontakPentingPage;
