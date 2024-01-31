import { tailwindColors } from '@/lib/colors';
const ContributionGraph = ({ contributionsData }) => {
  let activeColor = 'violet'
  const getColor = (activeColor, count) => {
    if (count === 0) return '#e5e7eb'; // bg-gray-200
    if (count <= 4) return tailwindColors[activeColor][200];
    if (count <= 10) return tailwindColors[activeColor][400];
    if (count <= 20) return tailwindColors[activeColor][600];
    return tailwindColors[activeColor][800];
  };

  if (!contributionsData?.contributions) return null;

  const startOffsets = {
    0: 0, // Sunday
    1: 1, // Monday
    2: 2, // Tuesday
    3: 3, // Wednesday
    4: 4, // Thursday
    5: 5, // Friday
    6: 6, // Saturday
  };

  const firstDayOfWeek = new Date(contributionsData?.contributions[0]?.date).getDay();
  const emptySquares = startOffsets[firstDayOfWeek];
  const emptySquaresRender = Array.from({ length: emptySquares }, (_, index) => (
    <div
      key={`empty-${index}`}
      className="w-[32px] h-[32px] rounded-[12px]"
    ></div>
  ));

  const contributionSquaresRender = contributionsData?.contributions?.map((day, dayIndex) => {
    const color = getColor(activeColor, day.count);
    return (
      <div
        key={dayIndex}
        style={{ backgroundColor: color, width: '32px', height: '32px', borderRadius: '12px' }}
      ></div>
    );
  });

  const allSquares = [...emptySquaresRender, ...contributionSquaresRender].slice(0,35)

  const rows = [];
  for (let i = 0; i < allSquares.length; i += 7) {
    const weekSquares = allSquares.slice(i, i + 7);
    rows.push(
      <div
        key={`week-${i}`}
        className="flex flex-col gap-1"
      >
        {weekSquares}
      </div>
    );
  }

  return (<>
  <div className="flex gap-1 h-full justify-center items-center">
    <div className='flex flex-col gap-1 mr-3'>
      <div className='h-[32px]'>S</div>
      <div className='h-[32px]'>M</div>
      <div className='h-[32px]'>T</div>
      <div className='h-[32px]'>W</div>
      <div className='h-[32px]'>T</div>
      <div className='h-[32px]'>F</div>
      <div className='h-[32px]'>S</div>
    </div>
  <div className="flex gap-1 h-full justify-center items-center">{rows}</div>
  </div>
  </>)
};

export default ContributionGraph;
