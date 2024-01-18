import React from "react";

interface IProps {
  className?: string;
}

const PlusCircle: React.FC<IProps> = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <g clipPath="url(#clip0_374_947)">
        <path
          d="M8.00004 14.6668C11.6819 14.6668 14.6667 11.6821 14.6667 8.00016C14.6667 4.31826 11.6819 1.3335 8.00004 1.3335C4.31814 1.3335 1.33337 4.31826 1.33337 8.00016C1.33337 11.6821 4.31814 14.6668 8.00004 14.6668Z"
          stroke="#020617"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M8 5.3335V10.6668" stroke="#020617" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M5.33337 8H10.6667"
          stroke="#020617"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_374_947">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default PlusCircle;
