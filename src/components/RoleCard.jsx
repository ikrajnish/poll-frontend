import React from "react";

const RoleCard = ({ title, description, isActive, onClick }) => {
  return (
    <div
      className="flex-1 cursor-pointer transition w-[387px] h-[143px] gap-[17px]"
      onClick={onClick}
    >
      {/* Gradient border wrapper with conditional thickness */}
      <div
        className={`rounded-[10px] ${
          isActive
            ? "p-[3px] bg-gradient-to-r from-[#7765DA] to-[#1D68BD]"
            : "p-[1px] bg-gray-300"
        }`}
      >
        {/* Inner white box with slightly smaller radius */}
        <div className="rounded-[8px] bg-white p-6 h-full ">
          <h2 className="font-semibold font-sora text-[23px] mb-2">{title}</h2>
          <p className="text-[#454545] text-[16px] font-sora">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default RoleCard;
