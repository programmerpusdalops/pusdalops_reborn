/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { FaAngleRight } from 'react-icons/fa6';
import * as api from '../../../utils/Api';
import ChartPerKejadian from '../../../components/Module/ChartPerKejadian';
import ChartPerWilayah from '../../../components/Module/ChartPerWilayah';
import MediaSosial from '../../../components/Module/MediaSosial';
import CardDataKorbanTerdampak from '../../../components/Module/CardDataKorbanTerdampak';
import CardDataBencana from '../../../components/Module/CardDataBencana';
import CardTotalPerJenisBencana from '../../../components/Module/CardTotalPerJenisBencana';
import PetaInteraktif from '../../../components/Module/PetaInteraktif';
import xml2js from 'xml2js';
import { Link } from 'react-router-dom';
import { InstagramEmbed } from 'react-social-media-embed';
import parse from 'html-react-parser';
import Tautan from '../../../components/Module/Tautan';

const HomePage = () => {
  const [beritaTerbaru, setBeritaTerbaru] = useState<any>();
  const [empatBeritaTerbaru, setEmpatBeritaTerbaru] = useState<Array<any>>([]);
  const [gempa, setGempa] = useState<any>();

  useEffect(() => {
    const BeritaTerbaru = async () => {
      const response = await api.fetchBeritaLatest();
      setBeritaTerbaru(response.data);
    };
    BeritaTerbaru();

    const EmpatBeritaTerbaru = async () => {
      const response = await api.fetchBeritaLatestFour();
      setEmpatBeritaTerbaru(response.data);
    };
    EmpatBeritaTerbaru();

    const GempaTerkini = async () => {
      const xmlParser = new xml2js.Parser({ explicitArray: false });
      const response = await api.fetchGempaBumiTerkini();
      const parsedXml = await xmlParser.parseStringPromise(response.data);
      setGempa(parsedXml?.Infogempa?.gempa);
    };
    GempaTerkini();
  }, []);

  return (
    <div className="lg:flex lg:flex-col lg:gap-x-5">
      <section>
        <div className="flex flex-col bg-transparent">
          <div className="flex flex-col md:flex-row w-full gap-5">
            <div className="flex flex-col md:w-7/12 rounded-2xl overflow-hidden">
              <div
                className="w-full h-[300px] md:h-[540px] bg-cover relative"
                style={{ backgroundImage: `url(${beritaTerbaru?.url})` }}
              >
                <div className="flex flex-col px-5 py-2 bottom-0 absolute z-10 md:py-4 bg-[#000000a1]">
                  <p className="font-bold text-white md:text-2xl leading-5">
                    {beritaTerbaru?.judul}
                  </p>
                  <a
                    href="#"
                    className="text-[10px] md:text-sm flex gap-1 items-center"
                  >
                    <Link
                      to={`/detail-berita-publik/${beritaTerbaru?.id}`}
                      className="text-meta-2"
                    >
                      Selengkapnya
                    </Link>
                    <FaAngleRight className="text-meta-5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-y-5 md:w-5/12">
              <CardDataBencana />

              <CardDataKorbanTerdampak />

              <div className="flex gap-2">
                <div className="flex flex-col w-full bg-white p-4 rounded-xl border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                  <p className="font-bold text-xs text-meta-6">
                    SOROTAN SULTENG
                  </p>
                  <p className="font-bold">10 Berita Terkini</p>
                  <div
                    className="w-full h-[130px] bg-cover relative"
                    style={{ backgroundImage: `url(${beritaTerbaru?.url})` }}
                  >
                    <div className="flex flex-col px-2 py-1 bottom-0 absolute z-10 md:py-1 bg-[#000000a1]">
                      <p className="font-bold text-white text-xs line-clamp-1">
                        {beritaTerbaru?.judul}
                      </p>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="font-light md:text-sm flex mt-2 items-center justify-end cursor-pointer"
                  >
                    <Link
                      to="/berita-publik"
                      className="cursor-pointer text-[12px]"
                    >
                      Selengkapnya
                    </Link>
                    <FaAngleRight className="text-meta-5" />
                  </a>
                </div>

                <div className="flex flex-col w-full bg-white p-4 rounded-xl border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                  <p className="font-bold text-xs text-meta-5">BMKG</p>
                  <p className="font-bold">Gempa Bumi Terkini</p>
                  <div
                    className="w-full h-full bg-cover relative"
                    style={{
                      backgroundImage: `url(https://data.bmkg.go.id/DataMKG/TEWS/${gempa?.Shakemap})`,
                    }}
                  ></div>
                  <Link
                    to={`https://data.bmkg.go.id/DataMKG/TEWS/${gempa?.Shakemap}`}
                    className="font-light md:text-sm flex mt-2 items-center justify-end cursor-pointer"
                    target="_BLANK"
                  >
                    <label className="cursor-pointer text-[12px]">
                      Selengkapnya
                    </label>
                    <FaAngleRight className="text-meta-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col md:flex-row p-5 my-5 bg-white rounded-lg shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex md:w-4/12 mb-5 md:mb-0 items-center justify-center md:justify-start">
          <label className="text-2xl">Sosial Media</label>
        </div>
        <MediaSosial />
      </div>

      <div className="relative">
        <PetaInteraktif />
      </div>

      <section>
        <div className="lg:flex lg:gap-5">
          <CardTotalPerJenisBencana />
          <div className="lg:w-3/4">
            <div className="mb-3">
              <ChartPerKejadian />
            </div>
            <div className="">
              <ChartPerWilayah />
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col md:flex-row p-5 my-5 bg-white rounded-lg shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex md:w-1/5 mb-5 md:mb-0 items-center justify-center md:justify-start">
          <label className="text-2xl">
            Tautan Lainnya
          </label>
        </div>
        <Tautan />
      </div>

      <div className="lg:flex lg:gap-x-5 pb-5">
        <div className="flex flex-col w-full lg:w-3/4 lg:flex lg:gap-x-2">
          <div className="flex flex-row">
            <label className="text-2xl">Berita Kebencanaan</label>
          </div>
          <div className="flex-grow border-t border-black dark:border-white mt-3 lg:flex-row mb-3"></div>
          <div className="lg:flex lg:flex-row gap-x-2">
            <div className="flex flex-col w-full lg:w-1/2">
              <Link
                to={`/detail-berita-publik/${beritaTerbaru?.id}`}
                className=" bg-white rounded-lg  shadow dark:bg-gray-800 dark:border-gray-700 dark:border-strokedark dark:bg-boxdark"
              >
                <img
                  className="w-full py-3 px-3 h-[400px] md:h-[440px] object-cover relative"
                  src={beritaTerbaru?.url}
                  alt={beritaTerbaru?.image}
                />
                <div className="px-4 py-4">
                  <span className="text-black dark:text-white lg:text-lg">
                    Penulis : {beritaTerbaru?.penulis} -{' '}
                    {beritaTerbaru?.tanggal}
                  </span>
                  <p className="font-bold text-xl text-black dark:text-white">
                    {beritaTerbaru?.judul}
                  </p>
                  <p className="font-grey-600 text-base mt-2">
                    {parse(
                      String(beritaTerbaru?.content).substring(220, 0) +
                        "<Link to={} className='text-black dark:text-white'> ... Selanjutnya</Link>",
                    )}
                  </p>
                </div>
              </Link>
            </div>

            <div className="flex flex-col w-full lg:w-2/3 lg:flex lg:flex-col gap-y-6 mt-3 lg:mt-0">
              {empatBeritaTerbaru.map((val) => (
                <Link
                  to={`/detail-berita-publik/${val?.id}`}
                  className="flex flex-col h-1/2"
                >
                  <div className="flex bg-white shadow dark:bg-gray-800 dark:border-gray-700 rounded-lg dark:border-strokedark dark:bg-boxdark  ">
                    <div
                      className="my-3 mx-3 h-48 h-auto w-48 flex-none bg-cover rounded-t rounded-t-none rounded-l text-center overflow-hidden"
                      style={{ backgroundImage: `url(${val?.url})` }}
                      title="Berita"
                    ></div>
                    <div className=" bg-white rounded-b rounded-b-none rounded-r p-4 flex flex-col justify-between leading-normal dark:border-strokedark dark:bg-boxdark">
                      <div className="mb-3">
                        <span className="text-black dark:text-white">
                          Penulis : {val?.penulis} - {val?.tanggal}
                        </span>
                        <div className="font-grey-600 text-base text-lg mb-2 ">
                          {val?.judul}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full pt-2 mt-5 lg:w-1/4 lg:flex lg:mt-0">
          <div className="flex flex-row border-b pb-3 border-b-black dark:border-b-white">
            <label className="text-2x1">Sosial Media</label>
          </div>
          <div className="bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-auto mt-3 dark:border-strokedark dark:bg-boxdark">
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                borderRadius: 10,
              }}
            >
              <InstagramEmbed
                url="https://www.instagram.com/reel/C7I63ZqvY1N/?igsh=dzg4M25xZHUyYWs2"
                width={328}
                className="bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-auto mt-3 dark:border-strokedark dark:bg-boxdark"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:flex lg:gap-x-5 py-5 flex-row">
        <div className="flex flex-col w-full  lg:flex lg: lg:gap-x-2 ">
          <div className="flex flex-row">
            <label className="text-2xl">Infografis Kebencanaan</label>
          </div>
          <div className="flex-grow border-t border-black dark:border-white mt-3 lg:flex-row mb-3"></div>
          <div className="lg:flex lg:flex-row gap-x-4">
            
            <div className="flex flex-col w-full lg:w-1/2">
              <div className=" bg-white rounded-lg  shadow dark:bg-gray-800 dark:border-gray-700 dark:border-strokedark dark:bg-boxdark">
                <img
                  className="w-full py-3 px-3 h-[300px] md:h-[280px] object-cover relative lg:h-[330px]"
                  src={'https://backendreboon.api.pusdalops-bpbdsulteng.com/images/1754966105058-7.%20Infografis%20Kejadian%20Bencana%20Juli%202025.jpg'}
                  alt="Sunset in the mountains"
                />
                <div className="px-4 py-4">
                  <div className="font-bold text-sm mb-2">
                    Craig Brator - 27 Des 2024
                  </div>
                  <p className="font-bold text-base">
                    Now Is the Time to Think About Your Small Business Success
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
                  <div className="font-bold text-sm mb-2">
                    Craig Brator - 27 Des 2024
                  </div>
                  <p className="font-bold text-base">
                    Now Is the Time to Think About Your Small Business Success
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
                  <div className="font-bold text-sm mb-2">
                    Craig Brator - 27 Des 2024
                  </div>
                  <p className="font-bold text-base">
                    Now Is the Time to Think About Your Small Business Success
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:flex lg:gap-x-5 py-5 flex-row">
        <div className="flex flex-col w-full  lg:flex lg: lg:gap-x-2 ">
          <div className="flex flex-row">
            <label className="text-2xl">Majalah Kebencanaan</label>
          </div>
          <div className="flex-grow border-t border-black dark:border-white mt-3 lg:flex-row mb-3"></div>
          <div className="lg:flex lg:flex-row gap-x-4">
            
            <div className="flex flex-col w-full lg:w-1/2">
              <div className=" bg-white rounded-lg  shadow dark:bg-gray-800 dark:border-gray-700 dark:border-strokedark dark:bg-boxdark">
                <img
                  className="w-full py-3 px-3 h-[300px] md:h-[280px] object-cover relative lg:h-[330px]"
                  src={'https://backendreboon.api.pusdalops-bpbdsulteng.com/images/1754966105058-7.%20Infografis%20Kejadian%20Bencana%20Juli%202025.jpg'}
                  alt="Sunset in the mountains"
                />
                <div className="px-4 py-4">
                  <div className="font-bold text-sm mb-2">
                    Craig Brator - 27 Des 2024
                  </div>
                  <p className="font-bold text-base">
                    Now Is the Time to Think About Your Small Business Success
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
                  <div className="font-bold text-sm mb-2">
                    Craig Brator - 27 Des 2024
                  </div>
                  <p className="font-bold text-base">
                    Now Is the Time to Think About Your Small Business Success
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
                  <div className="font-bold text-sm mb-2">
                    Craig Brator - 27 Des 2024
                  </div>
                  <p className="font-bold text-base">
                    Now Is the Time to Think About Your Small Business Success
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
