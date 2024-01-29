import React from "react";

interface IProps {
  className?: string;
}

const IconInfo: React.FC<IProps> = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
      <g clipPath="url(#clip0_567_1869)">
        <path
          d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z"
          stroke="#020617"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M6 8V6" stroke="#020617" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 4H6.005" stroke="#020617" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_567_1869">
          <rect width="12" height="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IconInfo;
