import React from 'react'
import load from '../../asset/icon/Spirals-Circle.svg'

interface propTypes {
    text: string;
    bg: string;
    textColor: string;
    spin?: string;
}
const Button = ({text, bg, textColor, spin='hidden'}: propTypes) => {
  return (
    <button className={`${bg} ${textColor} w-full p-2 rounded-3xl flex justify-center items-center gap-2`} type='submit'>
      <div className={spin}>
        <img className='w-full border-2' src={load} alt='loading' />
      </div>
        {text}
    </button>
  )
}

export default Button