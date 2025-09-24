// import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import * as api from '../../../utils/Api';
// import parse from 'html-react-parser';
// import CarouselCard from '../../../components/Module/CarouselCard';
// import { YouTubeEmbed } from 'react-social-media-embed';
// import CarouselCardVideo from '../../../components/Module/CarouselCardVideo';

const TipsPage = () => {
  // const [beritaTerbaru, setBeritaTerbaru] = useState<Array<any>>([]);
  // const [empatBeritaTerbaru, setEmpatBeritaTerbaru] = useState<Array<any>>([]);
  // const [beritaRekomendasi, setBeritaRekomendasi] = useState<Array<any>>([]);
  // const [beritaFavorit, setBeritaFavorit] = useState<Array<any>>([]);
  // const [assetVideo, setAssetVideo] = useState<Array<any>>([]);

  // useEffect(() => {
  //   const BeritaTerbaru = async () => {
  //     const response = await api.fetchBerita();
  //     setBeritaTerbaru(response.data);
  //   };
  //   BeritaTerbaru();

  //   const EmpatBeritaTerbaru = async () => {
  //     const response = await api.fetchBeritaLatestFour();
  //     setEmpatBeritaTerbaru(response.data);
  //   };
  //   EmpatBeritaTerbaru();

  //   const BeritaRekomendasi = async () => {
  //     const response = await api.fetchBeritaLatestRecommended();
  //     setBeritaRekomendasi(response.data);
  //   };
  //   BeritaRekomendasi();

  //   const BeritaFavorit = async () => {
  //     const response = await api.fetchBeritaLatestFavorit();
  //     setBeritaFavorit(response.data);
  //   };
  //   BeritaFavorit();

  //   const AssetVideo = async () => {
  //     const response = await api.fetchAssetVideoLimit();
  //     setAssetVideo(response.data);
  //   };
  //   AssetVideo();
  // }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row gap-13 mt-10">
        <div className="flex flex-col md:w-12/12">
          <label className="border-l-2 pl-3 border-l-meta-1 text-2xl text-black-2 dark:text-white">
            Tips Siaga Bencana
          </label>

            <div className="lg:flex lg:gap-x-5 py-5 flex-row">
              <div className="flex flex-col w-full  lg:flex lg: lg:gap-x-2 ">
                <div className="lg:flex lg:flex-row gap-x-4">
                  <div className="flex flex-col w-full lg:w-1/2">
                    <div className=" bg-white rounded-lg  shadow dark:bg-gray-800 dark:border-gray-700 dark:border-strokedark dark:bg-boxdark">
                      <img
                        className="w-full py-3 px-3 h-[300px] md:h-[280px] object-cover relative lg:h-[330px]"
                        src={'https://backendreboon.api.pusdalops-bpbdsulteng.com/images/1758695287194-Membuat%20sumur%20resapan.png'}
                        alt="Sunset in the mountains"
                      />
                      <div className="px-4 py-4">
                        {/* pra bencana */}
                        <Link
                            to="https://backendreboon.api.pusdalops-bpbdsulteng.com/images/1758695287194-Membuat%20sumur%20resapan.png" target='_BLANK'
                            className="font-bold text-sm mb-2"
                            >
                            Tips Siaga Banjir
                        <p className="font-bold text-base">
                          Sebelum Terjadi
                        </p>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-full lg:w-1/2">
                    <div className=" bg-white rounded-lg  shadow dark:bg-gray-800 dark:border-gray-700 dark:border-strokedark dark:bg-boxdark">
                      <img
                        className="w-full py-3 px-3 h-[300px] md:h-[280px] object-cover relative lg:h-[330px]"
                        src={'https://backendreboon.api.pusdalops-bpbdsulteng.com/images/1754966105058-7.%20Infografis%20Kejadian%20Bencana%20Juli%202025.jpg'}
                        alt="Sunset in the mountains"
                      />
                      <div className="px-4 py-4">
                        {/* saat terjadi */}
                        <Link
                            to="https://backendreboon.api.pusdalops-bpbdsulteng.com/images/1745378788699-WhatsApp%20Image%202025-04-23%20at%2011.12.47%20(1).jpeg" target='_BLANK'
                            className="font-bold text-sm mb-2"
                            >
                            Tips Siaga Banjir
                        <p className="font-bold text-base">
                          Saat Terjadi
                        </p>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-full lg:w-1/2">
                    <div className=" bg-white rounded-lg  shadow dark:bg-gray-800 dark:border-gray-700 dark:border-strokedark dark:bg-boxdark">
                      <img
                        className="w-full py-3 px-3 h-[300px] md:h-[280px] object-cover relative lg:h-[330px]"
                        src={'https://backendreboon.api.pusdalops-bpbdsulteng.com/images/1754966105058-7.%20Infografis%20Kejadian%20Bencana%20Juli%202025.jpg'}
                        alt="Sunset in the mountains"
                      />
                      <div className="px-4 py-4">
                        {/* pasca bencana */}
                        <Link
                            to="https://backendreboon.api.pusdalops-bpbdsulteng.com/images/1745378788699-WhatsApp%20Image%202025-04-23%20at%2011.12.47%20(1).jpeg" target='_BLANK'
                            className="font-bold text-sm mb-2"
                            >
                            Tips Siaga Banjir
                        <p className="font-bold text-base">
                          Setelah Terjadi
                        </p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:flex lg:gap-x-1 py-1 flex-row">
              <div className="flex flex-col w-full  lg:flex lg: lg:gap-x-2 ">
                <div className="lg:flex lg:flex-row gap-x-4">
                  <div className="flex flex-col w-full lg:w-1/2">
                    <div className=" bg-white rounded-lg  shadow dark:bg-gray-800 dark:border-gray-700 dark:border-strokedark dark:bg-boxdark">
                      <img
                        className="w-full py-3 px-3 h-[300px] md:h-[280px] object-cover relative lg:h-[330px]"
                        src={'https://backendreboon.api.pusdalops-bpbdsulteng.com/images/1754966105058-7.%20Infografis%20Kejadian%20Bencana%20Juli%202025.jpg'}
                        alt="Sunset in the mountains"
                      />
                      <div className="px-4 py-4">
                        {/* pra bencana */}
                        <div className="font-bold text-sm mb-2">
                          Gempa
                        </div>
                        <p className="font-bold text-base">
                          Sebelum Terjadi
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-full lg:w-1/2">
                    <div className=" bg-white rounded-lg  shadow dark:bg-gray-800 dark:border-gray-700 dark:border-strokedark dark:bg-boxdark">
                      <img
                        className="w-full py-3 px-3 h-[300px] md:h-[280px] object-cover relative lg:h-[330px]"
                        src={'https://backendreboon.api.pusdalops-bpbdsulteng.com/images/1754966105058-7.%20Infografis%20Kejadian%20Bencana%20Juli%202025.jpg'}
                        alt="Sunset in the mountains"
                      />
                      <div className="px-4 py-4">
                        {/* saat terjadi */}
                        <div className="font-bold text-sm mb-2">
                          Gempa
                        </div>
                        <p className="font-bold text-base">
                          Saat Terjadi
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-full lg:w-1/2">
                    <div className=" bg-white rounded-lg  shadow dark:bg-gray-800 dark:border-gray-700 dark:border-strokedark dark:bg-boxdark">
                      <img
                        className="w-full py-3 px-3 h-[300px] md:h-[280px] object-cover relative lg:h-[330px]"
                        src={'https://backendreboon.api.pusdalops-bpbdsulteng.com/images/1754966105058-7.%20Infografis%20Kejadian%20Bencana%20Juli%202025.jpg'}
                        alt="Sunset in the mountains"
                      />
                      <div className="px-4 py-4">
                        {/* pasca bencana */}
                        <div className="font-bold text-sm mb-2">
                          Gempa
                        </div>
                        <p className="font-bold text-base">
                          Setelah Terjadi
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          {/* <div className="w-full mt-5 md:hidden">
            <CarouselCard empatBeritaTerbaru={empatBeritaTerbaru} />
          </div>
          <div className="flex-wrap mt-5 gap-3 hidden md:flex">
            {empatBeritaTerbaru.map((val) => {
              return (
                <Link
                  key={val?.id}
                  to={`/detail-berita-publik/${val?.id}`}
                  className="flex flex-col w-full md:w-[49%] rounded-xl overflow-hidden"
                >
                  <div
                    className="w-full h-[230px] md:h-[205px] bg-cover relative"
                    style={{ backgroundImage: `url(${val?.url})` }}
                  >
                    <div
                      className="flex flex-col w-full px-4 py-2 bottom-0 absolute z-10 md:py-2 bg-[#000000a1]"
                      style={{
                        background: 'rgba(241, 245, 249, 0.287)',
                        backdropFilter: 'blur(15px)',
                      }}
                    >
                      <p className="text-white leading-5 text-sm">
                        {val?.judul}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div> */}
        </div>
        {/* <div className="flex flex-col md:w-3/12">
          <label className="border-l-2 pl-3 border-l-meta-1 text-2xl text-black-2 dark:text-white">
            Rekomendasi
          </label>
          <div className="flex flex-col gap-y-3 mt-5">
            {beritaRekomendasi.map((val) => {
              return (
                <Link
                  key={val?.id}
                  to={`/detail-berita-publik/${val?.id}`}
                  className="flex bg-white rounded-lg overflow-hidden shadow-default dark:border-strokedark dark:bg-boxdark"
                >
                  <div
                    className="flex w-4/12 bg-cover relative"
                    style={{ backgroundImage: `url(${val?.url})` }}
                  ></div>
                  <div className="flex w-8/12 px-4 py-3">
                    <label className="line-clamp-3">{val?.judul}</label>
                  </div>
                </Link>
              );
            })}
          </div>
        </div> */}
      </div>

      {/* <div className="flex mt-20 flex-col">
        <label className="border-l-2 pl-3 border-l-meta-1 text-2xl text-black-2 dark:text-white">
          Kejadian Bencana Terbaru
        </label>
        <div className="flex overflow-x-scroll gap-2 w-full no-scrollbar mt-5">
          {beritaTerbaru.map((val) => {
            return (
              <Link
                key={val?.id}
                to={`/detail-berita-publik/${val?.id}`}
                className="flex flex-col min-w-60 rounded-md bg-white p-2 shadow-default dark:border-gray-100 dark:bg-boxdark"
              >
                <div
                  className="flex w-full mb-2 h-[150px] bg-cover relative rounded-md"
                  style={{ backgroundImage: `url(${val?.url})` }}
                ></div>
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-black-2 line-clamp-2 dark:text-white">
                    {val?.judul}
                  </label>
                  <p className="line-clamp-4 font-light text-sm">
                    {parse(
                      String(val?.content).substring(100, 0) +
                        "<span className='text-black dark:text-white'> ... Selanjutnya</span>",
                    )}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div> */}

      {/* <div className="flex flex-col md:flex-row gap-13 mt-20">
        <div className="flex flex-col md:w-9/12">
          <label className="border-l-2 pl-3 border-l-meta-1 text-2xl text-black-2 dark:text-white">
            Video Seputar Bencana
          </label>
          <div className="w-full mt-5 md:hidden">
            <CarouselCardVideo AssetVideo={assetVideo} />
          </div>
          <div className="flex-wrap mt-5 gap-3 hidden md:flex">
            {assetVideo.map((val) => (
              <div
                key={val?.id}
                className="flex flex-col w-full md:w-[49%] rounded-xl overflow-hidden"
              >
                <YouTubeEmbed url={val?.url} width={450} height={220} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:w-3/12">
          <label className="border-l-2 pl-3 border-l-meta-1 text-2xl text-black-2 dark:text-white">
            Paling Disukai
          </label>
          <div className="flex flex-col gap-y-3 mt-5">
            {beritaFavorit.map((val) => {
              return (
                <Link
                  key={val?.id}
                  to={`/detail-berita-publik/${val?.id}`}
                  className="flex bg-white rounded-lg overflow-hidden shadow-default dark:border-strokedark dark:bg-boxdark"
                >
                  <div
                    className="flex w-4/12 bg-cover relative"
                    style={{ backgroundImage: `url(${val?.url})` }}
                  ></div>
                  <div className="flex w-8/12 px-4 py-3">
                    <label className="line-clamp-3">{val?.judul}</label>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default TipsPage;
