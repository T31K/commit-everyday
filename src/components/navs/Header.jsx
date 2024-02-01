import Image from 'next/image';

function Header({username}) {
  return (
    <div className='bg-slate-500 min-w-[150px] rounded-full flex gap-2 py-1 px-3 items-center justify-center'>
      <Image
        src="/logo.png"
        width={30}
        height={30}
        alt="Picture of the author"
        onClick={() => window.location.href="/"}
      />
      <div className="text-xl font-bold">
      {username.slice(1)}
      </div>
    </div>
  )
}

export default Header
