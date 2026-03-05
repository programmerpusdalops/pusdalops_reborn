import React from "react";
import depanImage from "../../../assets/images/majalah/1.png";
import depanImage2 from "../../../assets/images/majalah/2.png";
import depanImage3 from "../../../assets/images/majalah/3.png";
import depanImage4 from "../../../assets/images/majalah/4.png";
import depanImage5 from "../../../assets/images/majalah/5.png";
import { FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../../../utils/helpers/imageUrl';

interface MajalahItem {
  id: number;
  title: string;
  image: string;
  lihatUrl: string;
  unduhUrl: string;
}

const majalahList: MajalahItem[] = [
  {
    id: 1,
    title: "Edisi 2023",
    image: depanImage,
    lihatUrl: "https://dashboard.core.pusdalops-bpbdsulteng.com/upgrade/lihat_majalah/edisi_2023#page/2",
    unduhUrl: "https://dashboard.core.pusdalops-bpbdsulteng.com/assets/assets_majalah/turnjs4/daftar_majalah/dismag_edisi_2023.pdf",
  },
  {
    id: 2,
    title: "Edisi II (Jan-Feb 2024)",
    image: depanImage2,
    lihatUrl: "https://dashboard.core.pusdalops-bpbdsulteng.com/upgrade/majalah_edisi2/edisi_2023#page/2",
    unduhUrl: "https://dashboard.core.pusdalops-bpbdsulteng.com/assets/assets_majalah/turnjs4/daftar_majalah/DisMag_Edisi%202%20(Januari-Februari%202024).pdf",
  },
  {
    id: 3,
    title: "Edisi III (Maret-April 2024)",
    image: depanImage3,
    lihatUrl: "https://dashboard.core.pusdalops-bpbdsulteng.com/upgrade/majalah_edisi3/edisi_20243#page/2",
    unduhUrl: "/https://dashboard.core.pusdalops-bpbdsulteng.com/assets/assets_majalah/turnjs4/daftar_majalah/DisMag%20Edisi%203%20(Maret-April%202024).pdf",
  },
  {
    id: 4,
    title: "Majalah Info Bencana Tahun 2023",
    image: depanImage4,
    lihatUrl: "https://dashboard.core.pusdalops-bpbdsulteng.com/upgrade/majalah_edisi4/#page/2",
    unduhUrl: "https://dashboard.core.pusdalops-bpbdsulteng.com/assets/assets_majalah/turnjs4/daftar_majalah/MAJALAH%20INFO%20BENCANA%20TAHUN%202023.pdf",
  },
  {
    id: 5,
    title: "Majalah Info Bencana Tahun 2024",
    image: depanImage5,
    lihatUrl: "https://dashboard.core.pusdalops-bpbdsulteng.com/upgrade/majalah_edisi5/#page/2",
    unduhUrl: "https://dashboard.core.pusdalops-bpbdsulteng.com/assets/assets_majalah/turnjs4/daftar_majalah/MAJALAH%20INFO%20BENCANA%20TAHUN%202024.pdf",
  },
];

const MajalahPage: React.FC = () => {
  return (
    <section className="w-full py-10 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-row justify-between items-center mb-6">
          <label className="border-l-2 pl-3 border-l-meta-1 text-2xl text-black-2 dark:text-white">
            Majalah Kebencanaan
          </label>
        </div>

        {/* <div className="bg-gradient-to-r from-success-600 to-success-400 h-[3px] mb-8 w-32 rounded-full" /> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {majalahList.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 bg-white"
            >
              {/* Gambar */}
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover "
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                {/* Text muncul saat hover */}
                <div className="absolute inset-0 flex flex-col justify-end items-start p-5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-10 group-hover:translate-y-0">
                  <h3 className="text-xl font-semibold text-white drop-shadow-lg mb-3">
                    {item.title}
                  </h3>
                  <div className="flex gap-3">
                    <a
                      href={item.lihatUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full justify-center rounded border px-3 bg-success p-2 font-medium text-gray"
                    >
                      <FiEye size={23} className="mr-2" />
                      <h3 >Lihat</h3>
                    </a>
                    <a
                      href={item.unduhUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full justify-center rounded border px-4 bg-success p-2 font-medium text-gray"
                      // className="bg-success hover:bg-success-100 text-success-700 font-medium text-sm rounded px-4 py-1.5 transition-all duration-300 shadow-md hover:shadow-success-200"
                    >
                      <h3>Unduh</h3>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MajalahPage;



