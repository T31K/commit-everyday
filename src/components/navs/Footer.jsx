import AlertModal from "@/components/AlertModal"
import { useState } from "react"



function Footer({ stats, pathname, levelData, activeSlide}) {
  const [openModal, setOpenModal] =useState(false)
  return (
    <div className={`bg-slate-500  w-[350px] h-[60px] rounded-full flex gap-2 p-3 ${activeSlide == 17 ? 'visible' : 'invisible'}`}>
      <div className='w-full rounded-full bg-gray-300 flex justify-center items-center hover:bg-green-300 hover:cursor-pointer'>Share</div>
      <div className='w-full rounded-full bg-gray-300 flex justify-center items-center hover:bg-green-300 hover:cursor-pointer' onClick={() =>setOpenModal(true)}>Add To Wall</div>
      <AlertModal openModal={openModal} setOpenModal={setOpenModal}
        stats={stats}
        pathname={pathname}
        levelData={levelData}
      />
    </div>
  )
}

export default Footer
