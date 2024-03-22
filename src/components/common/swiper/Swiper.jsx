import { Swiper, SwiperSlide } from "swiper/react"; // basic
import SwiperCore from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Strategy from "../../../assets/banner_strategy.jpeg";
import investBanner from "../../../assets/invest_banner.png";
import hotBanner from "../../../assets/hot_banner.png";
import marketBanner from "../../../assets/market_banner.png";
import { Link } from "react-router-dom";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "./Swiper.css";
SwiperCore.use([Navigation, Pagination, Autoplay]); // Swiper

export default function Swipe(props) {
  return (
    <Swiper
      style={{
        height: "15vh",
        width: "100vw",
      }}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      loop={true}
    >
      <SwiperSlide>
        <Link to={"/strategystock"}>
          <img
            src={investBanner}
            alt="banner"
            style={{ width: "100%", height: "60%" }}
          />
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link to={"/risingstock"}>
          <img
            src={hotBanner}
            alt="banner"
            style={{ width: "100%", height: "60%" }}
          />
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link to={"/marketstock"}>
          <img
            src={marketBanner}
            alt="123"
            style={{ width: "100%", height: "60%" }}
          />
        </Link>
      </SwiperSlide>
    </Swiper>
  );
}
