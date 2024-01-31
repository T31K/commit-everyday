import Image from "next/image"
import { ReactTyped } from "react-typed";

function Pikachu({activeSlide, mostActiveDay}) {
  return (
    <section className='h-full w-full p-4'>
      <div className='h-[5%] flex gap-2'>
        <div className="w-[20px] h-[20px] bg-red-500 rounded-full"></div>
        <div className="w-[20px] h-[20px] bg-yellow-500 rounded-full"></div>
        <div className="w-[20px] h-[20px] bg-green-500 rounded-full"></div>
      </div>
      <div className='h-[95%] flex flex-col items-center justify-center'>
        <Image src="/pikachu.gif" alt="fire" width={80} height={80}  />
        <div className='text-center my-4 text-yellow-500'>you worked most on</div>
        {
          activeSlide == 6 && (<ReactTyped strings={[`${mostActiveDay}s`]} typeSpeed={40}  className='text-center text-5xl  text-yellow-600' />)
        }
    </div>
    </section>
  )
}

export default Pikachu
