import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

function Chart({ stats, activeSlide }) {
  const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg bg-white p-3">
        <p className="text-gray-500 text-sm">{`Date: ${payload[0].payload.name}`}</p>
        <p className="text-gray-900 text-sm">{`Count: ${payload[0].value}`}</p>
      </div>
    );
  }
    return null;
  };

  return (
      <section className="h-full w-full">
        <div className="h-[5%] flex gap-2 p-4">
          <div className="w-[20px] h-[20px] bg-red-500 rounded-full"></div>
          <div className="w-[20px] h-[20px] bg-yellow-500 rounded-full"></div>
          <div className="w-[20px] h-[20px] bg-green-500 rounded-full"></div>
        </div>
        <div className="bg-[#282c34] border-gray-200 h-full rounded-xl col-span-2  overflow-hidden">
          <ResponsiveContainer
            width="100%"
            height="100%"
            className={`${activeSlide === 9 ? 'visible' : 'hidden'} rounded-b-lg pt-5`}
            >
            <div className='text-center'>Monthly Chart</div>
            <AreaChart
              data={stats?.monthlyChart}
              className="mb-5"
              margin={{
                right: -5,
                left: -5,
                bottom: 100
              }}
            >
              <Area
                type="basis"
                dataKey="count"
                isAnimationActive
                stroke={'#22c55e'}
                fill={'#282c34'}
                strokeWidth={5}
              />
              <Tooltip content={<CustomTooltip />} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
  )
}

export default Chart;
