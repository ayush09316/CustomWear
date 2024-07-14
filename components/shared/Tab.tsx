import React from 'react';
import { useSnapshot } from 'valtio';
import state from '@/store';
import Image, { StaticImageData } from 'next/image';

interface TabProps{
  tab:{
    name:string;
    icon:StaticImageData;
  };
  isActiveTab:boolean;
  isFilterTab:boolean;
  handleClick:()=>void;
}

const Tab = ({tab,isActiveTab,isFilterTab,handleClick}:TabProps) => {
  const snap=useSnapshot(state);
  const activeStyle=isFilterTab && isActiveTab?
  {backgroundColor:snap.color,opacity:0.5}:
  {backgroundColor:'transparent',opacity:1}
  return (
    <div 
    key={tab.name}
    className={`tab-btn ${isFilterTab?'rounded-full glassmorphism':'rounded-4'}`}
    onClick={handleClick}
    style={activeStyle}
    >
      <Image src={tab.icon} alt={tab.name} className={`${isFilterTab?'w-2/3 h-2/3':'w-11/12 h-11/12 object-contain'}`}/>
    </div>
  )
}

export default Tab
