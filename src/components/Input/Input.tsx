import React from 'react'

interface Proptypes {
    label?: string;
    type:string;
    bgColor?: string;
    placeholder: string;
    warning?: string;
    value: string | number;
    name: string;
    img?: string;
    alt?: string;
    action: (event: React.ChangeEvent<HTMLInputElement>)=>void;
    clickAction?: (event: React.MouseEvent<HTMLImageElement>)=>void;
    imgClass?: string;
}
const Input = ({label, type, bgColor, placeholder, warning, value, name, img, alt, action, clickAction, imgClass}: Proptypes) => {
  return (
    <div>
        <label className='text-sm'>
            {label}
        </label>
        <div className='relative'>
          <input
              type={type}
              name={name}
              value={value}
              className={`${bgColor} appearance-none w-full text-black mt-1 rounded-3xl focus:ring-0 border-none placeholder:text-xs placeholder:text-place`}
              placeholder={placeholder}
              onChange={action}
              required
              // autoComplete='off'
          />
          <img src={img} alt={alt} className={`${imgClass} absolute right-5 cursor-pointer`} onClick={clickAction} />
        </div>
        <p className='text-[10px] leading-[15px] ml-4'>{warning}</p>
    </div>
  )
}

export default Input