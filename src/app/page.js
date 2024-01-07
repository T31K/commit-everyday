'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  {
    name: '1 Jan',
    commit_count: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '2 Jan',
    commit_count: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    commit_count: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    commit_count: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    commit_count: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    commit_count: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    commit_count: 3490,
    pv: 4300,
    amt: 2100,
  },
];
import { IconFlame } from '@tabler/icons-react';

export default function Home() {
  const [chartData, setChartData] = useState([]);

  const data = {
    username: 'T31K',
    year: '2024',
    min: 1,
    max: 3,
    median: 1,
    p80: 8,
    p90: 11.5,
    p99: 31,
    contributions: [
      {
        week: 0,
        days: [{ count: null }, { count: 2 }, { count: 1 }, { count: 1 }, { count: 3 }, { count: 1 }, { count: 3 }],
      },
      {
        week: 1,
        days: [{ count: 1 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 2,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 3,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 4,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 5,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 6,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 7,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 8,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 9,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 10,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 11,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 12,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 13,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 14,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 15,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 16,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 17,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 18,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 19,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 20,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 21,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 22,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 23,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 24,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 25,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 26,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 27,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 28,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 29,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 30,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 31,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 32,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 33,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 34,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 35,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 36,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 37,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 38,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 39,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 40,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 41,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 42,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 43,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 44,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 45,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 46,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 47,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 48,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 49,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 50,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      {
        week: 51,
        days: [{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }],
      },
      { week: 52, days: [{ count: 0 }, { count: 0 }, { count: 0 }] },
    ],
  };

  // Function to generate the HTML for the heatmap
  // Function to generate JSX for the heatmap
  function generateHeatmap(contributions) {
    // Define color ranges
    const colorClasses = [
      'bg-gray-200', // 0 contributions
      'bg-purple-200', // 1-4 contributions
      'bg-purple-400', // 5-10 contributions
      'bg-purple-600', // 11-20 contributions
      'bg-purple-800', // 21+ contributions
    ];

    return (
      <div className="flex justify-center gap-1">
        {contributions.map((week, weekIndex) => (
          <div
            key={weekIndex}
            className="flex flex-col gap-1"
          >
            {week.days.map((day, dayIndex) => {
              // Determine the color class based on the count
              let colorClass;
              if (day.count === 0) colorClass = colorClasses[0];
              else if (day.count <= 4) colorClass = colorClasses[1];
              else if (day.count <= 10) colorClass = colorClasses[2];
              else if (day.count <= 20) colorClass = colorClasses[3];
              else colorClass = colorClasses[4];

              return (
                <div
                  key={dayIndex}
                  className={`w-4 h-4 rounded-[5.5px] ${colorClass}`}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }

  function convertToDailyChartData() {
    // Initialize variables
    let chartOutput = [];
    let year = 2023;
    let currentDate = new Date(year, 0, 1); // Start from Jan 1st of the given year

    // Function to add a day to the current date
    const addDay = (date) => new Date(date.getTime() + 24 * 60 * 60 * 1000);

    // Loop through each week and day to transform the data
    data.contributions.forEach((weekData) => {
      weekData.days.forEach((dayData) => {
        if (currentDate.getMonth() === 0) {
          // Check if the current month is January (0)
          chartOutput.push({
            name: `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'short' })}`,
            commit_count: dayData.count,
          });
        }
        currentDate = addDay(currentDate); // Move to the next day
      });
    });

    // Fill in any missing days at the end of the month
    while (currentDate.getMonth() === 0 && chartOutput.length < 31) {
      chartOutput.push({
        name: `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'short' })}`,
        commit_count: 0, // Assuming no commits on missing days
      });
      currentDate = addDay(currentDate);
    }
    setChartData(chartOutput);
    return chartOutput;
  }

  useEffect(() => {
    convertToDailyChartData();
  }, []);

  return (
    <main className="py-12">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-gray-100 border-[1.4px] border-gray-200 h-[60px] rounded-xl flex flex-col gap-3 items-center justify-center">
            <div className="p-6 max-w-sm rounded-lg flex flex-col gap-2 items-center justify-center">
              <p className="text-sm font-semibold tracking-wide  text-gray-600">T31K</p>
            </div>
          </div>{' '}
        </div>
        <div className="flex gap-4 ">
          <div className="w-full h-[220px] bg-gray-100 border-[1.4px] border-gray-200 rounded-xl flex items-center justify-center ">
            {generateHeatmap(data.contributions)}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-100 border-[1.4px] border-gray-200 h-[220px] rounded-xl flex flex-col gap-3 items-center justify-center">
            <div className="p-6 max-w-sm rounded-lg flex flex-col gap-2 items-center justify-center">
              <p className="text-sm font-semibold tracking-wide  text-gray-600">Streak</p>
              <div className="flex">
                <IconFlame
                  size={72}
                  className="fill-current text-purple-400 " // This applies the gradient fill
                  stroke="none" // This removes the stroke if it's not needed
                />
              </div>
              <p className="text-sm font-semibold text-gray-600"> 4 days</p>
            </div>
          </div>{' '}
          <div className="bg-gray-100 border-[1.4px] border-gray-200 h-[220px] rounded-xl flex flex-col gap-3 items-center justify-center">
            <div className="p-6 max-w-sm rounded-lg flex flex-col gap-2 items-center justify-center">
              <p className="text-sm font-semibold tracking-wide  text-gray-600">Highest</p>
              <h3 className="text-7xl font-extrabold text-purple-400">{data.max}</h3>
              <p className="text-sm font-semibold text-gray-600">commits</p>
            </div>
          </div>
          <div className="bg-gray-100 border-[1.4px] border-gray-200 h-[220px] rounded-xl flex flex-col gap-3 items-center justify-center">
            <div className="p-6 max-w-sm rounded-lg flex flex-col gap-2 items-center justify-center">
              <p className="text-sm font-semibold tracking-wide  text-gray-600">Average</p>
              <h3 className="text-7xl font-extrabold text-purple-400">{data.median}</h3>
              <p className="text-sm font-semibold text-gray-600">commits per day</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-100 border-[1.4px] border-gray-200 h-[220px] rounded-xl items-center w-full justify-center">
            <div className="rounded-lg flex flex-col gap-2 items-center justify-center w-full h-full ">
              <div className="w-[60%] bg-purple-200 rounded-full py-2 px-3 flex justify-between items-center">
                <div className="w-[30px] h-[30px] bg-white border-2 border-gray-400 rounded-full flex items-center justify-center font-semibold text-gray-500">
                  1
                </div>
                <p className="text-md tracking-tight font-semibold text-gray-600">T31K</p>
                <div className="invisible w-[30px] h-[30px] bg-white border-2 border-gray-400 rounded-full flex items-center justify-center font-semibold text-gray-500">
                  1
                </div>
              </div>
              <div className="w-[50%] bg-purple-100 rounded-full py-2 px-3">
                <div className="w-[30px] h-[30px] bg-white border-2 border-gray-300 rounded-full flex items-center justify-center font-semibold text-gray-500">
                  2
                </div>
              </div>
              <div className="w-[50%] bg-purple-100 rounded-full py-2 px-3">
                <div className="w-[30px] h-[30px] bg-white border-2 border-gray-300 rounded-full flex items-center justify-center font-semibold text-gray-500">
                  3
                </div>
              </div>{' '}
            </div>
          </div>{' '}
          <div className="bg-gray-100 border-[1.4px] border-gray-200 h-[220px] rounded-xl overflow-hidden">
            <ResponsiveContainer
              width="100%"
              height="100%"
              className="rounded-b-lg"
            >
              <AreaChart
                data={chartData}
                className="mb-5"
                margin={{
                  right: 0,
                  left: 0,
                }}
              >
                <Area
                  type="basis"
                  dataKey="commit_count"
                  isAnimationActive
                  stroke="#9333ea"
                  fill="#e9d5ff"
                />
                <Tooltip />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  );
}
