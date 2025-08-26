import { useEffect, useState } from 'react'
import * as api from '../../utils/Api';

export default function CardTotalPerJenisBencana() {
  const[jenisKejadian, setJenisKejadian] = useState<Array<any>>([]);
  const[totalKejadian, setTotalKejadian] = useState()

  useEffect(() => {
    const JenisKejadian = async () => {
      const response = await api.fetchKejadianPerJenis();
      setJenisKejadian(response?.data?.data);
      setTotalKejadian(response?.data?.total)
    };

    JenisKejadian();
  }, []);

  return (
    <>
         <div className="hidden relative rounded-xl border border-stroke bg-white p-7 shadow-default dark:border-strokedark dark:bg-boxdark mb-5 lg:mb-0 lg:w-1/4 lg:block lg:h-auto">
          <div className="flex justify-between items-center mb-5">
            <div>
              <p className="text-[12px] text-[#64748B] dark:text-gray">
                Master Data
              </p>
              <h1 className="text-xl text-black font-bold dark:text-gray">
                Data Bencana 2025
              </h1>
            </div>
            <div>
              <div className="bg-[#FFD65F] text-4xl rounded-md text-white font-bold p-2">
                {totalKejadian}
              </div>
            </div>
          </div>

          {jenisKejadian.map((val, index) => (
          <div key={index} className="flex text-[12px] text-black dark:text-gray justify-between items-center px-5 border-b border-b-stroke mb-3 pb-2">
            <p>{val?.label?.nama}</p>
            <p>{val?.count}</p>
          </div>
          ))}
        </div>

        <div className="relative rounded-xl border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark mb-5 lg:hidden">
          <div className="flex justify-between items-center mb-5">
            <div>
              <p className="text-[12px] text-black dark:text-gray">
                Master Data
              </p>
              <h1 className="text-xl text-black font-bold dark:text-gray">
                Data Bencana 2025
              </h1>
            </div>
            <div>
              <div className="bg-[#FFD65F] text-4xl rounded-md text-white font-bold p-1">
              {totalKejadian}
              </div>
            </div>
          </div>

          <div className="flex flex-row overflow-x-auto gap-x-3">
            {jenisKejadian.map((val, index) => (
              <div key={index} className="px-3 py-1 bg-secondary rounded-lg flex flex-grow whitespace-nowrap text-white mb-2">
                {val?.label?.nama} : {val?.count}
              </div>
            ))}
          </div>
        </div>
    </>
  )
}
