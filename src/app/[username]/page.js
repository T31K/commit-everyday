'use client';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'sonner';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-cards';

import { EffectCards, Keyboard } from 'swiper/modules';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { ranks } from '@/lib/raw';

import Welcome from '@/components/slides/Welcome';
import DonkeyKong from '@/components/slides/DonkeyKong';
import FlyHigh from '@/components/slides/FlyHigh';
import Mario from '@/components/slides/Mario';
import OnFire from '@/components/slides/OnFire';
import Streak from '@/components/slides/Streak';
import Pikachu from '@/components/slides/Pikachu';
import WeeklyBarChart from '@/components/slides/WeeklyBarChart';
import Lakitu from '@/components/slides/Lakitu';
import Chart from '@/components/slides/Chart';
import OnFast from '@/components/slides/OnFast';
import Knuckles from '@/components/slides/Knuckles';
import Toriel from '@/components/slides/Toriel';
import HeatMap from '@/components/slides/HeatMap';
import Overall from '@/components/slides/Overall';
import FinalRank from '@/components/slides/FinalRank';
import Conclusion from '@/components/slides/Conclusion';
import Share from '@/components/slides/Share';

import {
  getHighest,
  getMissedDays,
  getMedian,
  getMostActiveDay,
  getStreak,
  getTotal,
  getLevel,
  processMonthlyChart,
  processWeeklyBarChart,
  generateRank,
} from '@/lib/helpers';

export default function Home() {
  const pathname = usePathname();
  const [activeWeek, setActiveWeek] = useState(0);
  const [contributionsData, setContributionsData] = useState([]);

  const [stats, setStats] = useState({ streak: 0, highest: 0, median: 0 });
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (pathname) getData(pathname);
  }, [pathname]);

  useEffect(() => {
    if (contributionsData) generateStats(contributionsData);
  }, [contributionsData]);

  // useEffect(() => {
  //   // Calculate the new weekly chart data based on the activeWeek
  //   let updatedWeeklyChart = getThisWeek(contributionsData, activeWeek);

  //   setStats((prevStats) => ({
  //     ...prevStats, // Spread the previous stats to maintain other state
  //     weeklyChart: updatedWeeklyChart,
  //   }));
  //   // eslint-ignore
  // }, [activeWeek]);

  function generateStats(contributionsData) {
    let highest = getHighest(contributionsData);
    let median = getMedian(contributionsData);
    let streak = getStreak(contributionsData);
    let total = getTotal(contributionsData);
    let mostActiveDay = getMostActiveDay(contributionsData);
    let missedDays = getMissedDays(contributionsData);
    let monthlyChart = processMonthlyChart(contributionsData);
    let weeklyBar = processWeeklyBarChart(contributionsData);
    let level = getLevel(pathname);
    let rank = generateRank(contributionsData);

    setStats({
      highest,
      median,
      streak,
      monthlyChart,
      total,
      rank,
      level,
      mostActiveDay,
      missedDays,
      weeklyBar,
    });
    console.log({
      highest,
      median,
      streak,
      monthlyChart,
      total,
      rank,
      level,
      mostActiveDay,
      missedDays,
      weeklyBar,
    });
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

  return (
    <>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards, Keyboard]}
        keyboard={{
          enabled: true,
        }}
        className="mySwiper"
        onSlideChange={(e) => setActiveSlide(e?.activeIndex)}
      >
        <SwiperSlide>
          <Welcome username={pathname} />
        </SwiperSlide>
        <SwiperSlide>
          <DonkeyKong activeSlide={activeSlide} />
        </SwiperSlide>
        <SwiperSlide>
          <FlyHigh />
        </SwiperSlide>
        <SwiperSlide>
          <Mario
            activeSlide={activeSlide}
            targetNumber={stats?.total}
          />
        </SwiperSlide>
        <SwiperSlide>
          <OnFire />
        </SwiperSlide>
        <SwiperSlide>
          <Streak
            activeSlide={activeSlide}
            streakNumber={stats?.streak}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Pikachu
            activeSlide={activeSlide}
            mostActiveDay={stats?.mostActiveDay}
          />
        </SwiperSlide>
        <SwiperSlide>
          <WeeklyBarChart
            activeSlide={activeSlide}
            chartData={stats?.weeklyBar}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Lakitu />
        </SwiperSlide>
        <SwiperSlide>
          <Chart
            stats={stats}
            activeSlide={activeSlide}
          />
        </SwiperSlide>
        <SwiperSlide>
          <OnFast />
        </SwiperSlide>
        <SwiperSlide>
          <Knuckles median={stats?.median} />
        </SwiperSlide>
        {/* <SwiperSlide>
          <section className="h-full w-full p-4">
            <div className="h-[5%] flex gap-2">
              <div className="w-[20px] h-[20px] bg-red-500 rounded-full"></div>
              <div className="w-[20px] h-[20px] bg-yellow-500 rounded-full"></div>
              <div className="w-[20px] h-[20px] bg-green-500 rounded-full"></div>
            </div>
            <div className="h-[95%] flex flex-col items-center justify-center ">
              <div>Commit Legend</div>
              <div className="flex gap-3 items-center mt-3">
                <Image
                  src="/poke_ball.png"
                  width={70}
                  height={70}
                  className="ml-[80px]"
                  alt="Picture of the author"
                />
                <p className="w-[100px]"> {'0'}</p>
              </div>
              <div className="flex gap-2 items-center">
                <Image
                  src="/great_ball.png"
                  width={70}
                  height={70}
                  className="ml-[80px]"
                  alt="Picture of the author"
                />
                <p className="w-[100px]"> {'>5'}</p>
              </div>
              <div className="flex gap-2 items-center">
                <Image
                  src="/ultra_ball.png"
                  width={70}
                  height={70}
                  className="ml-[80px]"
                  alt="Picture of the author"
                />
                <p className="w-[100px]"> {'>10'}</p>
              </div>
              <div className="flex gap-2 items-center">
                <Image
                  src="/master_ball.png"
                  width={70}
                  height={70}
                  className="ml-[80px]"
                  alt="Picture of the author"
                />
                <p className="w-[100px]"> {'>20'}</p>
              </div>
            </div>
          </section>
        </SwiperSlide> */}

        <SwiperSlide className="p-5">
          <HeatMap contributionsData={contributionsData} />
        </SwiperSlide>
        <SwiperSlide>
          <Toriel missedDaysCount={stats?.missedDays} />{' '}
        </SwiperSlide>
        <SwiperSlide>
          <Overall rank={stats?.rank} />
        </SwiperSlide>
        <SwiperSlide>
          <FinalRank levelData={stats?.level} />
        </SwiperSlide>
        <SwiperSlide>
          <Conclusion />
        </SwiperSlide>
        <SwiperSlide>
          <Share />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
