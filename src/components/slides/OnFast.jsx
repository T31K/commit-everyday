import React from 'react'
import { ReactTyped } from "react-typed";
import CountUp from 'react-countup';
import Image from "next/image"
function OnFast() {
  return (
    <section className='h-full w-full p-4'>
      <div className='h-[5%] flex gap-2'>
        <div className="w-[20px] h-[20px] bg-red-500 rounded-full"></div>
        <div className="w-[20px] h-[20px] bg-yellow-500 rounded-full"></div>
        <div className="w-[20px] h-[20px] bg-green-500 rounded-full"></div>
      </div>
      <div className='h-[95%] flex flex-col items-center justify-center'>
        <Image src="/sonic.gif" alt="fire" width={80} height={80}  />
      <div className='text-center mt-4 text-blue-400'>you were</div>
      <div className='text-center text-3xl text-blue-500'>pretty fast!</div>
    </div>
    </section>
  )
}

export default OnFast
