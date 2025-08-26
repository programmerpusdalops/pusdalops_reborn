import { useEffect, useState } from 'react'
import * as api from '../../utils/Api';
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';
import ChartPerbandinganTahun from './ChartPerbandinganTahun';

export default function CardDataBencana() {
    const[persentaseKejadian, setPersentaseKejadian] = useState<any>()
    const[totalKejadian, setTotalKejadian] = useState()

    useEffect(() => {
        const PersentaseKejadian = async () => {
            const response = await api.fetchKejadianPersentase();
            setPersentaseKejadian(response?.data);
          };
    
        PersentaseKejadian();

        const JenisKejadian = async () => {
            const response = await api.fetchKejadianPerJenis();
            setTotalKejadian(response?.data?.total)
          };
    
          JenisKejadian();
    }, [])


  return (
    <>
    <div className="flex flex-col md:flex-row bg-white p-4 rounded-xl items  border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex flex-col gap-2 justify-center">
                <p className="font-bold">Data Bencana 2025</p>
                <div className="flex gap-2">
                  <div className="py-1 px-2 bg-meta-6 items-center flex rounded-md font-bold text-xl text-meta-2">
                    {totalKejadian}
                  </div>
                  <div className="flex flex-col">
                    <p className="font-light text-sm">Kejadian</p>
                    <p className="flex items-center">
                      {persentaseKejadian <= 0 ? (
                        <>
                        <FaArrowTrendDown className="text-meta-3 mr-1" />
                        <label className="text-meta-3 font-bold mr-1">
                          {Math.round(persentaseKejadian?.toString().slice(1, persentaseKejadian?.toString().length))}%
                        </label>
                        </>
                      ) : (
                        <>
                        <FaArrowTrendUp className="text-meta-1 mr-1" />
                        <label className="text-meta-1 font-bold mr-1">
                          {Math.round(persentaseKejadian)}%
                        </label>
                        </>
                      )}
                      dari 2024
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <ChartPerbandinganTahun/>
              </div>
            </div>
    </>
  )
}
