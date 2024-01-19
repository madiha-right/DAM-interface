import React from "react";

interface IProps {}

const IconArrowUpRight: React.FC<IProps> = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="8" viewBox="0 0 9 8" fill="none">
      <rect
        x="8.50195"
        y="6.10352e-05"
        width="7.19963"
        height="1.02852"
        rx="0.5"
        transform="rotate(90 8.50195 6.10352e-05)"
        fill="#020617"
      />
      <rect x="1.30237" width="7.19963" height="1.02852" rx="0.5" fill="#020617" />
      <rect
        x="8.50195"
        y="0.727264"
        width="10.2852"
        height="1.02852"
        rx="0.5"
        transform="rotate(135 8.50195 0.727264)"
        fill="#020617"
      />
    </svg>
  );
};

export default IconArrowUpRight;
