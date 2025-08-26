import { useEffect, useState } from 'react';
import Banjir from '../../assets/images/icon/ic_banjir.png';
import Gempa from '../../assets/images/icon/ic_gempa.png';
import Angin from '../../assets/images/icon/ic_puting.png';
import Tanah from '../../assets/images/icon/ic_longsor.png';
import KebakaranHutan from '../../assets/images/icon/ic_karhutla.png';
import BanjirLongsor from '../../assets/images/icon/ic_banjir_longsor.png';
import BanjirBandang from '../../assets/images/icon/ic_banjir_bandang1.png';
import Abrasi from '../../assets/images/icon/ic_abrasi.png';
import GelombangTinggi from '../../assets/images/icon/ic_gelombang_tinggi.png';
import * as api from '../../utils/Api';

interface Props {
  totalKejadian: string | any;
}

const CardTotalKejadian = ({ totalKejadian }: Props) => {
  const [countKejadian, setCountKejadian] = useState<Array<any>>([]);

  useEffect(() => {
    const Count = async () => {
      const response = await api.fetchCountKejadian();
      setCountKejadian(response.data);
    };

    Count();
  }, []);

  return (
    <div className="p-5 bg-black-2 bg-opacity-40 rounded-lg flex flex-col justify-center items-center">
      <div className="text-white text-center font-bold text-sm xl:text-xl">
        Peta Bencana di Kabupaten/Kota
      </div>
      <div className="text-xs text-center text-white mb-5">
        Berikut adalah Data Bencana 2025 yang telah terkonfirmasi BPBD
        Kabupaten/Kota
      </div>
      <div className="bg-meta-6 text-white font-extrabold text-4xl h-13 px-2 rounded-md flex justify-center items-center mb-1">
        {totalKejadian}
      </div>
      <div className="xl:text-sm text-xs font-semibold text-white mb-4">
        KEJADIAN
      </div>
      <div className="flex gap-2 text-nowrap overflow-x-auto pb-2 mx-5 w-full no-scrollbar">
        <div className="bg-white px-3 py-2 rounded-md">
          <div className="flex gap-x-1 justify-center items-center px-3">
            <img src={Banjir} width={35} alt="" />
            <div className="text-black font-bold text-2xl">{countKejadian[19]}</div>
          </div>
          <div className="text-black text-xs font-bold text-center">{countKejadian[18]}</div>
        </div>
        <div className="bg-white px-3 py-2 rounded-md">
          <div className="flex gap-x-1 justify-center items-center px-3">
            <img src={BanjirBandang} width={35} alt="" />
            <div className="text-black font-bold text-2xl">{countKejadian[27]}</div>
          </div>
          <div className="text-black text-xs font-bold text-center">
            {countKejadian[26]}
          </div>
        </div>
        <div className="bg-white px-3 py-2 rounded-md">
          <div className="flex gap-x-1 justify-center items-center px-3">
            <img src={Banjir} width={35} alt="" />
            <div className="text-black font-bold text-2xl">{countKejadian[3]}</div>
          </div>
          <div className="text-black text-xs font-bold text-center">
            {countKejadian[2]}
          </div>
        </div>
        <div className="bg-white px-3 py-2 rounded-md">
          <div className="flex gap-x-1 justify-center items-center px-3">
            <img src={BanjirLongsor} width={35} alt="" />
            <div className="text-black font-bold text-2xl">{countKejadian[23]}</div>
          </div>
          <div className="text-black text-xs font-bold text-center">
            {countKejadian[22]}
          </div>
        </div>
        <div className="bg-white px-3 py-2 rounded-md">
          <div className="flex gap-x-1 justify-center items-center px-3">
            <img src={Tanah} width={35} alt="" />
            <div className="text-black font-bold text-2xl">{countKejadian[17]}</div>
          </div>
          <div className="text-black text-xs font-bold text-center">
            {countKejadian[16]}
          </div>
        </div>
        <div className="bg-white px-3 py-2 rounded-md">
          <div className="flex gap-x-1 justify-center items-center px-3">
            <img src={Gempa} width={35} alt="" />
            <div className="text-black font-bold text-2xl">{countKejadian[9]}</div>
          </div>
          <div className="text-black text-xs font-bold text-center">{countKejadian[8]}</div>
        </div>

        <div className="bg-white px-3 py-2 rounded-md">
          <div className="flex gap-x-1 justify-center items-center px-3">
            <img src={Gempa} width={35} alt="" />
            <div className="text-black font-bold text-2xl">{countKejadian[7]}</div>
          </div>
          <div className="text-black text-xs font-bold text-center">{countKejadian[6]}</div>
        </div>

        <div className="bg-white px-3 py-2 rounded-md">
          <div className="flex gap-x-1 justify-center items-center px-3">
            <img src={Gempa} width={35} alt="" />
            <div className="text-black font-bold text-2xl">{countKejadian[11]}</div>
          </div>
          <div className="text-black text-xs font-bold text-center">{countKejadian[10]}</div>
        </div>

        <div className="bg-white px-3 py-2 rounded-md">
          <div className="flex gap-x-1 justify-center items-center px-3">
            <img src={Abrasi} width={35} alt="" />
            <div className="text-black font-bold text-2xl">{countKejadian[13]}</div>
          </div>
          <div className="text-black text-xs font-bold text-center">{countKejadian[12]}</div>
        </div>

        <div className="bg-white px-3 py-2 rounded-md">
          <div className="flex gap-x-1 justify-center items-center px-3">
            <img src={KebakaranHutan} width={35} alt="" />
            <div className="text-black font-bold text-2xl">{countKejadian[21]}</div>
          </div>
          <div className="text-black text-xs font-bold text-center">
            {countKejadian[20]}
          </div>
        </div>
        <div className="bg-white px-3 py-2 rounded-md">
          <div className="flex gap-x-1 justify-center items-center px-3">
            <img src={KebakaranHutan} width={35} alt="" />
            <div className="text-black font-bold text-2xl">{countKejadian[15]}</div>
          </div>
          <div className="text-black text-xs font-bold text-center">
            {countKejadian[14]}
          </div>
        </div>
        <div className="bg-white px-3 py-2 rounded-md">
          <div className="flex gap-x-1 justify-center items-center px-3">
            <img src={Angin} width={35} alt="" />
            <div className="text-black font-bold text-2xl">{countKejadian[1]}</div>
          </div>
          <div className="text-black text-xs font-bold text-center">
            {countKejadian[0]}
          </div>
        </div>
        <div className="bg-white px-3 py-2 rounded-md">
          <div className="flex gap-x-1 justify-center items-center px-3">
            <img src={Abrasi} width={35} alt="" />
            <div className="text-black font-bold text-2xl">{countKejadian[25]}</div>
          </div>
          <div className="text-black text-xs font-bold text-center">{countKejadian[24]}</div>
        </div>
        <div className="bg-white px-3 py-2 rounded-md">
          <div className="flex gap-x-1 justify-center items-center px-3">
            <img src={GelombangTinggi} width={35} alt="" />
            <div className="text-black font-bold text-2xl">{countKejadian[5]}</div>
          </div>
          <div className="text-black text-xs font-bold text-center">{countKejadian[4]}</div>
        </div>
      </div>
    </div>
  );
};

export default CardTotalKejadian;
