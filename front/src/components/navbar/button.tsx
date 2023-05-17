import React from 'react';

const Button = (props) => {
  return (
    <div>
      <button className='bg-orange-500 text-black text-xl py-2 px-6 rounded md:ml-8 hover:bg-purple-500 duration-500'>
        {props.children}
      </button>
    </div>
  );
};

export default Button;