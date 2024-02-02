import { useState, useEffect } from "react"
import RedirectModal from "../RedirectModal"
import Image from 'next/image';
import {
  IconArrowBigLeft,
  IconArrowBigRight,
  IconBrandProducthunt
} from '@tabler/icons-react';

function TopNav() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://assets.lemonsqueezy.com/lemon.js";
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  const [openModal, setOpenModal] = useState(false)
  return (
      <>
    <div className='bg-slate-500 min-w-[150px] h-[60px] rounded-full flex gap-2 p-3 items-center justify-between px-6 mb-3'>
      <div className="w-2/5 flex justify-start">
      <Image
        src="/ph_badge.png"
        width={200}
        height={30}
        alt="Picture of the author"
        className="cursor-pointer"
        onClick={() => window.location.href ="https://www.producthunt.com/posts/commit-everyday"}
        />
      </div>
      <div className="flex items-center">
      <Image
        src="/logo.png"
        width={30}
        height={30}
        alt="Picture of the author"
        className="cursor-pointer"
        onClick={() => window.location.href="/"}
        />
      <div className="text-xl font-bold whitespace-nowrap ml-4">
        Hall Of Fame
      </div>
      </div>
      <div className="w-2/5 flex justify-end h-full gap-1">
      <a href="https://t31labs.lemonsqueezy.com/checkout/buy/a8a84095-5ef9-4fc5-8e14-f14d5d844168?embed=1&discount=0" className="rounded-full bg-gray-200 px-4 py-2 hidden md:block hover:bg-gray-400 lemonsqueezy-button">Get A Shiny Border</a>
      <button className="rounded-full bg-gray-200 px-4 py-2 hidden md:block hover:bg-gray-400" onClick={() => setOpenModal(true)}>Add Yours</button>
      <button className="rounded-full bg-gray-200 px-4 py-2 block md:hidden hover:bg-gray-400" onClick={() => setOpenModal(true)}>+</button>
    </div>
    </div>
    <div className="flex items-center justify-center gap-4 mb-8">
      <IconArrowBigLeft size={16}  color='white'/>
        <div className="text-center text-gray-300 text-lg font-bold whitespace-nowrap ">
          January
        </div>
      <IconArrowBigRight size={16} color='white' className="opacity-30" />
    </div>
    <RedirectModal openModal={openModal} setOpenModal={setOpenModal}/>
    </>
  )
}

export default TopNav
