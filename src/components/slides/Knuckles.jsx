function Knuckles({median}) {
  return (
  <section className="h-full w-full p-4">
    <div className="h-[5%] flex gap-2">
      <div className="w-[20px] h-[20px] bg-red-500 rounded-full"></div>
      <div className="w-[20px] h-[20px] bg-yellow-500 rounded-full"></div>
      <div className="w-[20px] h-[20px] bg-green-500 rounded-full"></div>
    </div>
    <div className="h-[95%] flex flex-col gap-4 items-center justify-center ">
      <div className='text-blue-400'>averaging</div>
      <div className="text-7xl my-6 blink text-blue-800">{median}</div>
      <div className='text-blue-400'>commits per day</div>
    </div>
  </section>
  )
}

export default Knuckles
