import { useState } from 'react';
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6';
import { YouTubeEmbed } from 'react-social-media-embed';
interface Props {
  AssetVideo: [] | any;
}

const CarouselCardVideo = ({ AssetVideo }: Props) => {
  let [current, setCurrent] = useState(0);

  let previousSlide = () => {
    if (current === 0) setCurrent(AssetVideo.length - 1);
    else setCurrent(current - 1);
  };

  let nextSlide = () => {
    if (current === AssetVideo.length - 1) setCurrent(0);
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
        {AssetVideo.map((val: { url: string; }) => {
          return (
            <YouTubeEmbed
                url={val?.url}
                className="w-full h-[230px] md:h-[205px] flex flex-none flex-col w-full rounded-xl overflow-hidden z-20"
            /> 
          );
        })}
      </div>
    </div>
  );
};

export default CarouselCardVideo;
