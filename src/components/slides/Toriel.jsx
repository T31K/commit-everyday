import React from 'react'
import Image from "next/image"
import ContributionGraph from '@/components/ContributionGraph';

function Toriel({missedDaysCount}) {
  return (
  <section className="h-full w-full p-4">
    <div className="h-[5%] flex gap-2">
      <div className="w-[20px] h-[20px] bg-red-500 rounded-full"></div>
      <div className="w-[20px] h-[20px] bg-yellow-500 rounded-full"></div>
      <div className="w-[20px] h-[20px] bg-green-500 rounded-full"></div>
    </div>
    <div className="h-[95%] flex flex-col gap-4 items-center justify-center ">
      {missedDaysCount > 0 ? (

        <div className="flex flex-col gap-4 items-center">
        <div className='text-violet-400'>you missed</div>
        <Image
          src="/toriel.png"
          width={100}
          height={150}
          alt="Picture of the author"
          />
        <div className='text-violet-400'>{missedDaysCount} {missedDaysCount >= 1 ? 'days' : 'day'}</div>
      </div>
          ) : (
        <div className="flex flex-col gap-4 items-center">
        <div className='text-violet-600 text-5xl'>{`31/31`}</div>
        <div className='text-violet-400'>{`you just`}</div>
        <Image
          src="/purple_shy_guy.png"
          width={100}
          height={150}
          alt="Picture of the author"
          />
        <div className='text-violet-400'>{`can't miss bro`}</div>

      </div>

          )}

    </div>
  </section>
  )
}

export default Toriel
