// import React, { useEffect, useState } from "react";
import BgImage from "../../../assets/images/logo/BERANI-TANGGUH.png"

const LandingPage: React.FC = () => {
  // const [fadeIn, setFadeIn] = useState(false);

  // useEffect(() => {
  //   setFadeIn(true);
  // }, []);

  const handleVisitWebsite = () => {
    window.location.href = "/home";
  };

  return (
    <section
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${BgImage})` }}
    >
      {/* Overlay */}

        {/* Button */}
        <button
  onClick={handleVisitWebsite}
  className="
    mt-60
    rounded-full
    border border-white/30
    bg-gradient-to-r from-blue-600 to-indigo-900
    px-30 py-3
    text-base font-semibold text-white
    backdrop-blur-sm
    shadow-xl
    transition-all duration-300
    hover:scale-105
    hover:shadow-2xl
    hover:ring-2 hover:ring-white/50
  "
>
  Kunjungi Website
</button>

    </section>
  );
};

export default LandingPage;
