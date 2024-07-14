import React from 'react'
import state from '@/store'
import { useSnapshot } from 'valtio'
import { getContrastingColor } from '@/config/helpers';

interface CustomButtonProps{
    title:string;
    icon?:React.ReactNode;
    type:string;
    customStyles:string;
    handleClick:()=>void;
}

const CustomButton = ({title,icon,type,customStyles,handleClick}:CustomButtonProps) => {
    const snap =useSnapshot(state);
    const generateStyle=(type:string)=>{
        if(type==='filled'){
            return {
                backgroundColor:snap.color,
                color:getContrastingColor(snap.color)
            }
        }else if(type==='outline'){
            return {
                borderWidth:'1px',
                color:snap.color,
                borderColor:snap.color
            }
        }
    }
  return (
    <button className={`px-6 py-2 flex-1 flex gap-2 items-center rounded-md ${customStyles}`} style={generateStyle(type)} onClick={handleClick}>
        <h1>{title} </h1>
        {icon}

    </button>
  )
}

export default CustomButton