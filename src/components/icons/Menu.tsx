import React from "react";

interface IProps {
  className?: string;
}

const Menu: React.FC<IProps> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.86665 3.19997C4.98299 3.19997 4.26665 3.91631 4.26665 4.79997C4.26665 5.68363 4.98299 6.39997 5.86665 6.39997C6.75031 6.39997 7.46665 5.68363 7.46665 4.79997C7.46665 3.91631 6.75031 3.19997 5.86665 3.19997ZM3.19998 5.3333C3.21781 5.3333 3.23543 5.33243 3.25281 5.33072C3.49889 6.54919 4.57563 7.46663 5.86665 7.46663C7.15767 7.46663 8.23442 6.54919 8.4805 5.33072C8.49787 5.33243 8.51549 5.3333 8.53332 5.3333H14.4C14.6945 5.3333 14.9333 5.09452 14.9333 4.79997C14.9333 4.50542 14.6945 4.26663 14.4 4.26663H8.53332C8.51549 4.26663 8.49787 4.26751 8.4805 4.26922C8.23442 3.05073 7.15767 2.1333 5.86665 2.1333C4.57563 2.1333 3.49889 3.05073 3.25281 4.26922C3.23543 4.26751 3.21781 4.26663 3.19998 4.26663H1.59998C1.30543 4.26663 1.06665 4.50542 1.06665 4.79997C1.06665 5.09452 1.30543 5.3333 1.59998 5.3333H3.19998ZM12.7472 11.7307C12.5011 12.9492 11.4243 13.8666 10.1333 13.8666C8.8423 13.8666 7.76555 12.9492 7.51947 11.7307C7.5021 11.7324 7.48447 11.7333 7.46665 11.7333H1.59998C1.30543 11.7333 1.06665 11.4945 1.06665 11.2C1.06665 10.9055 1.30543 10.6666 1.59998 10.6666H7.46665C7.48447 10.6666 7.5021 10.6675 7.51947 10.6692C7.76555 9.45074 8.8423 8.5333 10.1333 8.5333C11.4243 8.5333 12.5011 9.45074 12.7472 10.6692C12.7646 10.6675 12.7822 10.6666 12.8 10.6666H14.4C14.6945 10.6666 14.9333 10.9055 14.9333 11.2C14.9333 11.4945 14.6945 11.7333 14.4 11.7333H12.8C12.7822 11.7333 12.7646 11.7324 12.7472 11.7307ZM8.53332 11.2C8.53332 10.3163 9.24966 9.59997 10.1333 9.59997C11.0169 9.59997 11.7333 10.3163 11.7333 11.2C11.7333 12.0836 11.0169 12.8 10.1333 12.8C9.24966 12.8 8.53332 12.0836 8.53332 11.2Z"
        fill="#0F172A"
      />
    </svg>
  );
};

export default Menu;
