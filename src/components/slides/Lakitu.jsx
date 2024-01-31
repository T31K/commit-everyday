import React from 'react'
import { ReactTyped } from "react-typed";
import Image from "next/image"

function Lakitu() {
  return (
  <section className="h-full w-full p-4">
    <div className="h-[5%] flex gap-2">
      <div className="w-[20px] h-[20px] bg-red-500 rounded-full"></div>
      <div className="w-[20px] h-[20px] bg-yellow-500 rounded-full"></div>
      <div className="w-[20px] h-[20px] bg-green-500 rounded-full"></div>
    </div>
    <div className="h-[95%] flex flex-col gap-4 items-center justify-center ">
      <div className='mb-4 text-green-500'>some nerd stats</div>
      <div className="flex gap-2 items-center">
        <Image
          src="/lakitu.gif"
          width={80}
          height={80}
          alt="Picture of the author"
        />
      </div>
    </div>
  </section>
  )
}

export default Lakitu
