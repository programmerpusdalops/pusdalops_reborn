import { useEffect, useState } from 'react'
import * as api from '../../utils/Api';

export default function TableTerdampak({id_lokasi}: string | any) {
  const[korban, setKorban] = useState<any>()
  const[kerusakan, setKerusakan] = useState<any>()

  useEffect(() => {
    const Korban = async () => {
      const response = await api.fetchKorbanByIdLokasi(id_lokasi);
      setKorban(response.data);
    };
    Korban();

    const Kerusakan = async () => {
      const response = await api.fetchKerusakanByIdLokasi(id_lokasi);
      setKerusakan(response.data);
    };
    Kerusakan();
  }, [id_lokasi])

  const list_korban = [
    {
      'label' : "Meninggal",
      'value' : korban?.meninggal,
      'value1' : ""
    },
    {
      'label' : "Hilang",
      'value' : korban?.hilang,
      'value1' : ""
    },
    {
      'label' : "Sakit",
      'value' : korban?.sakit,
      'value1' : ""
    },
    {
      'label' : "Luka-luka",
      'value' : korban?.luka_luka,
      'value1' : ""
    },
    {
      'label' : "Menderita",
      'value' : korban?.menderita_jiwa,
      'value1' : korban?.menderita_kk
    },
    {
      'label' : "Mengungsi",
      'value' : korban?.mengungsi_jiwa,
      'value1' : korban?.mengungsi_kk
    },
  ]

  const pemukiman = [
         {
            'label' : "Rumah Rusak Berat",
            'value' : kerusakan?.rm_rusak_berat,
          },
          {
            'label' : "Rumah Rusak Sedang",
            'value' : kerusakan?.rm_rusak_sedang,
          },
          {
            'label' : "Rumah Rusak Ringan",
            'value' : kerusakan?.rm_rusak_ringan,
          },
          {
            'label' : "Rumah Terdampak",
            'value' : kerusakan?.rumah_terdampak,
          }
  ]

  const fasilitas = [
      {
        'label' : "Sarana Pendidikan",
        'value' : kerusakan?.sarana_pendidikan,
      },
      {
        'label' : "Sarana Ibadah",
        'value' : kerusakan?.sarana_ibadah,
      },
      {
        'label' : "Sarana Kesehatan",
        'value' : kerusakan?.sarana_kesehatan,
      },
      {
        'label' : "Perkantoran",
        'value' : kerusakan?.perkantoran,
      },
      {
        'label' : "Bangunan Lain",
        'value' : kerusakan?.bangunan_lain,
      }
  ]

  const sarpras = [
      {
        'label' : "Jembatan",
        'value' : kerusakan?.jembatan,
      },
      {
        'label' : "Jalan",
        'value' : kerusakan?.jalan,
      }
  ]

  const ekonomi = [
          {
            'label' : "Sawah",
            'value' : kerusakan?.sawah,
          },
          {
            'label' : "Kebun",
            'value' : kerusakan?.kebun,
          },
          {
            'label' : "Kolam",
            'value' : kerusakan?.tambak,
          },
          {
            'label' : "Irigasi",
            'value' : kerusakan?.irigasi,
          }
  ]

  return (
          <div className="flex flex-col gap-6 xl:flex-row" >

            <div className="w-full overflow-x-auto rounded-md shadow-default  border border-gray-100">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="w-auto py-4 px-4 font-semibold text-black dark:text-white">
                      Korban
                    </th>
                    <th className="w-auto py-4 px-4 font-semibold text-black dark:text-white">
                      Jiwa
                    </th>
                    <th className="w-auto py-4 px-4 font-semibold text-black dark:text-white">
                      KK
                    </th>
                  </tr>
                </thead>
                <tbody>

                  {list_korban.map((val, index) => (
                    <tr key={index}>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {val?.label}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                        {val?.value}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {val?.value1}
                        </p>
                      </td>
                    </tr>
                  ))}


                    
                </tbody>
              </table>
            </div>

            <div className="w-full overflow-x-auto rounded-md shadow-default  border border-gray-100">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="w-auto py-4 px-4 font-semibold text-black dark:text-white">
                      Pemukiman
                    </th>
                    <th className="w-auto py-4 px-4 font-semibold text-black dark:text-white">
                      Unit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pemukiman.map((val, index) => (
                    <tr key={index}>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {val?.label}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {val?.value}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="w-full overflow-x-auto rounded-md shadow-default  border border-gray-100">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="w-auto py-4 px-4 font-semibold text-black dark:text-white">
                      Fasilitas Umum
                    </th>
                    <th className="w-auto py-4 px-4 font-semibold text-black dark:text-white">
                      Unit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {fasilitas.map((val, index) => (
                    <tr key={index}>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {val?.label}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                        {val?.value}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="w-full overflow-x-auto rounded-md shadow-default  border border-gray-100">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="w-auto py-4 px-4 font-semibold text-black dark:text-white">
                      Sarpras Vital
                    </th>
                    <th className="w-auto py-4 px-4 font-semibold text-black dark:text-white">
                      Unit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sarpras.map((val, index) => (
                    <tr key={index}>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {val?.label}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {val?.value}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="w-full overflow-x-auto rounded-md shadow-default  border border-gray-100">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="w-auto py-4 px-4 font-semibold text-black dark:text-white">
                      Ekonomi
                    </th>
                    <th className="w-auto py-4 px-4 font-semibold text-black dark:text-white">
                      Unit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ekonomi.map((val, index) => (
                    <tr key={index}>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {val?.label}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {val?.value}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
          </div>
  )
}
