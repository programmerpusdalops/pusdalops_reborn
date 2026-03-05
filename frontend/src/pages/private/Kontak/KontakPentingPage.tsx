import { SetStateAction, useEffect, useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumb';
import { Error, Success } from '../../../utils/Alerts';
import * as api from '../../../utils/Api';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdOutlineEdit } from 'react-icons/md';
import Pagination from '../../../components/Module/Pagination';

const KontakPentingPage = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState<Array<any>>([])

  const [ids, setIds] = useState(null)
  const [item, setItem] = useState<any>({
    nama: "",
    jabatan: "",
    nomor: ""
  })


  const OnSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const payload = {
      nama: item?.nama,
      jabatan: item?.jabatan,
      nomor: item?.nomor,
    };

    try {
      if (!ids) {
        await api.postKontak(payload)
        Success()
        Reload()
      } else {
        await api.patchKontak(ids, payload)
        Success()
        Reload()
      }
    } catch (error) {
      Error()
    }
  }

  const OnDelete = async (id: any) => {
    try {
      await api.deleteKontak(id)
      Success()
      Reload()
    } catch (error) {
      Error()
    }
  }

  const Reload = async () => {
    const response = await api.fetchKontakSearch(keyword, page, limit);
    setData(response?.data?.result);
    setPage(response?.data?.page);
    setPages(response?.data?.totalPage);
    setRows(response?.data?.totalRows);
  };

  useEffect(() => {
    Reload();
  }, [keyword, page, limit]);

  useEffect(() => {
    if (ids) {
      const Reload = async () => {
        const response = await api.fetchKontakById(ids);
        setItem(response.data);
      };
      Reload();
    }
  }, [ids]);

  const changePage = ({ selected }: any) => {
    setPage(selected);
  };

  const Clear = () => {
    setItem({ ...item, nama: "", jabatan: "", nomor: "" })
    setIds(null)
  }


  return (
    <>
      <Breadcrumb pageName="Kontak Penting" />

      <div className="flex flex-col gap-10">
        {/* <!-- Tambah Data --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              {ids ? 'Ubah Data' : 'Tambah Data'}
            </h3>
          </div>
          <form onSubmit={OnSubmit}>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Nama Kontak
                </label>
                <input
                  type="text"
                  value={item?.nama}
                  name="nama"
                  onChange={(e) => setItem({ ...item, nama: e.target.value })}
                  placeholder="Nama Kontak"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:border-form-strokedark"
                />
              </div>
              <div className="flex flex-col md:flex-row w-full gap-3">
                <div className="flex flex-col md:w-1/2">
                  <label className="mb-3 block text-black dark:text-white">
                    Jabatan
                  </label>
                  <input
                    type="text"
                    value={item?.jabatan}
                    name="jabatan"
                    onChange={(e) => setItem({ ...item, jabatan: e.target.value })}
                    placeholder="Contoh: Kades, Camat, Masyarakat"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:border-form-strokedark"
                  />
                </div>
                <div className="flex flex-col md:w-1/2">
                  <label className="mb-3 block text-black dark:text-white">
                    Nomor
                  </label>
                  <input
                    type="text"
                    value={item?.nomor}
                    name="nomor"
                    onChange={(e) => setItem({ ...item, nomor: e.target.value })}
                    placeholder="Nomor Telepon"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:border-form-strokedark"
                  />
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
                placeholder="Cari nama, jabatan, atau nomor..."
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
                  <th className="w-[5%] py-4 px-4 font-semibold text-black dark:text-white">
                    No
                  </th>
                  <th className="w-[30%] py-4 px-4 font-semibold text-black dark:text-white">
                    Nama Kontak
                  </th>
                  <th className="w-[25%] py-4 px-4 font-semibold text-black dark:text-white">
                    Jabatan
                  </th>
                  <th className="w-[25%] py-4 px-4 font-semibold text-black dark:text-white">
                    Nomor
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
                      <p className="text-black dark:text-white">{value?.nama}</p>
                    </td>
                    <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">{value?.jabatan}</p>
                    </td>
                    <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">{value?.nomor}</p>
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

export default KontakPentingPage;