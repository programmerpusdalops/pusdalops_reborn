import { useEffect, useState } from 'react';
import Banjir from '../../assets/images/icon/ic_banjir.png';
import Gempa from '../../assets/images/icon/ic_gempa.png';
import Angin from '../../assets/images/icon/ic_puting.png';
import Tanah from '../../assets/images/icon/ic_longsor.png';
import KebakaranHutan from '../../assets/images/icon/ic_karhutla.png';
import BanjirLongsor from '../../assets/images/icon/ic_banjir_longsor.png';
import BanjirBandang from '../../assets/images/icon/ic_banjir_bandang1.png';
import Abrasi from '../../assets/images/icon/ic_abrasi.png';
// import GelombangTinggi from '../../assets/images/icon/ic_gelombang_tinggi.png';

import * as api from '../../utils/Api';

interface Props {
  totalKejadian: string | any;
}

const CardTotalKejadianMobile = ({ totalKejadian }: Props) => {
  const [countKejadian, setCountKejadian] = useState<Array<any>>([]);

  useEffect(() => {
    const Count = async () => {
      const response = await api.fetchCountKejadian();
      setCountKejadian(response.data);
    };

    Count();
  }, []);

  return (
    <div className="px-2 py-4 rounded-md flex flex-col bg-home-blue bg-opacity-70 h-100">
      <div className="p-1 mb-2 text-white rounded-sm text-xs font-semibold text-center">
        Total Kejadian <span className="font-bold">{totalKejadian}</span>
      </div>
      <div className="pb-4 h-full overflow-y-scroll">
        <div className="flex flex-col justify-center items-center group mb-2">
          <img
            src={Banjir}
            width={30}
            className="hover:w-[40px] hover:cursor-pointer"
            alt="Banjir"
          />
          <p className="text-white text-[10px] text-center hidden group-hover:block">
            <span className="font-bold">{countKejadian[18]}</span>{' '}
            {countKejadian[19]}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center group mb-2">
          <img
            src={BanjirBandang}
            width={30}
            className="hover:w-[40px] hover:cursor-pointer"
            alt="Banjir Bandang"
          />
          <p className="text-white text-[10px] text-center hidden group-hover:block">
            <span className="font-bold">{countKejadian[26]}</span>{' '}
            {countKejadian[27]}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center group mb-2">
          <img
            src={Banjir}
            width={30}
            className="hover:w-[40px] hover:cursor-pointer"
            alt="Banjir & Longsor"
          />
          <p className="text-white text-[10px] text-center hidden group-hover:block">
            <span className="font-bold">{countKejadian[2]}</span>{' '}
            {countKejadian[3]}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center group mb-2">
          <img
            src={BanjirLongsor}
            width={30}
            className="hover:w-[40px] hover:cursor-pointer"
            alt="Tanah Longsor"
          />
          <p className="text-white text-[10px] text-center hidden group-hover:block">
            <span className="font-bold">{countKejadian[22]}</span>{' '}
            {countKejadian[23]}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center group mb-2">
          <img
            src={Tanah}
            width={30}
            className="hover:w-[40px] hover:cursor-pointer"
            alt="Gempa"
          />
          <p className="text-white text-[10px] text-center hidden group-hover:block">
            <span className="font-bold">{countKejadian[16]}</span>{' '}
            {countKejadian[17]}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center group mb-2">
          <img
            src={Gempa}
            width={30}
            className="hover:w-[40px] hover:cursor-pointer"
            alt="Kebakaran Hutan & Lahan"
          />
          <p className="text-white text-[10px] text-center hidden group-hover:block">
            <span className="font-bold">{countKejadian[8]}</span>{' '}
            {countKejadian[9]}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center group mb-2">
          <img
            src={Gempa}
            width={30}
            className="hover:w-[40px] hover:cursor-pointer"
            alt="Angin Kencang"
          />
          <p className="text-white text-[10px] text-center hidden group-hover:block">
            <span className="font-bold">{countKejadian[6]}</span>{' '}
            {countKejadian[7]}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center group mb-2">
          <img
            src={Gempa}
            width={30}
            className="hover:w-[40px] hover:cursor-pointer"
            alt="Abrasi Pantai"
          />
          <p className="text-white text-[10px] text-center hidden group-hover:block">
            <span className="font-bold">{countKejadian[10]}</span>{' '}
            {countKejadian[11]}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center group mb-2">
          <img
            src={Abrasi}
            width={30}
            className="hover:w-[40px] hover:cursor-pointer"
            alt="Gelombang Pasang"
          />
          <p className="text-white text-[10px] text-center hidden group-hover:block">
            <span className="font-bold">{countKejadian[12]}</span>{' '}
            {countKejadian[13]}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center group mb-2">
          <img
            src={KebakaranHutan}
            width={30}
            className="hover:w-[40px] hover:cursor-pointer"
            alt="Likuifaksi"
          />
          <p className="text-white text-[10px] text-center hidden group-hover:block">
            <span className="font-bold">{countKejadian[20]}</span>{' '}
            {countKejadian[21]}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center group mb-2">
          <img
            src={KebakaranHutan}
            width={30}
            className="hover:w-[40px] hover:cursor-pointer"
            alt="Kekeringan"
          />
          <p className="text-white text-[10px] text-center hidden group-hover:block">
            <span className="font-bold">{countKejadian[14]}</span>{' '}
            {countKejadian[15]}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center group mb-2">
          <img
            src={Angin}
            width={30}
            className="hover:w-[40px] hover:cursor-pointer"
            alt="Tsunami"
          />
          <p className="text-white text-[10px] text-center hidden group-hover:block">
            <span className="font-bold">{countKejadian[0]}</span>{' '}
            {countKejadian[1]}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center group mb-2">
          <img
            src={Abrasi}
            width={30}
            className="hover:w-[40px] hover:cursor-pointer"
            alt="Tsunami"
          />
          <p className="text-white text-[10px] text-center hidden group-hover:block">
            <span className="font-bold">{countKejadian[24]}</span>{' '}
            {countKejadian[25]}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center group">
          <img
            src={Gempa}
            width={30}
            className="hover:w-[40px] hover:cursor-pointer"
            alt="Gempa & Tsunami"
          />
          <p className="text-white text-[10px] text-center hidden group-hover:block">
            <span className="font-bold">{countKejadian[4]}</span>{' '}
            {countKejadian[5]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardTotalKejadianMobile;
