/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../../../utils/Api';
// import parse from 'html-react-parser';
// import CarouselCard from '../../../components/Module/CarouselCard';
// import { YouTubeEmbed } from 'react-social-media-embed';
// import CarouselCardVideo from '../../../components/Module/CarouselCardVideo';

const PengetahuanPage = () => {
  const [pengetahuanTerbaru, setPengetahuanTerbaru] = useState<Array<any>>([]);
  // const [empatPengetahuanTerbaru, setEmpatPengetahuanTerbaru] = useState<Array<any>>([]);
  // const [pengetahuanRekomendasi, setPengetahuanRekomendasi] = useState<Array<any>>([]);
  // const [pengetahuanFavorit, setPengetahuanFavorit] = useState<Array<any>>([]);
  // const [assetVideo, setAssetVideo] = useState<Array<any>>([]);

  useEffect(() => {
    const PengetahuanTerbaru = async () => {
      const response = await api.fetchPengetahuan();
      setPengetahuanTerbaru(response.data);
    };
    PengetahuanTerbaru();

    // const EmpatPengetahuanTerbaru = async () => {
    //   const response = await api.fetchPengetahuanLatestFour();
    //   setEmpatPengetahuanTerbaru(response.data);
    // };
    // EmpatPengetahuanTerbaru();

    // const PengetahuanRekomendasi = async () => {
    //   const response = await api.fetchPengetahuanLatestRecommended();
    //   setPengetahuanRekomendasi(response.data);
    // };
    // PengetahuanRekomendasi();

    // const PengetahuanFavorit = async () => {
    //   const response = await api.fetchPengetahuanLatestFavorit();
    //   setPengetahuanFavorit(response.data);
    // };
    // PengetahuanFavorit();

    // const AssetVideo = async () => {
    //   const response = await api.fetchAssetVideoLimit();
    //   setAssetVideo(response.data);
    // };
    // AssetVideo();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col mt-10">
        <label className="border-l-2 pl-3 border-l-meta-1 text-2xl text-black-2 dark:text-white">
          Pengetahuan Bencana
        </label>
        <div className="w-full mt-5 md:hidden">
          {/* <CarouselCard pengetahuanTerbaru={pengetahuanTerbaru} /> */}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {pengetahuanTerbaru.map((val) => {
            return (
              <Link
                key={val?.id}
                to={`/detail-pengetahuan-publik/${val?.id}`}
                className="flex flex-col rounded-xl overflow-hidden"
              >
                <div
                  className="w-full h-[230px] md:h-[205px] bg-cover relative"
                  style={{ backgroundImage: `url(${val?.url})` }}
                >
                  <div
                    className="flex flex-col w-full px-4 py-2 bottom-0 absolute z-10 md:py-2"
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
        </div>
      </div>
    </div>
  );
};

export default PengetahuanPage;
