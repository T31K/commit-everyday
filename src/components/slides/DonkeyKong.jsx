import React from 'react'
import Image from 'next/image';
import { ReactTyped } from "react-typed";


function DonkeyKong({activeSlide}) {

  return (
    <section className='h-full w-full p-4'>
      <div className='h-[5%] flex gap-2'>
        <div className="w-[20px] h-[20px] bg-red-500 rounded-full"></div>
        <div className="w-[20px] h-[20px] bg-yellow-500 rounded-full"></div>
        <div className="w-[20px] h-[20px] bg-green-500 rounded-full"></div>
      </div>
      <div className='h-[95%] flex flex-col items-center justify-center'>
        <div className='text-center text-white'>{"let's review your"}</div>
        {activeSlide == 1 && (
          <ReactTyped
          strings={["life", "january"]} typeSpeed={60} className='ext-center text-4xl text-orange-500'
          />
        )}
        <Image
          src="/donkey_kong.gif"
          width={200}
          height={200}
          alt="donkey_kong"
        />
      </div>
    </section>
  )
}

export default DonkeyKong
