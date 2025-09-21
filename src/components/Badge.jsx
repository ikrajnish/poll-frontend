import React from "react";
import vector from "../assets/Vector.png"; 

const Badge = () => {
  return (
    <span
      className="bg-gradient-to-r from-[#7565D9] to-[#4D0ACD] text-white rounded-[24px] 
                 inline-flex items-center px-[9px] py-0 gap-[7px] w-[134px] h-[31px]"
    >
      <img
        src={vector}
        alt="Poll Icon"
        className="inline-block w-[14.66px] h-[14.65px]"
      />

      <span
        className="inline-block  overflow-hidden whitespace-nowrap
                   font-Sora font-semibold text-[14px]"
      >
        Intervue Poll
      </span>
    </span>
  );
};

export default Badge;
