import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6';
interface Props {
  empatBeritaTerbaru: [] | any;
}

const CarouselCard = ({ empatBeritaTerbaru }: Props) => {
  let [current, setCurrent] = useState(0);

  let previousSlide = () => {
    if (current === 0) setCurrent(empatBeritaTerbaru.length - 1);
    else setCurrent(current - 1);
  };

  let nextSlide = () => {
    if (current === empatBeritaTerbaru.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  return (
    <div className="overflow-hidden relative">
      <button
        className="px-3 absolute top-25 z-50 text-white"
        onClick={previousSlide}
      >
        <FaCircleChevronLeft />
      </button>
      <button
        className="px-3 absolute top-25 right-0 z-50 text-white"
        onClick={nextSlide}
      >
        <FaCircleChevronRight />
      </button>
      <div
        className={`flex transition ease-out duration-20`}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {empatBeritaTerbaru.map((val: { id: any; url: any; judul: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => {
          return (
            <Link key={val?.id}
              to={`/detail-berita-publik/${val?.id}`}
              className="flex flex-none flex-col w-full rounded-xl overflow-hidden z-20"
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
                  <p className="text-white leading-5 text-sm">{val?.judul}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CarouselCard;
