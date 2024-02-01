import { useState } from "react"
import RedirectModal from "../RedirectModal"
import Image from 'next/image';

function TopNav() {
  const [openModal, setOpenModal] = useState(false)
  return (
      <>
    <div className='bg-slate-500 min-w-[150px] h-[60px] rounded-full flex gap-2 p-3 items-center justify-between px-6 mb-8'>
      <Image
        src="/logo.png"
        width={30}
        height={30}
        alt="Picture of the author"
        onClick={() => window.location.href="/"}
      />
      <div className="text-xl font-bold whitespace-nowrap">
        Hall Of Fame
      </div>
      <button className="rounded-full bg-gray-200 px-4 py-2 hidden md:block" onClick={() => setOpenModal(true)}>Add Yours</button>
      <button className="rounded-full bg-gray-200 px-4 py-2 block md:hidden" onClick={() => setOpenModal(true)}>+</button>
    </div>
    <RedirectModal openModal={openModal} setOpenModal={setOpenModal}/>
    </>
  )
}

export default TopNav
