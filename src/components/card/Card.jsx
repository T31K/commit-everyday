import Image from 'next/image';
import {
  IconChartArrowsVertical,
  IconFlame,
  IconActivity,
  IconBadge,
  IconVectorTriangle,
  IconMoodSad,
} from '@tabler/icons-react';

function Card({ userData }) {
  return (
    <section
      className={`h-full w-full p-4 bg-[#282c34] rounded-[18px] hover:cursor-pointer hover:bg-[#222] ${
        userData.premium ? 'glowing-border' : 'non-glowing-border'
      }`}
      onClick={() => (window.location.href = `/${userData?.name}`)}
    >
      <div className="h-[95%] flex flex-col gap-4 items-center justify-center ">
        <div className="flex flex-col gap-2 items-center justify-center w-full">
          <Image
            src={userData?.image}
            width={84}
            height={84}
            alt="green_mushroom"
            className="my-3 border-4 border-white rounded-full p-1"
          />
          <div className="text-center text-md mt-[-10px] mb-3 text-white">{userData?.name}</div>
          <div className="w-full px-5 flex flex-col gap-2">
            <div className="w-full border-[2.5px] border-red-300 rounded-full flex gap-5 items-center px-3 py-1">
              <IconChartArrowsVertical
                size={16}
                color="white"
              />
              <div className="text-sm text-white">Total: {userData?.total}</div>
            </div>
            <div className="w-full border-[2.5px] border-orange-300 rounded-full flex gap-5 items-center px-3 py-1">
              <IconFlame
                size={16}
                color="white"
              />
              <div className="text-sm text-white">Streak: {userData?.streak}</div>
            </div>
            <div className="w-full border-[2.5px] border-yellow-300 rounded-full flex gap-5 items-center px-3 py-1">
              <IconActivity
                size={16}
                color="white"
              />
              <div className="text-sm text-white">Active: {userData?.most_active_day?.substring(0, 3)}</div>
            </div>
            <div className="w-full border-[2.5px] border-green-300 rounded-full flex gap-5 items-center px-3 py-1">
              <IconBadge
                size={16}
                color="white"
              />
              <div className="text-sm text-white">Score: {userData?.rank}/100</div>
            </div>
            <div className="w-full border-[2.5px] border-blue-300 rounded-full flex gap-5 items-center px-3 py-1">
              <IconVectorTriangle
                size={16}
                color="white"
              />
              <div className="text-sm text-white">Average: {userData?.median}</div>
            </div>
            <div className="w-full border-[2.5px] border-violet-300 rounded-full flex gap-5 items-center px-3 py-1">
              <IconMoodSad
                size={16}
                color="white"
              />
              <div className="text-sm text-white">Missed: {userData?.missed_days}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Card;
