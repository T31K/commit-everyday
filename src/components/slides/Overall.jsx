import React from 'react'
import Image from "next/image"

function Overall({rank}) {
  return (
  <section className="h-full w-full p-4">
    <div className="h-[5%] flex gap-2">
      <div className="w-[20px] h-[20px] bg-red-500 rounded-full"></div>
      <div className="w-[20px] h-[20px] bg-yellow-500 rounded-full"></div>
      <div className="w-[20px] h-[20px] bg-green-500 rounded-full"></div>
    </div>
    <div className="h-[95%] flex flex-col gap-4 items-center justify-center ">
      <div className="flex flex-col gap-2 items-center">
        <div className='text-rainbow-600'>you did great!</div>
        <Image
          src="/green_mush.png"
          width={100}
          height={150}
          alt="green_mushroom"
          className='my-3'
          />
          <div className='text-4xl font-bold'>{`${rank}/100`}</div>
      </div>
    </div>
  </section>
  )
}

export default Overall
