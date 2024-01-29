'use client';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'sonner';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  IconFlame,
  IconSquareRoundedArrowRight,
  IconSquareRoundedArrowLeft,
  IconUserSquareRounded,
} from '@tabler/icons-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { ranks } from '@/lib/raw';
import { tailwindColors } from '@/lib/colors';
import ColorPicker from '@/components/ColorPicker';
import ContributionGraph from '@/components/ContributionGraph';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AlertModal from '@/components/AlertModal';
export default function Home() {
  const pathname = usePathname();
  const [activeWeek, setActiveWeek] = useState(0);
  const [activeYear, setActiveYear] = useState('2024');
  const [activeColor, setActiveColor] = useState('blue');
  const [contributionsData, setContributionsData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [stats, setStats] = useState({ streak: 0, highest: 0, median: 0 });

  useEffect(() => {
    if (!openModal) setOpenModal(true);
  }, []);

  useEffect(() => {
    // Calculate the new weekly chart data based on the activeWeek
    let updatedWeeklyChart = getThisWeek(contributionsData, activeWeek);

    setStats((prevStats) => ({
      ...prevStats, // Spread the previous stats to maintain other state
      weeklyChart: updatedWeeklyChart,
    }));
    // eslint-ignore
  }, [activeWeek]);

  function generateStats(contributionsData) {
    let highest = getHighest(contributionsData);
    let median = getMedian(contributionsData);
    let streak = getStreak(contributionsData);
    let weeklyChart = getThisWeek(contributionsData);
    let rank = getRank(highest, median, streak);
    setStats({
      highest,
      median,
      streak,
      weeklyChart,
      rank,
    });
  }

  function getMedian(contributionsData) {
    let totalContributions = 0;
    let totalDaysWithContributions = 0;

    contributionsData?.contributions?.forEach((contribution) => {
      totalContributions += contribution.count;
      if (contribution.count > 0) {
        totalDaysWithContributions++;
      }
    });

    return totalDaysWithContributions > 0 ? totalContributions / totalDaysWithContributions : 0;
  }

  function getHighest(contributionsData) {
    let highest = 0;

    contributionsData?.contributions?.forEach((contribution) => {
      if (contribution.count > highest) highest = contribution.count;
    });

    return highest;
  }

  function getStreak(contributionsData) {
    let currentStreak = 0;
    let longestStreak = 0;

    contributionsData?.contributions?.forEach((contribution) => {
      if (contribution.count > 0) {
        // Increment the current streak if the count is greater than 0
        currentStreak++;
        // Update the longest streak if the current streak is longer
        if (currentStreak > longestStreak) {
          longestStreak = currentStreak;
        }
      } else {
        // Reset the current streak if the count is 0
        currentStreak = 0;
      }
    });

    return longestStreak;
  }

  function getRank(highest, median, streak) {
    let userRankIndex = 0; // Default to the first rank

    // Loop through the ranks to find where the user fits
    for (let i = ranks.length - 1; i >= 0; i--) {
      if (highest >= ranks[i].minHighest && median >= ranks[i].minMedian && streak >= ranks[i].minStreak) {
        userRankIndex = i;
        break; // Exit the loop once the appropriate rank is found
      }
    }
    return userRankIndex; // Return the index of the user's rank
  }

  function getThisWeek(contributionsData) {
    // Calculate the index range for the active week
    const startIndex = activeWeek * 7;
    const endIndex = startIndex + 7;

    // Extract the contributions for the active week
    const weeklyContributions = contributionsData?.contributions
      ?.slice(startIndex, endIndex)
      .map((contribution, index) => {
        // Convert day number to a day of the week using moment.js
        // where 1 is Monday and 7 is Sunday
        const dayOfWeek = moment()
          .isoWeekday(index + 1)
          .format('dddd');

        // Format the data suitable for an area chart
        return {
          name: dayOfWeek, // Use the day of the week as the name
          count: contribution.count,
        };
      });

    // If the week is not complete (less than 7 days), fill in the remaining days
    while (weeklyContributions?.length < 7) {
      const dayOfWeek = moment()
        .isoWeekday(weeklyContributions.length + 1)
        .format('dddd');
      weeklyContributions.push({ name: dayOfWeek, count: 0 });
    }

    return weeklyContributions;
  }

  async function getData(username, year = 2024) {
    try {
      const res = await axios.get(`https://github-contributions-api.jogruber.de/v4${username}?y=${year}`);
      setContributionsData(res.data);
    } catch (error) {
      if (error.code == 'ERR_BAD_REQUEST') {
        toast("User doesn't exist. Try again!");
      }
    }
  }

  const handleArrow = (direction) => {
    if (direction === 'left' && activeWeek > 0) {
      setActiveWeek((prevWeek) => prevWeek - 1);
    } else if (direction === 'right') {
      const maxWeeks = getMaxWeeksForYear(activeYear);
      if (activeWeek < maxWeeks) {
        setActiveWeek((prevWeek) => prevWeek + 1);
      }
    }
  };

  const getMaxWeeksForYear = (year) => {
    if (year === '2024') {
      const currentWeek = getCurrentWeekNumber();
      return Math.min(51, currentWeek - 1);
    }
    return 51;
  };

  const getCurrentWeekNumber = () => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const days = Math.floor((now - startOfYear) / (24 * 60 * 60 * 1000));
    return Math.floor(days / 7);
  };

  function handleYearChange(val) {
    setActiveYear(val);
    setActiveWeek(0);
    getData(pathname, val);
  }

  return (
    <main className="py-12">
      <AlertModal
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-gray-100 border-[1.4px] border-gray-200 h-[60px] rounded-xl flex flex gap-3 px-8 items-center justify-between">
            <Select onValueChange={handleYearChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="2024" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
              </SelectContent>
            </Select>
            <div className="p-6 rounded-lg flex flex gap-2 items-center justify-center">
              <p className="text-sm font-semibold tracking-wide  text-gray-600">{pathname.substring(1)}</p>
              <div
                // href={`https://github.com${pathname}`}
                target="_blank"
                // onClick={redirectToGitHub}
              >
                <IconUserSquareRounded
                  size={24}
                  style={{ color: tailwindColors[activeColor]['400'] }}
                  className="hover:cursor-pointer mr-1"
                  stroke="2"
                />
              </div>
            </div>
            <ColorPicker
              activeColor={activeColor}
              setActiveColor={setActiveColor}
            />
          </div>{' '}
        </div>
        <div className="flex gap-4 ">
          <div className="w-full h-[220px] bg-gray-100 border-[1.4px] border-gray-200 rounded-xl flex items-center justify-center ">
            <ContributionGraph
              contributionsData={contributionsData}
              activeColor={activeColor}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-100 border-[1.4px] border-gray-200 h-[220px] rounded-xl flex flex-col gap-3 items-center justify-center">
            <div className="p-6 max-w-sm rounded-lg flex flex-col gap-2 items-center justify-center">
              <p className="text-sm font-semibold tracking-wide  text-gray-600">Streak</p>
              <div className="flex">
                <IconFlame
                  size={72}
                  className="fill-current"
                  style={{ color: tailwindColors[activeColor]['400'] }}
                  stroke="none"
                />
              </div>
              <p className="text-sm font-semibold text-gray-600"> {stats?.streak} days</p>
            </div>
          </div>{' '}
          <div className="bg-gray-100 border-[1.4px] border-gray-200 h-[220px] rounded-xl flex flex-col gap-3 items-center justify-center">
            <div className="p-6 max-w-sm rounded-lg flex flex-col gap-2 items-center justify-center">
              <p className="text-sm font-semibold tracking-wide  text-gray-600">Highest</p>
              <h3
                className="text-7xl font-extrabold"
                style={{ color: tailwindColors[activeColor]['400'] }}
              >
                {stats?.highest}
              </h3>
              <p className="text-sm font-semibold text-gray-600">commits per day</p>
            </div>
          </div>
          <div className="bg-gray-100 border-[1.4px] border-gray-200 h-[220px] rounded-xl flex flex-col gap-3 items-center justify-center">
            <div className="p-6 max-w-sm rounded-lg flex flex-col gap-2 items-center justify-center">
              <p className="text-sm font-semibold tracking-wide  text-gray-600">Average</p>
              <h3
                className="text-7xl font-extrabold"
                style={{ color: tailwindColors[activeColor]['400'] }}
              >
                {`${stats?.median}`.substring(0, 4)}
              </h3>
              <p className="text-sm font-semibold text-gray-600">commits per day</p>
            </div>
          </div>
        </div>

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
                  className="text-slate-400 " // This applies the gradient fill
                  stroke="1.3" // This removes the stroke if it's not needed
                  onClick={() => handleArrow('left')}
                />
                <p className="text-sm font-semibold text-gray-600 text-center">{`Week ${activeWeek + 1}`}</p>

                <IconSquareRoundedArrowRight
                  onClick={() => handleArrow('right')}
                  size={28}
                  className="text-slate-400 " // This applies the gradient fill
                  stroke="1.5" // This removes the stroke if it's not needed
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
          {/* leader boards */}
          {/* <div className="bg-gray-100 border-[1.4px] border-gray-200 h-[220px] rounded-xl items-center col-span-1 justify-center">
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
          </div> */}

          <div className="bg-gray-100 border-[1.4px] border-gray-200 h-[220px] rounded-xl flex flex-col gap-3 items-center justify-center">
            <div className="p-6 max-w-sm rounded-lg flex flex-col gap-2 items-center justify-center">
              <div className="w-full">
                <p className="text-sm font-semibold tracking-wide  text-gray-600">Rank {stats?.rank + 1}</p>

                <div
                  className="w-[200px] h-[5px] rounded-full mt-1"
                  style={{ background: tailwindColors[activeColor]['200'] }}
                >
                  <div
                    className="h-[5px] rounded-full mt-1"
                    style={{ background: tailwindColors[activeColor]['400'], width: `${(stats?.rank + 1) * 10}%` }}
                  />
                </div>
              </div>
              <h3
                className="text-3xl font-extrabold whitespace-nowrap"
                style={{ color: tailwindColors[activeColor]['400'] }}
              >
                {ranks[stats?.rank]?.name}
              </h3>
            </div>
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
