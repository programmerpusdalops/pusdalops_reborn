import { useEffect, useState } from 'react'
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6'
import * as api from '../../utils/Api';

export default function CardDataKorbanTerdampak() {
    const[countkorban, setCountKorban] = useState<any>();

    useEffect(() => {
        const KorbanTerdampak = async () => {
            const response = await api.fetchKejadianKorbanTerdampak();
            setCountKorban(response?.data);
          };
    
        KorbanTerdampak();
    }, [])
    

  return (
    <>
             <div className="flex bg-white p-4 gap-x-4 rounded-xl justify-between border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex flex-col w-4/6 gap-2">
                <p className="font-bold">
                  Data Korban Terdampak 2025{' '}
                  <small className="font-light text-xs">(Jiwa)</small>
                </p>
  
                  <div className="flex gap-2">
                    <div className="flex flex-col justify-center">
                      <div className="py-1 px-2 bg-meta-1 justify-center flex rounded-md font-bold text-xl text-meta-2">
                        {countkorban?.meninggal}
                      </div>
                      <label className="text-[7px]">Meninggal Dunia</label>
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="py-1 px-2 bg-danger items-center justify-center flex rounded-md font-bold text-xl text-meta-2">
                      {countkorban?.hilang}
                      </div>
                      <label className="text-[7px] text-center">Hilang</label>
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="py-1 px-2 bg-meta-5 items-center justify-center flex rounded-md font-bold text-xl text-meta-2">
                      {countkorban?.menderita}
                      </div>
                      <label className="text-[7px] text-center">
                        Menderita
                      </label>
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="py-1 px-2 bg-meta-5 items-center justify-center flex rounded-md font-bold text-xl text-meta-2">
                      {countkorban?.mengungsi}
                      </div>
                      <label className="text-[7px] text-center">
                        Mengungsi
                      </label>
                    </div>
                  </div>

              </div>
              <div className="flex justify-center items-center flex-1 border-l border-meta-2">
                <p className="text-center">
                      {countkorban?.hasil_persentase <= 0 ? (
                        <>
                        <FaArrowTrendDown className="text-meta-3 mr-1" />
                        <label className="text-meta-3 font-bold mr-1">
                          {Math.round(countkorban?.hasil_persentase?.toString().slice(1, countkorban?.hasil_persentase?.toString().length))}%
                        </label>
                        </>
                      ) : (
                        <>
                        <FaArrowTrendUp className="text-meta-1 mr-1" />
                        <label className="text-meta-1 font-bold mr-1">
                          {Math.round(countkorban?.hasil_persentase)}%
                        </label>
                        </>
                      )}
                  dari 2024
                </p>
              </div>
            </div>
    </>
  )
}
