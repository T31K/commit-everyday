import React from 'react';
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const WeeklyBarChart = ({ chartData, activeSlide }) => {
    const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg bg-white p-3">
        <p className="text-gray-500 text-sm">{`Date: ${payload[0].payload.label}`}</p>
        <p className="text-gray-900 text-sm">{`Commits: ${payload[0].value}`}</p>
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
        <div className="bg-[#282c34] border-gray-200 h-full rounded-xl col-span-2 px-3 overflow-hidden">
          <ResponsiveContainer
            width="100%"
            height="80%"
            className={`${activeSlide === 7 ? 'visible' : 'hidden'} rounded-b-lg pt-5`}
            >
              <div className='text-center text-amber-400'>Weekly Chart</div>
              <BarChart
                data={chartData}
                layout="vertical" // Make it a horizontal bar chart
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis type="number" />
                <YAxis dataKey="subject" type="category" />
              <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="A" fill="#fde68a" />
              </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
  );
};

export default WeeklyBarChart;
