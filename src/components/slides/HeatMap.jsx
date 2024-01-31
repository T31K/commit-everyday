import React from 'react'
import ContributionGraph from '@/components/ContributionGraph';

function HeatMap({contributionsData}) {
  return (
  <section className="h-full w-full p-4">
    <div className="h-[5%] flex gap-2">
      <div className="w-[20px] h-[20px] bg-red-500 rounded-full"></div>
      <div className="w-[20px] h-[20px] bg-yellow-500 rounded-full"></div>
      <div className="w-[20px] h-[20px] bg-green-500 rounded-full"></div>
    </div>
    <div className="h-[95%] flex flex-col gap-4 items-center justify-center ">
      <div className='text-violet-600 mb-2'>a heatmap</div>
      <div className="flex gap-2 items-center">
        <ContributionGraph contributionsData={contributionsData}/>
      </div>
    </div>
  </section>
  )
}

export default HeatMap
