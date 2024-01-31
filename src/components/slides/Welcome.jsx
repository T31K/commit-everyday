import React from 'react'
import { ReactTyped } from "react-typed";

function Welcome({username}) {
  return (

    <section className='h-full w-full p-4'>
      <div className='h-[5%] flex gap-2'>
        <div className="w-[20px] h-[20px] bg-red-500 rounded-full"></div>
        <div className="w-[20px] h-[20px] bg-yellow-500 rounded-full"></div>
        <div className="w-[20px] h-[20px] bg-green-500 rounded-full"></div>
      </div>
      <div className='h-[95%] flex flex-col items-center justify-center '>
        <div className='text-md mb-4'>hi there,</div>
        <div className='pl-1'>
        <ReactTyped strings={[`${username.slice(1)}`]} typeSpeed={40} className='text-4xl'/>
        </div>
        </div>
    </section>
  )
}

export default Welcome
