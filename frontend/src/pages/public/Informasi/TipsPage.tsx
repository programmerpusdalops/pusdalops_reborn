import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../../../utils/Api';

const TipsPage = () => {
  const [tips, setTipsBencana] = useState<Array<any>>([]);

  useEffect(() => {
    const TipsBencana = async () => {
      try {
        const response = await api.fetchTipsBencana();
        console.log("response tips", response);
        setTipsBencana(response.data);
      } catch (error) {
        console.log("error", error);
        console.error("Gagal memuat data tips:", error);
      }
    };
    TipsBencana();
  }, []);

  return (
    <div className="flex flex-col mt-13">
      <label className="border-l-2 pl-3 border-l-meta-1 text-2xl text-black-2 dark:text-white mb-6">
        Tips Siaga Bencana
      </label>

      {/* Grid 3 kolom di layar besar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.length === 0 ? (
          <p className="text-gray-500 col-span-full">Belum ada data tips bencana.</p>
        ) : (
          tips.map((item: any, index: number) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden dark:bg-boxdark dark:border dark:border-strokedark"
            >
              {/* Gambar */}
               <Link
                  // to={`https://backendreboon.api.pusdalops-bpbdsulteng.com/images/${item.image}`}
                  to={item.url}
                  target="_blank"
                  className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 line-clamp-2 transition-colors duration-300"
                >
              <div className="overflow-hidden relative">
                <img
                  // src={`https://backendreboon.api.pusdalops-bpbdsulteng.com/images/${item.image}`}
                  src={item.url}
                  alt={item.judul}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Isi */}
              <div className="p-4 flex flex-col justify-between text-xl">
                  {item.judul}
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  Tahun: {item.tahun || '-'}
                </p>
              </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TipsPage;