import imageJokowi from '../../../assets/images/post/jokowi.png';
import { Link } from 'react-router-dom';

const MajalahPage = () => {


  return (
    <div className="lg:flex lg:flex-col lg:gap-x-5">
      <section>
        <div className="flex flex-col bg-transparent">
          <div className="flex flex-col md:flex-row w-full gap-5">
            <div className="flex flex-col md:w-9/12 rounded-2xl overflow-hidden bg-white mt-2">
              <div className="flex flex-col lg:flex-row">
                <div className="flex flex-col w-10/12">
                  <p className="p-4 text-black font-bold">
                    Disaster Magazine Edisi Februari 2025
                  </p>
                </div>
                <div className="flex flex-col w-2/12 p-4">
                  <div className="h-10 w-10">
                    <Link
                      to="#"
                      className="inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-5 lg:px-8 xl:px-10"
                    >
                      Unduh
                    </Link>
                  </div>
                </div>
              </div>
              <div className="bg-form-strokedark mx-4 my-5 rounded-lg h-180">
                <img
                  className="w-full py-5 px-5 h-full"
                  src={imageJokowi}
                  alt="Sunset in the mountains"
                />
                {/* <div
                  className="my-4 mx-4 h-full w-full"
                  style={{ backgroundImage: `url(${imageJokowi})` }}
                ></div> */}
              </div>
            </div>

            <div className="flex flex-col gap-y-5 md:w-3/12">
              <div className="flex flex-row border-l-meta-1 border-l border-l-4">
                <p className="p-1 text-black-2 font-bold text-xl">
                  Rekomendasi
                </p>
              </div>
              <div className="flex flex-row 1/4">
                <div className="flex items-center bg-white shadow dark:bg-gray-800 dark:border-gray-700 rounded-lg dark:border-strokedark dark:bg-boxdark  ">
                  <div>
                    <img
                      className="flex items-center h-32 w-h-32 bg-white shadow dark:bg-gray-800 dark:border-gray-700 rounded-lg dark:border-strokedark dark:bg-boxdark  "
                      src={imageJokowi}
                      alt="Sunset in the mountains"
                    />
                  </div>
                  <div className=" bg-white rounded-b align-middle rounded-b-none rounded-r p-2 flex flex-col justify-center leading-normal dark:border-strokedark dark:bg-boxdark">
                    <div className="text-black-2 text-base text-xl mb-2 ">
                      Badan Nasional Penanggulangan Bencana
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row 1/4">
                <div className="flex items-center bg-white shadow dark:bg-gray-800 dark:border-gray-700 rounded-lg dark:border-strokedark dark:bg-boxdark  ">
                  <div>
                    <img
                      className="flex items-center h-32 w-h-32 bg-white shadow dark:bg-gray-800 dark:border-gray-700 rounded-lg dark:border-strokedark dark:bg-boxdark  "
                      src={imageJokowi}
                      alt="Sunset in the mountains"
                    />
                  </div>
                  <div className=" bg-white rounded-b align-middle rounded-b-none rounded-r p-2 flex flex-col justify-center leading-normal dark:border-strokedark dark:bg-boxdark">
                    <div className="text-black-2 text-base text-xl mb-2 ">
                      Badan Nasional Penanggulangan Bencana
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row 1/4">
                <div className="flex items-center bg-white shadow dark:bg-gray-800 dark:border-gray-700 rounded-lg dark:border-strokedark dark:bg-boxdark  ">
                  <div>
                    <img
                      className="flex items-center h-32 w-h-32 bg-white shadow dark:bg-gray-800 dark:border-gray-700 rounded-lg dark:border-strokedark dark:bg-boxdark  "
                      src={imageJokowi}
                      alt="Sunset in the mountains"
                    />
                  </div>
                  <div className=" bg-white rounded-b align-middle rounded-b-none rounded-r p-2 flex flex-col justify-center leading-normal dark:border-strokedark dark:bg-boxdark">
                    <div className="text-black-2 text-base text-xl mb-2 ">
                      Badan Nasional Penanggulangan Bencana
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row 1/4">
                <div className="flex items-center bg-white shadow dark:bg-gray-800 dark:border-gray-700 rounded-lg dark:border-strokedark dark:bg-boxdark  ">
                  <div>
                    <img
                      className="flex items-center h-32 w-h-32 bg-white shadow dark:bg-gray-800 dark:border-gray-700 rounded-lg dark:border-strokedark dark:bg-boxdark  "
                      src={imageJokowi}
                      alt="Sunset in the mountains"
                    />
                  </div>
                  <div className=" bg-white rounded-b align-middle rounded-b-none rounded-r p-2 flex flex-col justify-center leading-normal dark:border-strokedark dark:bg-boxdark">
                    <div className="text-black-2 text-base text-xl mb-2 ">
                      Badan Nasional Penanggulangan Bencana
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MajalahPage;
