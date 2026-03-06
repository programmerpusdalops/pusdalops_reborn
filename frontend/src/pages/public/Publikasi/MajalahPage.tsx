/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import * as api from '../../../utils/Api';
import { FiEye, FiDownload } from 'react-icons/fi';

const MajalahPage = () => {
  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.fetchMajalah();
        setData(Array.isArray(res.data) ? res.data : []);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  return (
    <section className="w-full py-10 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-row justify-between items-center mb-6">
          <label className="border-l-2 pl-3 border-l-meta-1 text-2xl text-black-2 dark:text-white">
            Majalah Kebencanaan
          </label>
        </div>

        {data.length === 0 ? (
          <p className="text-center text-gray-400 py-10">Belum ada majalah tersedia.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((item: any) => (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 bg-white"
              >
                {/* Gambar Sampul */}
                <div className="relative overflow-hidden">
                  <img
                    src={item.url_sampul}
                    alt={item.judul}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                  {/* Text + buttons on hover */}
                  <div className="absolute inset-0 flex flex-col justify-end items-start p-5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-10 group-hover:translate-y-0">
                    <h3 className="text-xl font-semibold text-white drop-shadow-lg mb-3">
                      {item.judul}
                    </h3>
                    <div className="flex gap-3">
                      <a
                        href={item.url_pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center rounded border px-3 bg-success p-2 font-medium text-gray"
                      >
                        <FiEye size={20} className="mr-2" />
                        <span>Lihat</span>
                      </a>
                      <a
                        href={item.url_pdf}
                        download
                        className="flex items-center justify-center rounded border px-4 bg-success p-2 font-medium text-gray"
                      >
                        <FiDownload size={20} className="mr-2" />
                        <span>Unduh</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MajalahPage;
