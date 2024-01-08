'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { usePathname } from 'next/navigation';

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
import ContributionGraph from '@/components/ContributionGraph';

export default function Home() {
  const [chartData, setChartData] = useState([]);
  const [stats, setStats] = useState({ streak: 0, highest: 0, median: 0 });
  const [contributionsData, setContributionsData] = useState([]);
  const pathname = usePathname();

  async function getData(username) {
    try {
      const res = await axios.get(`https://github-contributions-api.jogruber.de/v4${username}?y=2024`);
      setContributionsData(res.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      // Handle errors as needed
    }
  }

  useEffect(() => {
    if (pathname) getData(pathname);
  }, [pathname]);

  function convertToDailyChartData() {
    let chartOutput = [];
    let year = 2023;
    let currentDate = new Date(year, 0, 1); // Start from Jan 1st of the given year

    // Function to add a day to the current date
    const addDay = (date) => new Date(date.getTime() + 24 * 60 * 60 * 1000);

    // Loop through each week and day to transform the data
    contributionsData?.contributions?.forEach((weekData) => {
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
    if (contributionsData) {
      getStats(contributionsData);
    }
    function getStats(contributionsData) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - 1); // Start from yesterday
      let streak = 0;
      let foundNonZero = false;
      let highest = 0;
      let allCounts = []; // Array to hold all non-zero counts for median calculation

      // Helper function to compare dates
      function isSameDay(d1, d2) {
        return (
          d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()
        );
      }

      // Helper function to get yesterday's date
      function getYesterday(date) {
        const yesterday = new Date(date);
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday;
      }

      // Start checking from yesterday
      let checkingDate = currentDate;

      for (let i = contributionsData?.contributions?.length - 1; i >= 0; i--) {
        const contributionDay = new Date(contributionsData?.contributions[i].date);
        const count = contributionsData.contributions[i].count;

        // Update highest count if current count is greater
        if (count > highest) {
          highest = count;
        }

        // If count is not zero, add to allCounts array for median calculation
        if (count > 0) {
          allCounts.push(count);
        }

        // Skip future contributions if any
        if (contributionDay > currentDate) continue;

        if (isSameDay(contributionDay, checkingDate)) {
          // If the current checking day has a count greater than 0, increment streak
          if (count > 0) {
            foundNonZero = true;
            streak++;
            // Prepare to check the day before
            checkingDate = getYesterday(checkingDate);
          }
          // If the current checking day has a count of 0, break the loop
          else if (foundNonZero) {
            break;
          }
        }
      }

      // Calculate median
      allCounts.sort((a, b) => a - b);
      let median = 0;
      let mean = 0;

      if (allCounts.length > 0) {
        const mid = Math.floor(allCounts.length / 2);
        median = allCounts.length % 2 !== 0 ? allCounts[mid] : (allCounts[mid - 1] + allCounts[mid]) / 2;

        // Calculate the mean (average)
        const total = allCounts.reduce((acc, val) => acc + val, 0);
        mean = total / allCounts.length;
      }

      setStats({ streak, highest, median, mean });
    }
  }, [contributionsData]);
  useEffect(() => {
    convertToDailyChartData();
  }, []);

  return (
    <main className="py-12">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-gray-100 border-[1.4px] border-gray-200 h-[60px] rounded-xl flex flex-col gap-3 items-center justify-center">
            <div className="p-6 max-w-sm rounded-lg flex flex-col gap-2 items-center justify-center">
              <p className="text-sm font-semibold tracking-wide  text-gray-600">{pathname.substring(1)}</p>
            </div>
          </div>{' '}
        </div>
        <div className="flex gap-4 ">
          <div className="w-full h-[220px] bg-gray-100 border-[1.4px] border-gray-200 rounded-xl flex items-center justify-center ">
            <ContributionGraph contributionsData={contributionsData} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-100 border-[1.4px] border-gray-200 h-[220px] rounded-xl flex flex-col gap-3 items-center justify-center">
            <div className="p-6 max-w-sm rounded-lg flex flex-col gap-2 items-center justify-center">
              <p className="text-sm font-semibold tracking-wide  text-gray-600">Streak</p>
              <div className="flex">
                <IconFlame
                  size={72}
                  className="fill-current text-blue-400 " // This applies the gradient fill
                  stroke="none" // This removes the stroke if it's not needed
                />
              </div>
              <p className="text-sm font-semibold text-gray-600"> {stats?.streak} days</p>
            </div>
          </div>{' '}
          <div className="bg-gray-100 border-[1.4px] border-gray-200 h-[220px] rounded-xl flex flex-col gap-3 items-center justify-center">
            <div className="p-6 max-w-sm rounded-lg flex flex-col gap-2 items-center justify-center">
              <p className="text-sm font-semibold tracking-wide  text-gray-600">Highest</p>
              <h3 className="text-7xl font-extrabold text-blue-400">{stats?.highest}</h3>
              <p className="text-sm font-semibold text-gray-600">commits</p>
            </div>
          </div>
          <div className="bg-gray-100 border-[1.4px] border-gray-200 h-[220px] rounded-xl flex flex-col gap-3 items-center justify-center">
            <div className="p-6 max-w-sm rounded-lg flex flex-col gap-2 items-center justify-center">
              <p className="text-sm font-semibold tracking-wide  text-gray-600">Average</p>
              <h3 className="text-7xl font-extrabold text-blue-400">{`${stats?.median}`}</h3>
              <p className="text-sm font-semibold text-gray-600">commits per day</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-100 border-[1.4px] border-gray-200 h-[220px] rounded-xl items-center w-full justify-center">
            <div className="rounded-lg flex flex-col gap-2 items-center justify-center w-full h-full ">
              <div className="w-[60%] bg-blue-200 rounded-full py-2 px-3 flex justify-between items-center">
                <div className="w-[30px] h-[30px] bg-white border-2 border-gray-400 rounded-full flex items-center justify-center font-semibold text-gray-500">
                  1
                </div>
                <p className="text-md tracking-tight font-semibold text-gray-600">T31K</p>
                <div className="invisible w-[30px] h-[30px] bg-white border-2 border-gray-400 rounded-full flex items-center justify-center font-semibold text-gray-500">
                  1
                </div>
              </div>
              <div className="w-[50%] bg-blue-100 rounded-full py-2 px-3">
                <div className="w-[30px] h-[30px] bg-white border-2 border-gray-300 rounded-full flex items-center justify-center font-semibold text-gray-500">
                  2
                </div>
              </div>
              <div className="w-[50%] bg-blue-100 rounded-full py-2 px-3">
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
                  stroke="#2563eb"
                  fill="#bfdbfe"
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

// move data to api call from server
// on load get the url check if its valid
// count the streak

// screenshot share
// color scheme dark mode
