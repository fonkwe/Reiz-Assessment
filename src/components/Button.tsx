import React, { FC } from 'react'

type ButtonTypes = {
    title: string;
    onClick?: () => any;
  };

const Button = ({ title, onClick }: ButtonTypes) => {
    return (
      <button
        type="button"
        onClick={onClick}
        className="p-2 ml-5 mx-auto bg-green-400 text-black font-bold border border-green-700 rounded"
      >
        {title}
      </button>
    );
  };
  
  export default Button;
