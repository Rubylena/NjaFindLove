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
    img2?: string;
    alt2?: string;
    action: (event: React.ChangeEvent<HTMLInputElement>)=>void;
    clickAction?: (event: React.MouseEvent<HTMLImageElement>)=>void
    clickAction2?: (event: React.FormEvent)=>void
}
const Input = ({label, type, bgColor, placeholder, warning, value, name, img, alt, img2, alt2, action, clickAction, clickAction2}: Proptypes) => {
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
              className={`${bgColor} w-full text-black mt-1 rounded-3xl focus:ring-0 border-none placeholder:text-xs placeholder:text-place`}
              placeholder={placeholder}
              onChange={action}
              required
              // autoComplete='off'
          />
          <img src={img} alt={alt} className='absolute top-5 right-5 cursor-pointer' onClick={clickAction} />
          <img src={img2} alt={alt2} className='absolute top-3 right-5 cursor-pointer w-6' onClick={clickAction2} />
        </div>
        <p className='text-[10px] leading-[15px] ml-4'>{warning}</p>
    </div>
  )
}

export default Input