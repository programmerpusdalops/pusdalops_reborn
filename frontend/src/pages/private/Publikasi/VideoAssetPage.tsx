import { useEffect, useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumb';
import * as api from '../../../utils/Api';
import { Success, Error } from '../../../utils/Alerts';
import { FaRegTrashAlt } from 'react-icons/fa';
const VideoAssetPage = () => {
  const [data, setData] = useState<Array<any>>([])
  const [item, setItem] = useState({
    url: ""
  })

  const OnSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      try {
        await api.postAssetVideo(item)
        Success()
        Reload()
      } catch (error) {
        Error()
      }
  }

  const OnDelete = async (id: any) => {
    try {
      await api.deleteAssetVideo(id)
      Success()
      Reload()
    } catch (error) {
      Error()
    }
  }

  const Reload = async () => {
    const response = await api.fetchAssetVideo();
    setData(response.data);
  };

  useEffect(() => {
    Reload();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Jenis Bencana" />
      <div className="flex flex-col gap-9 mb-5">
        {/* <!-- Tambah Data --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Tambah Url Video
            </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <form onSubmit={OnSubmit}>
              <div>
                <label className="mb-3 block text-black dark:text-white lg:inline lg:mr-10">
                  Jenis Bencana
                </label>
                <input
                  type="text"
                  onChange={(e) => setItem({ ...item, url: e.target.value })}
                  placeholder="Url Youtube"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:border-form-strokedark lg:w-1/2"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button type="reset" className="px-5 py-2 border border-primary rounded-md text-primary hover:text-button-primary hover:border-button-primary dark:text-bodydark dark:border-form-strokedark dark:hover:text-white dark:hover:border-white dark:hover:bg-transparent">
                  Kosongkan
                </button>
                <button type="submit" className="px-5 py-2 bg-primary rounded-md text-white  hover:bg-button-primary dark:bg-body dark:hover:bg-graydark">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-5">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="w-[10%] py-4 px-4 font-semibold text-black dark:text-white">
                No
              </th>
              <th className="w-[75%] py-4 px-4 font-semibold text-black dark:text-white">
                Url
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
                  <p className="text-black dark:text-white">{value?.url}</p>
                </td>
                <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary" onClick={() => OnDelete(value?.id)}>
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
    
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default VideoAssetPage;