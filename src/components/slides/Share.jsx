import React from 'react'
import Image from "next/image"
import { IconShare2, IconBellFilled } from '@tabler/icons-react';
function Share() {
  return (
  <section className="h-full w-full p-4">
    <div className="h-[5%] flex gap-2">
      <div className="w-[20px] h-[20px] bg-red-500 rounded-full"></div>
      <div className="w-[20px] h-[20px] bg-yellow-500 rounded-full"></div>
      <div className="w-[20px] h-[20px] bg-green-500 rounded-full"></div>
    </div>
    <div className="h-[95%] flex flex-col gap-4 items-center justify-center ">
      <div className="flex gap-2 items-center">
      <IconShare2 className='bg-white p-2 rounded-full text-gray-600 cursor-pointer hover:text-green-400' size={64}/>
      <IconBellFilled className='bg-white p-2 rounded-full text-gray-600 cursor-pointer hover:text-green-400' size={64}/>
      </div>
    </div>
  </section>
  )
}

export default Share
