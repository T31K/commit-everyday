import Image from "next/image"

function OnFire() {
  return (
    <section className='h-full w-full p-4'>
      <div className='h-[5%] flex gap-2'>
        <div className="w-[20px] h-[20px] bg-red-500 rounded-full"></div>
        <div className="w-[20px] h-[20px] bg-yellow-500 rounded-full"></div>
        <div className="w-[20px] h-[20px] bg-green-500 rounded-full"></div>
      </div>
      <div className='h-[95%] flex flex-col items-center justify-center'>
        <Image src="/fire.gif" alt="fire" width={80} height={80}  />
        <div className='text-center mt-4 text-orange-500'>you were on fire</div>

    </div>
    </section>
  )
}

export default OnFire
