import React from "react";

const Button = ({
  text,
  onClick,
  disabled = false,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-gradient-to-r from-[#8F64E1] to-[#1D68BD] text-white font-semibold px-6 
        py-3 rounded-full transition-transform transform cursor-pointer ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
