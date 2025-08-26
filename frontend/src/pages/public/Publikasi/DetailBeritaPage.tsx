import { Link, useParams } from 'react-router-dom';
import * as api from '../../../utils/Api';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';

const DetailBeritaPage = () => {
  const[detail, setDetail] = useState<any>()
  const[beritaRekomendasi, setBeritaRekomendasi] = useState<Array<any>>([])
  const[beritaFavorit, setBeritaFavorit] = useState<Array<any>>([])

  const {id} = useParams()

  useEffect(() => {
    const DetailBerita = async () => {
      const response = await api.fetchBeritaById(id);
      setDetail(response.data);
    };
    DetailBerita();
  }, [id]);

  useEffect(() => {
    const BeritaRekomendasi = async () => {
      const response = await api.fetchBeritaLatestRecommended();
      setBeritaRekomendasi(response.data);
    };
    BeritaRekomendasi();

    const BeritaFavorit = async () => {
      const response = await api.fetchBeritaLatestFavorit();
      setBeritaFavorit(response.data);
    };
    BeritaFavorit();
  }, []);

  return (
    <div>
      <div className="w-full lg:flex lg:gap-x-4">
        <div className="flex flex-col bg-white p-4 rounded-xl items border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark lg:w-3/4">
          <div className="text-center text-black dark:text-gray text-title-sm md:text-title-md">
            {detail?.judul}
          </div>
          <div className="text-[10px] text-center">
            {detail?.penulis} -{' '}
            <span className="text-meta-6">BPBD PROV. SULTENG</span>
          </div>
          <div className="text-[10px] text-center">
            {detail?.tanggal}
          </div>
          <div className="mt-2">
            <img src={detail?.url} alt={detail?.image} className="w-full px-5" />
          </div>
          <div className="w-full px-5 py-10">
              {parse(String(detail?.content))}
          </div>
        </div>
        <div className="gap-x-3 sm:flex lg:w-1/4 lg:flex-col lg:gap-y-2">
          <div className="flex flex-col bg-white p-4 rounded-xl items border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark mt-3 sm:w-1/2 lg:w-full lg:mt-0">
            <div className="flex flex-col">
              <label className="border-l-2 pl-3 border-l-meta-1 text-lg text-black-2 dark:text-gray">
                Rekomendasi
              </label>
              <div className="flex flex-col gap-y-3 mt-5">
              {beritaRekomendasi.map((val) => (
                <Link
                  key={val?.id}
                  to={`/detail-berita-publik/${val?.id}`}
                  className="flex bg-white text-sm border-stroke text-black rounded-lg overflow-hidden border dark:bg-boxdark dark:shadow-default dark:border-strokedark dark:text-white"
                >
                  <div
                    className="flex w-4/12 bg-cover relative"
                    style={{ backgroundImage: `url(${val?.url})` }}
                  ></div>
                  <div className="flex w-8/12 px-4 py-3">
                    <label className="line-clamp-3">
                      {val?.judul}
                    </label>
                  </div>
                </Link>
              ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-white p-4 rounded-xl items border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark mt-3 sm:w-1/2 lg:w-full">
            <div className="flex flex-col">
              <label className="border-l-2 pl-3 border-l-meta-1 text-lg text-black-2 dark:text-gray">
                Paling Disukai
              </label>
              <div className="flex flex-col gap-y-3 mt-5">
              {beritaFavorit.map((val) => (
                <Link
                  key={val?.id}
                  to={`/detail-berita-publik/${val?.id}`}
                  className="flex bg-white text-sm border-stroke text-black rounded-lg overflow-hidden border dark:bg-boxdark dark:shadow-default dark:border-strokedark dark:text-white"
                >
                  <div
                    className="flex w-4/12 bg-cover relative"
                    style={{ backgroundImage: `url(${val?.url})` }}
                  ></div>
                  <div className="flex w-8/12 px-4 py-3">
                    <label className="line-clamp-3">
                      {val?.judul}
                    </label>
                  </div>
                </Link>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBeritaPage;
