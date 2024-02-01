import React, { useState, useEffect } from 'react';
import Image from "next/image";

function Mario({ activeSlide, targetNumber }) {
  const [commitCount, setCommitCount] = useState(0);
  const [stage, setStage] = useState(1);
  const [startAnimation, setStartAnimation] = useState(false);
  const incrementPerStage = 15;
  const numberOfStages = Math.ceil(targetNumber / incrementPerStage);

  useEffect(() => {
    if (activeSlide === 3) {
      const delay = setTimeout(() => {
        setStartAnimation(true);
      }, 1200); // 1.5 seconds delay

      return () => clearTimeout(delay);
    }
  }, [activeSlide]);

  useEffect(() => {
    let interval;
    const stageTarget = stage * incrementPerStage;
    const isLastStage = stage === numberOfStages;
    const finalTarget = isLastStage ? targetNumber : stageTarget;

    if (startAnimation && commitCount < finalTarget) {
      interval = setInterval(() => setCommitCount(c => c + 1), 25); // Fast increment
    }

    if (commitCount >= finalTarget && stage < numberOfStages) {
      clearInterval(interval);
      setTimeout(() => setStage(s => s + 1), 800); // Pause between stages
    }

    return () => clearInterval(interval);
  }, [commitCount, stage, startAnimation, numberOfStages, targetNumber]);

  useEffect(() => {
    if (stage > 1) {
      setCommitCount((stage - 1) * incrementPerStage + 1); // Start from the next stage
    }
  }, [stage]);

  return (
    <section className='h-full w-full p-4'>
      <div className='h-[5%] flex gap-2'>
        <div className="w-[20px] h-[20px] bg-red-500 rounded-full"></div>
        <div className="w-[20px] h-[20px] bg-yellow-500 rounded-full"></div>
        <div className="w-[20px] h-[20px] bg-green-500 rounded-full"></div>
      </div>
      <div className='h-[95%] flex flex-col items-center justify-around pt-8'>
      <div className='text-[70px] text-red-600'>{commitCount}</div>
      <div className='text-md mt-[-20px]'>total commits</div>
          <Image src="/jumpman.gif" alt="JumpMan" width={250} height={250}  />
      </div>
    </section>
  )
}

export default Mario
