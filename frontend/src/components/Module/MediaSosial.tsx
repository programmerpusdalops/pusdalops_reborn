import { Link } from "react-router-dom";
import imageInstagram from '../../assets/images/brand/instagram.png';
import imageX from '../../assets/images/brand/x.png';
import imageYoutube from '../../assets/images/brand/youtube.png';
import imageFacebook from '../../assets/images/brand/facebook.png';
import imageTiktok from '../../assets/images/brand/tiktok.png';

export default function MediaSosial() {
  return (
        <div className="flex overflow-x-scroll gap-5 w-full no-scrollbar">
          <Link
            to="https://www.instagram.com/bpbd_sulteng/?hl=id"
            className="flex p-2 px-4 gap-2 items-center bg-white rounded-xl min-w-[180px] md:min-w-[250px] border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark"
            target='_BLANK'
          >
            <img src={imageInstagram} className="w-8" alt="" />
            <div className="flex flex-col">
              <p className="text-sm" style={{ fontWeight: 550 }}>
                Instagram
              </p>
              <p className="text-xs font-light">Media</p>
            </div>
          </Link>
          <Link
            to="https://www.youtube.com/@pusdalopsbpbdsulteng"
            className="flex p-2 px-4 gap-2 items-center bg-white rounded-xl min-w-[180px] md:min-w-[250px] border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark"
            target='_BLANK'
          >
            <img src={imageYoutube} className="w-8" alt="" />
            <div className="flex flex-col">
              <p className="text-sm" style={{ fontWeight: 550 }}>
                Youtube
              </p>
              <p className="text-xs font-light">Media</p>
            </div>
          </Link>
          <Link
            to=""
            className="flex p-2 px-4 gap-2 items-center bg-white rounded-xl min-w-[180px] md:min-w-[250px] border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark"
            target='_BLANK'
          >
            <img src={imageX} className="w-8" alt="" />
            <div className="flex flex-col">
              <p className="text-sm" style={{ fontWeight: 550 }}>
                X Account
              </p>
              <p className="text-xs font-light">Media</p>
            </div>
          </Link>
          <Link
            to="https://www.facebook.com/BPBDPROVINSISULAWESITENGAH"
            className="flex p-2 px-4 gap-2 items-center bg-white rounded-xl min-w-[180px] md:min-w-[250px] border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark"
            target='_BLANK'
          >
            <img src={imageFacebook} className="w-8" alt="" />
            <div className="flex flex-col">
              <p className="text-sm" style={{ fontWeight: 550 }}>
                Facebook
              </p>
              <p className="text-xs font-light">Media</p>
            </div>
          </Link>
          <Link
            to="https://www.tiktok.com/@pusdalops.bpbdsulteng"
            className="flex p-2 px-4 gap-2 items-center bg-white rounded-xl min-w-[180px] md:min-w-[250px] border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark"
            target='_BLANK'
         >
            <img src={imageTiktok} className="w-8" alt="" />
            <div className="flex flex-col">
              <p className="text-sm" style={{ fontWeight: 550 }}>
                Tik Tok
              </p>
              <p className="text-xs font-light">Media</p>
            </div>
          </Link>
        </div>
  )
}
