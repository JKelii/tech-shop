import { useSwiper } from "swiper/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const SwiperNavButtons = ({
  direction,
  containerStyles,
  btnStyles,
  iconsStyles,
}: {
  direction: string;
  containerStyles: string;
  btnStyles: string;
  iconsStyles: string;
}) => {
  const swiper = useSwiper();

  const handlePrev = () => {
    if (swiper) swiper.slidePrev();
  };

  const handleNext = () => {
    if (swiper) swiper.slideNext();
  };

  return (
    <div className={`flex ${containerStyles}`}>
      {direction === "left" && (
        <button
          onClick={handlePrev}
          className={`bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 ${btnStyles}`}
        >
          <FaArrowLeft className={`text-xl ${iconsStyles}`} />
        </button>
      )}
      {direction === "right" && (
        <button
          onClick={handleNext}
          className={`bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 ${btnStyles}`}
        >
          <FaArrowRight className={`text-xl ${iconsStyles}`} />
        </button>
      )}
    </div>
  );
};

export default SwiperNavButtons;
