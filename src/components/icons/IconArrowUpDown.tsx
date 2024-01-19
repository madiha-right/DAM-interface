import React from "react";

interface IProps {
  className?: string;
}

const IconArrowUpDown: React.FC<IProps> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
    >
      <path
        d="M3.6875 6.6875L5.66667 8.66667L7.64583 6.6875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.6875 4.31242L5.66667 2.33325L7.64583 4.31242"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconArrowUpDown;
