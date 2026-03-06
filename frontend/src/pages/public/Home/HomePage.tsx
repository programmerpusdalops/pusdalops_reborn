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
import { YouTubeEmbed } from 'react-social-media-embed';
import userSix from '../../../assets/images/logo/bpbd.png';
import { FiEye, FiDownload } from 'react-icons/fi';

const HomePage = () => {
  const [beritaTerbaru, setBeritaTerbaru] = useState<any>();
  const [empatBeritaTerbaru, setEmpatBeritaTerbaru] = useState<Array<any>>([]);
  const [gempa, setGempa] = useState<any>();
  const [infografisList, setInfografisList] = useState<Array<any>>([]);
  const [majalahList, setMajalahList] = useState<Array<any>>([]);

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

    const LoadInfografis = async () => {
      try {
        const response = await api.fetchInfografis();
        setInfografisList(Array.isArray(response.data) ? response.data.slice(0, 3) : []);
      } catch (e) {
        console.error(e);
      }
    };
    LoadInfografis();

    const LoadMajalah = async () => {
      try {
        const response = await api.fetchMajalah();
        setMajalahList(Array.isArray(response.data) ? response.data.slice(0, 4) : []);
      } catch (e) {
        console.error(e);
      }
    };
    LoadMajalah();
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
        <div className="flex flex-col w-full lg:flex lg:gap-x-2">
          <div className="flex flex-row items-center justify-between">
            <label className="text-2xl">Infografis Kebencanaan</label>
            <a href="/infografis-publik" className="text-sm text-primary hover:underline flex items-center gap-1">
              Lihat Semua <FaAngleRight />
            </a>
          </div>
          <div className="flex-grow border-t border-black dark:border-white mt-3 lg:flex-row mb-3"></div>
          {infografisList.length > 0 ? (
            <div className="lg:flex lg:flex-row gap-x-4 gap-y-4">
              {infografisList.map((item: any) => (
                <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="flex flex-col w-full lg:w-1/3 mb-4 lg:mb-0 cursor-pointer">
                  <div className="bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:border-strokedark dark:bg-boxdark overflow-hidden h-full hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
                    <img
                      className="w-full py-3 px-3 h-[300px] md:h-[280px] object-cover relative lg:h-[330px]"
                      src={item.url}
                      alt={item.judul}
                    />
                    <div className="px-4 py-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-gray-500">{item.tahun}</span>
                        <span className={`inline-flex rounded-full py-0.5 px-2 text-xs font-medium ${item.kategori === 'Tahunan'
                          ? 'bg-primary bg-opacity-10 text-primary'
                          : 'bg-success bg-opacity-10 text-success'
                          }`}>
                          {item.kategori}
                        </span>
                      </div>
                      <p className="font-bold text-base line-clamp-2">{item.judul}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">Belum ada infografis tersedia.</p>
          )}
        </div>
      </div>

      {/* majalah */}
      <div className="lg:flex lg:gap-x-5 py-5 flex-row">
        <div className="flex flex-col w-full lg:flex lg:gap-x-2">
          <div className="flex flex-row items-center justify-between">
            <label className="text-2xl">Majalah Kebencanaan</label>
            <a href="/majalah-publik" className="text-sm text-primary hover:underline flex items-center gap-1">
              Lihat Semua <FaAngleRight />
            </a>
          </div>
          <div className="flex-grow border-t border-black dark:border-white mt-3 lg:flex-row mb-3"></div>
          {majalahList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {majalahList.map((item: any) => (
                <div
                  key={item.id}
                  className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 bg-white"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.url_sampul}
                      alt={item.judul}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
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
          ) : (
            <p className="text-gray-400 text-center py-8">Belum ada majalah tersedia.</p>
          )}
        </div>
      </div>

      <div className="overflow-hidden max-w-screen rounded-sm border border-stroke bg-black shadow-default dark:border-strokedark dark:bg-boxdark mx-10000 my-10000">
        <div className="flex items-center justify-center gap-2 mb-1.5">
          <div className="relative z-30 -mt-0 h-30 w-full max-w-30 rounded-full bg-white/15 p-1 backdrop-blur sm:h-55 sm:max-w-55 sm:p-2">
            <div className="relative drop-shadow-2">
              <img src={userSix} alt="profile" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-white dark:text-white">
              PUSDALOPS-PB
            </h3>
            <p className="font-medium">BPBD PROVINSI SULAWESI TENGAH</p>
            <br></br>
            <div className="mx-auto max-w-180">
              <h4 className="font-semibold text-white dark:text-white">
                Fast Respon (24 Jam)
              </h4>
              <p className="font-semibold mt-4.5">
                PUSDALOPS-PB SULTENG
              </p>
              <Link
                to="https://maps.app.goo.gl/1SrNR8GAx9QpnaRb7" target='_BLANK'
                className="mt-4.5"
              >
                Jl. M.T Haryono No.29, Besusu Tengah, Kec. Palu Timur., Kota Palu, Sulawesi Tengah 94118.
              </Link>
              <br></br>
              No. Telp: 0811-4032-247
              <br></br>
              E-mail: pusdalops.bpbdsulteng@gmail.com
              <br></br>
              <h3 className="font-semibold text-black dark:text-white">
                Fast Respon (24 Jam)
              </h3>
            </div>
          </div>

          <div className="mt-6.5">
            <h4 className="mb-3.5 font-medium text-white dark:text-white">
              Follow us on
            </h4>
            <div className="flex items-center  gap-3.5">
              <a
                href="#"
                className="hover:text-primary"
                aria-label="social-icon"
              >
                <svg
                  className="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_30_966)">
                    <path
                      d="M12.8333 12.375H15.125L16.0416 8.70838H12.8333V6.87504C12.8333 5.93088 12.8333 5.04171 14.6666 5.04171H16.0416V1.96171C15.7428 1.92229 14.6144 1.83337 13.4227 1.83337C10.934 1.83337 9.16663 3.35229 9.16663 6.14171V8.70838H6.41663V12.375H9.16663V20.1667H12.8333V12.375Z"
                      fill=""
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_30_966">
                      <rect width="22" height="22" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>
              <a
                href="#"
                className="hover:text-primary"
                aria-label="social-icon"
              >
                <svg
                  className="fill-current"
                  width="23"
                  height="22"
                  viewBox="0 0 23 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_30_970)">
                    <path
                      d="M20.9813 5.18472C20.2815 5.49427 19.5393 5.69757 18.7795 5.78789C19.5804 5.30887 20.1798 4.55498 20.4661 3.66672C19.7145 4.11405 18.8904 4.42755 18.0315 4.59714C17.4545 3.97984 16.6898 3.57044 15.8562 3.43259C15.0225 3.29474 14.1667 3.43617 13.4218 3.83489C12.6768 4.2336 12.0845 4.86726 11.7368 5.63736C11.3891 6.40746 11.3056 7.27085 11.4993 8.0933C9.97497 8.0169 8.48376 7.62078 7.12247 6.93066C5.76118 6.24054 4.56024 5.27185 3.59762 4.08747C3.25689 4.67272 3.07783 5.33801 3.07879 6.01522C3.07879 7.34439 3.75529 8.51864 4.78379 9.20614C4.17513 9.18697 3.57987 9.0226 3.04762 8.72672V8.77439C3.04781 9.65961 3.35413 10.5175 3.91465 11.2027C4.47517 11.8878 5.2554 12.3581 6.12304 12.5336C5.55802 12.6868 4.96557 12.7093 4.39054 12.5996C4.63517 13.3616 5.11196 14.028 5.75417 14.5055C6.39637 14.983 7.17182 15.2477 7.97196 15.2626C7.17673 15.8871 6.2662 16.3488 5.29243 16.6212C4.31866 16.8936 3.30074 16.9714 2.29688 16.8502C4.04926 17.9772 6.08921 18.5755 8.17271 18.5735C15.2246 18.5735 19.081 12.7316 19.081 7.66522C19.081 7.50022 19.0765 7.33339 19.0691 7.17022C19.8197 6.62771 20.4676 5.95566 20.9822 5.18564L20.9813 5.18472Z"
                      fill=""
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_30_970">
                      <rect
                        width="22"
                        height="22"
                        fill="white"
                        transform="translate(0.666138)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </a>
              <a
                href="#"
                className="hover:text-primary"
                aria-label="social-icon"
              >
                <svg
                  className="fill-current"
                  width="23"
                  height="22"
                  viewBox="0 0 23 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_30_974)">
                    <path
                      d="M6.69548 4.58327C6.69523 5.0695 6.50185 5.53572 6.15786 5.87937C5.81387 6.22301 5.34746 6.41593 4.86123 6.41569C4.375 6.41545 3.90878 6.22206 3.56513 5.87807C3.22149 5.53408 3.02857 5.06767 3.02881 4.58144C3.02905 4.09521 3.22244 3.62899 3.56643 3.28535C3.91042 2.9417 4.37683 2.74878 4.86306 2.74902C5.34929 2.74927 5.81551 2.94265 6.15915 3.28664C6.5028 3.63063 6.69572 4.09704 6.69548 4.58327ZM6.75048 7.77327H3.08381V19.2499H6.75048V7.77327ZM12.5438 7.77327H8.89548V19.2499H12.5071V13.2274C12.5071 9.87244 16.8796 9.56077 16.8796 13.2274V19.2499H20.5005V11.9808C20.5005 6.32494 14.0288 6.53577 12.5071 9.31327L12.5438 7.77327Z"
                      fill=""
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_30_974">
                      <rect
                        width="22"
                        height="22"
                        fill="white"
                        transform="translate(0.333862)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </a>
              <a
                href="#"
                className="hover:text-primary"
                aria-label="social-icon"
              >
                <svg
                  className="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_30_978)">
                    <path
                      d="M18.3233 10.6077C18.2481 9.1648 17.7463 7.77668 16.8814 6.61929C16.6178 6.90312 16.3361 7.16951 16.038 7.41679C15.1222 8.17748 14.0988 8.79838 13.0011 9.25929C13.1542 9.58013 13.2945 9.89088 13.4182 10.1842V10.187C13.4531 10.2689 13.4867 10.3514 13.519 10.4345C14.9069 10.2786 16.3699 10.3355 17.788 10.527C17.9768 10.5527 18.1546 10.5802 18.3233 10.6077ZM9.72038 3.77854C10.6137 5.03728 11.4375 6.34396 12.188 7.69271C13.3091 7.25088 14.2359 6.69354 14.982 6.07296C15.2411 5.8595 15.4849 5.62824 15.7117 5.38088C14.3926 4.27145 12.7237 3.66426 11 3.66671C10.5711 3.66641 10.1429 3.70353 9.72038 3.77762V3.77854ZM3.89862 9.16396C4.52308 9.1482 5.1468 9.11059 5.76863 9.05121C7.27163 8.91677 8.7618 8.66484 10.2255 8.29771C9.46051 6.96874 8.63463 5.67578 7.75046 4.42296C6.80603 4.89082 5.97328 5.55633 5.30868 6.37435C4.64409 7.19236 4.16319 8.14374 3.89862 9.16396ZM5.30113 15.6155C5.65679 15.0957 6.12429 14.5109 6.74488 13.8747C8.07771 12.5089 9.65071 11.4455 11.4712 10.8589L11.528 10.8424C11.3768 10.5087 11.2347 10.2108 11.0917 9.93029C9.40871 10.4207 7.63588 10.7269 5.86946 10.8855C5.00779 10.9634 4.23504 10.9973 3.66671 11.0028C3.66509 12.6827 4.24264 14.3117 5.30204 15.6155H5.30113ZM13.7546 17.7971C13.4011 16.0144 12.9008 14.2641 12.2586 12.5639C10.4235 13.2303 8.96138 14.2047 7.83113 15.367C7.375 15.8276 6.97021 16.3362 6.62388 16.8841C7.88778 17.8272 9.42308 18.3356 11 18.3334C11.9441 18.3347 12.8795 18.1533 13.7546 17.799V17.7971ZM15.4715 16.8117C16.9027 15.7115 17.8777 14.1219 18.2096 12.3475C17.898 12.2696 17.5029 12.1917 17.0684 12.1312C16.1023 11.9921 15.1221 11.9819 14.1534 12.101C14.6988 13.6399 15.1392 15.2141 15.4715 16.8126V16.8117ZM11 20.1667C5.93729 20.1667 1.83337 16.0628 1.83337 11C1.83337 5.93729 5.93729 1.83337 11 1.83337C16.0628 1.83337 20.1667 5.93729 20.1667 11C20.1667 16.0628 16.0628 20.1667 11 20.1667Z"
                      fill=""
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_30_978">
                      <rect width="22" height="22" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </div><br></br>
            <div
              className="flex flex-col w-full md:w-[100%] rounded-xl overflow-hidden"
            >
              <YouTubeEmbed url="https://youtu.be/REavBf9ZBVk?si=rzEnZWVJsxtA4DyB" width={250} height={120} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;