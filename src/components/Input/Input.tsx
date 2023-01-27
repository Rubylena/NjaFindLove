import React from 'react'
import './input.scss'

interface Proptypes {
    label: string;
    type:string;
    bgColor?: string;
    placeholder: string;
    warning?: string;
    value: string;
    name: string;
    img?: string;
    alt?: string;
    action: (event: React.ChangeEvent<HTMLInputElement>)=>void;
    clickAction?: (event: React.MouseEvent<HTMLImageElement>)=>void
}
const Input = ({label, type, bgColor, placeholder, warning, value, name, img, alt, action, clickAction}: Proptypes) => {
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
              className={`${bgColor} bgC text-black mt-1 w-full rounded-3xl focus:ring-0 border-none placeholder:text-xs placeholder:text-place`}
              placeholder={placeholder}
              onChange={action}
              required
          />
          <img src={img} alt={alt} className='absolute top-5 right-5' onClick={clickAction} />
        </div>
        <p className='text-[10px] leading-[15px] ml-4'>{warning}</p>
    </div>
  )
}

export default Input