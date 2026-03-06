/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import * as api from '../../../utils/Api';

const KontakPentingPage = () => {
  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
    const loadKontak = async () => {
      try {
        const response = await api.fetchKontak();
        setData(response.data);
      } catch (error) {
        console.error("Gagal memuat data kontak:", error);
      }
    };
    loadKontak();
  }, []);

  return (
    <div className="flex flex-col mt-10">
      <label className="border-l-2 pl-3 border-l-meta-1 text-2xl text-black-2 dark:text-white mb-6">
        Kontak Penting
      </label>

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-5">
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
                <th className="w-[30%] py-4 px-4 font-semibold text-black dark:text-white">
                  Jabatan
                </th>
                <th className="w-[25%] py-4 px-4 font-semibold text-black dark:text-white">
                  Nomor
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-gray-500">
                    Belum ada data kontak penting.
                  </td>
                </tr>
              ) : (
                data.map((value: any, index: number) => (
                  <tr key={value?.id}>
                    <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">{index + 1}</p>
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
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default KontakPentingPage;
