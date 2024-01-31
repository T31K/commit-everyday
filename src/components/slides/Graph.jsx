import React from 'react'
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

function Graph() {
  return (
<div className="grid grid-cols-3 gap-4">
           <div className="bg-gray-100 border-[1.4px] border-gray-200 h-[220px] rounded-xl col-span-2  overflow-hidden">
             <ResponsiveContainer
               width="100%"
               height="100%"
               className="rounded-b-lg pt-5"
             >
               <div className="flex items-center justify-center gap-2">
                 <IconSquareRoundedArrowLeft
                   size={28}
                   className="text-slate-400 "
                   stroke="1.3"
                   onClick={() => handleArrow('left')}
                 />
                 <p className="text-sm font-semibold text-gray-600 text-center">{`Week ${activeWeek + 1}`}</p>

                 <IconSquareRoundedArrowRight
                   onClick={() => handleArrow('right')}
                   size={28}
                   className="text-slate-400 "
                   stroke="1.5"
                 />
               </div>

               <AreaChart
                 data={stats?.weeklyChart}
                 className="mb-5"
                 margin={{
                   right: 0,
                   left: 0,
                 }}
               >
                 <Area
                   type="basis"
                   dataKey="count"
                   isAnimationActive
                   stroke={tailwindColors[activeColor]['600']}
                   fill={tailwindColors[activeColor]['200']}
                 />
               </AreaChart>
             </ResponsiveContainer>
           </div>
           </div>
  )
}

export default Graph
