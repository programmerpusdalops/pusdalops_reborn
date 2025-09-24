import { Link } from "react-router-dom";
import imageBnpb from '../../assets/images/brand/Bnpb.png';
import imageInarisk from '../../assets/images/brand/inarisk.png';
import imageSulteng from '../../assets/images/brand/sulteng.png';
import imageBasarnas from '../../assets/images/brand/basarnas.png';
import imageBmkg from '../../assets/images/brand/bmkg.png';
// import imageDamkar from '../../assets/images/brand/damkar.png';

export default function Tautan() {
  return (
        <div className="flex overflow-x-scroll gap-5 w-full no-scrollbar">
          <Link
            to="https://www.bnpb.go.id/"
            className="flex p-2 px-4 gap-2 items-center bg-white rounded-xl min-w-[180px] md:min-w-[250px] border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark"
            target='_BLANK'
          >
            <img src={imageBnpb} className="w-8" alt="" />
            <div className="flex flex-col">
              <p className="text-sm" style={{ fontWeight: 550 }}>
                BNPB
              </p>
              {/* <p className="text-xs font-light">Media</p> */}
            </div>
          </Link>
          
          <Link
            to="https://inarisk.bnpb.go.id/"
            className="flex p-2 px-4 gap-2 items-center bg-white rounded-xl min-w-[180px] md:min-w-[250px] border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark"
            target='_BLANK'
          >
            <img src={imageInarisk} className="w-8" alt="" />
            <div className="flex flex-col">
              <p className="text-sm" style={{ fontWeight: 550 }}>
                inaRISK
              </p>
              {/* <p className="text-xs font-light">Media</p> */}
            </div>
          </Link>
          
          <Link
            to="https://sultengprov.go.id/"
            className="flex p-2 px-4 gap-2 items-center bg-white rounded-xl min-w-[180px] md:min-w-[250px] border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark"
            target='_BLANK'
          >
            <img src={imageSulteng} className="w-8" alt="" />
            <div className="flex flex-col">
              <p className="text-sm" style={{ fontWeight: 550 }}>
                PPID 
              </p>
              <p className="text-xs font-light">Provinsi Sulawesi Tengah</p>
            </div>
          </Link>
          
          <Link
            to="https://www.bmkg.go.id/cuaca/prakiraan-cuaca/72"
            className="flex p-2 px-4 gap-2 items-center bg-white rounded-xl min-w-[180px] md:min-w-[250px] border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark"
            target='_BLANK'
          >
            <img src={imageBmkg} className="w-8" alt="" />
            <div className="flex flex-col">
                <p className="text-sm" style={{ fontWeight: 550}}>
                  BMKG  
                </p>
                <p className="text-xs font-light">Provinsi Sulawesi Tengah</p>
            </div>
          </Link>

          <Link
            to="https://palu.basarnas.go.id/"
            className="flex p-2 px-4 gap-2 items-center bg-white rounded-xl min-w-[180px] md:min-w-[250px] border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark"
            target='_BLANK'
          >
            <img src={imageBasarnas} className="w-8" alt="" />
            <div className="flex flex-col">
              <p className="text-sm" style={{ fontWeight: 550 }}>
                Basarnas
              </p>
              <p className="text-xs font-light">Provinsi Sulawesi Tengah</p>
            </div>
          </Link>
        </div>
  )
}
