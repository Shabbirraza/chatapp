import React from 'react'
import { Avatar } from 'antd';


const Singlechat = ({name,imgUrl,onClick,bool}) => {
    const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';
    
  return (
    <div onClick={onClick} className={`w-[120px] md:w-[200px] ${bool? "bg-blue-500":"bg-white"} cursor-pointer  h-1/6 border-y-2 flex items-center p-3 border-y-black`}>
        
           <Avatar  className='hidden md:inline-block w-15 h-15 md:w-16 md:h-16 '  src={imgUrl} />
           <div className='flex flex-col md:m-2'>
                <p className='font-extrabold text-[12px] '>{name}</p>
                <p className='font-semibold text-sm'>Description</p>
           </div>
           
    </div>
  )
}

export default Singlechat