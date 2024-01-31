import Image from "next/image"
import CountUp from 'react-countup';


function Streak({activeSlide, streakNumber}) {
  return (
    <section className='h-full w-full p-4'>
      <div className='h-[5%] flex gap-2'>
        <div className="w-[20px] h-[20px] bg-red-500 rounded-full"></div>
        <div className="w-[20px] h-[20px] bg-yellow-500 rounded-full"></div>
        <div className="w-[20px] h-[20px] bg-green-500 rounded-full"></div>
      </div>
      <div className='h-[95%] flex flex-col items-center justify-around'>

        <div className="flex flex-col items-center justify-center">
          <div className='text-center text-orange-300'>highest streak</div>
          {
          activeSlide == 5 && (<CountUp end={streakNumber} className='text-[100px] text-orange-500' />)
          }
          <div className='text-center text-orange-300'>days in a row!</div>
        </div>
      </div>
    </section>
  )
}

export default Streak
