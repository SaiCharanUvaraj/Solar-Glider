import React from 'react'

const Button = ({
    text,
    onClick=null,
    Icon=null,
    classNames="bg-[#145374] flex gap-2 text-[#E8E8E8] text-md py-2 px-5 rounded-md font-semibold hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
}) => {
  return (
    <button className={classNames}onClick={onClick ? onClick() : null}>
        <div>{text}</div>
        {Icon ? <Icon /> : null}
    </button>
  )
}

export default Button