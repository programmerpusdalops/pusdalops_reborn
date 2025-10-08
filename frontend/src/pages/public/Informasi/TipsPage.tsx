// import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import * as api from '../../../utils/Api';
// import parse from 'html-react-parser';
// import CarouselCard from '../../../components/Module/CarouselCard';
// import { YouTubeEmbed } from 'react-social-media-embed';
// import CarouselCardVideo from '../../../components/Module/CarouselCardVideo';

const TipsPage = () => {


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
                        src={'https://backendreboon.api.pusdalops-bpbdsulteng.com/images/1758777685972-1.%20PRA%20KEKERINGAN.png'}
                        alt="Sunset in the mountains"
                      />
                      <div className="px-4 py-4">
                        {/* pra bencana */}
                        <Link
                            to="https://backendreboon.api.pusdalops-bpbdsulteng.com/images/1758777685972-1.%20PRA%20KEKERINGAN.png" target='_BLANK'
                            className="font-bold text-sm mb-2"
                            >
                            Tips Siaga Kekeringan
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
                        src={'https://backendreboon.api.pusdalops-bpbdsulteng.com/images/1758777910633-1.%20SAAT%20KEKERINGAN.png'}
                        alt="Sunset in the mountains"
                      />
                      <div className="px-4 py-4">
                        {/* saat terjadi */}
                        <Link
                            to="https://backendreboon.api.pusdalops-bpbdsulteng.com/images/1758777910633-1.%20SAAT%20KEKERINGAN.png" target='_BLANK'
                            className="font-bold text-sm mb-2"
                            >
                            Tips Siaga Kekeringan
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
                        src={'https://backendreboon.api.pusdalops-bpbdsulteng.com/images/1758777941959-1.%20PASCA%20KEKERINGAN.png'}
                        alt="Sunset in the mountains"
                      />
                      <div className="px-4 py-4">
                        {/* pasca bencana */}
                        <Link
                            to="https://backendreboon.api.pusdalops-bpbdsulteng.com/images/1758777941959-1.%20PASCA%20KEKERINGAN.png" target='_BLANK'
                            className="font-bold text-sm mb-2"
                            >
                            Tips Siaga Kekeringan
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

            <div className="lg:flex lg:gap-x-5 py-5 flex-row">
              <div className="flex flex-col w-full  lg:flex lg: lg:gap-x-2 ">
                <div className="lg:flex lg:flex-row gap-x-4">
                  <div className="flex flex-col w-full lg:w-1/2">
                    <div className=" bg-white rounded-lg  shadow dark:bg-gray-800 dark:border-gray-700 dark:border-strokedark dark:bg-boxdark">
                      <img
                        className="w-full py-3 px-3 h-[300px] md:h-[280px] object-cover relative lg:h-[330px]"
                        src={'https://backendreboon.api.pusdalops-bpbdsulteng.com/images/1759896025719-2.%20PRA%20KARHUTLA.png'}
                        alt="Sunset in the mountains"
                      />
                      <div className="px-4 py-4">
                        {/* pra bencana */}
                        <Link
                            to="https://backendreboon.api.pusdalops-bpbdsulteng.com/images/1759896025719-2.%20PRA%20KARHUTLA.png" target='_BLANK'
                            className="font-bold text-sm mb-2"
                            >
                            Tips Siaga Kebakaran Hutan dan Lahan
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
                        src={'https://backendreboon.api.pusdalops-bpbdsulteng.com/images/1759896068450-2.%20SAAT%20KARHUTLA.png'}
                        alt="Sunset in the mountains"
                      />
                      <div className="px-4 py-4">
                        {/* saat terjadi */}
                        <Link
                            to="https://backendreboon.api.pusdalops-bpbdsulteng.com/images/1759896068450-2.%20SAAT%20KARHUTLA.png" target='_BLANK'
                            className="font-bold text-sm mb-2"
                            >
                            Tips Siaga Kebakaran Hutan dan Lahan
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
                        src={'https://backendreboon.api.pusdalops-bpbdsulteng.com/images/1759896120907-2.%20PASCA%20KARHUTLA.png'}
                        alt="Sunset in the mountains"
                      />
                      <div className="px-4 py-4">
                        {/* pasca bencana */}
                        <Link
                            to="https://backendreboon.api.pusdalops-bpbdsulteng.com/images/1759896120907-2.%20PASCA%20KARHUTLA.png" target='_BLANK'
                            className="font-bold text-sm mb-2"
                            >
                            Tips Siaga Kebakaran Hutan dan Lahan
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

            <div className="lg:flex lg:gap-x-5 py-5 flex-row">
              <div className="flex flex-col w-full  lg:flex lg: lg:gap-x-2 ">
                <div className="lg:flex lg:flex-row gap-x-4">
                  <div className="flex flex-col w-full lg:w-1/2">
                    <div className=" bg-white rounded-lg  shadow dark:bg-gray-800 dark:border-gray-700 dark:border-strokedark dark:bg-boxdark">
                      <img
                        className="w-full py-3 px-3 h-[300px] md:h-[280px] object-cover relative lg:h-[330px]"
                        src={'https://backendreboon.api.pusdalops-bpbdsulteng.com/images/1759896338122-5.PENCEGAHAN%20BANJIR.png'}
                        alt="Sunset in the mountains"
                      />
                      <div className="px-4 py-4">
                        {/* pra bencana */}
                        <Link
                            to="https://backendreboon.api.pusdalops-bpbdsulteng.com/images/1759896338122-5.PENCEGAHAN%20BANJIR.png" target='_BLANK'
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
                        src={'https://backendreboon.api.pusdalops-bpbdsulteng.com/images/1759896353161-5.SAAT%20BANJIR.png'}
                        alt="Sunset in the mountains"
                      />
                      <div className="px-4 py-4">
                        {/* saat terjadi */}
                        <Link
                            to="https://backendreboon.api.pusdalops-bpbdsulteng.com/images/1759896353161-5.SAAT%20BANJIR.png" target='_BLANK'
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
                        src={'https://backendreboon.api.pusdalops-bpbdsulteng.com/images/1759896366970-5.PASCA%20BANJIR.png'}
                        alt="Sunset in the mountains"
                      />
                      <div className="px-4 py-4">
                        {/* pasca bencana */}
                        <Link
                            to="https://backendreboon.api.pusdalops-bpbdsulteng.com/images/1759896366970-5.PASCA%20BANJIR.png" target='_BLANK'
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
        </div>
      </div>
    </div>
  );
};

export default TipsPage;
