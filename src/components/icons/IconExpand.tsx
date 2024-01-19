import React from "react";

interface IProps {}

const IconExpand: React.FC<IProps> = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
      <path
        d="M14.875 14.875L10.625 10.625M14.875 14.875V11.475M14.875 14.875H11.475"
        stroke="#020617"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.125 11.475V14.875M2.125 14.875H5.525M2.125 14.875L6.375 10.625"
        stroke="#020617"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.875 5.525V2.125M14.875 2.125H11.475M14.875 2.125L10.625 6.375"
        stroke="#020617"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.125 5.525V2.125M2.125 2.125H5.525M2.125 2.125L6.375 6.375"
        stroke="#020617"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconExpand;
