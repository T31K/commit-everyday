import { tailwindColors } from '@/lib/colors';
const ContributionGraph = ({ contributionsData, activeColor }) => {
  const getColor = (activeColor, count) => {
    if (count === 0) return '#e5e7eb'; // bg-gray-200
    if (count <= 4) return tailwindColors[activeColor][200];
    if (count <= 10) return tailwindColors[activeColor][400];
    if (count <= 20) return tailwindColors[activeColor][600];
    return tailwindColors[activeColor][800];
  };

  if (!contributionsData?.contributions) return null;

  // Create an array to hold the start offsets for each day of the week
  const startOffsets = {
    0: 0, // Sunday
    1: 1, // Monday
    2: 2, // Tuesday
    3: 3, // Wednesday
    4: 4, // Thursday
    5: 5, // Friday
    6: 6, // Saturday
  };

  // Get the day of the week for the first date (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfWeek = new Date(contributionsData?.contributions[0]?.date).getDay();

  // Calculate the number of empty squares needed at the start of the graph
  const emptySquares = startOffsets[firstDayOfWeek];

  // Render the empty squares before the first date
  const emptySquaresRender = Array.from({ length: emptySquares }, (_, index) => (
    <div
      key={`empty-${index}`}
      className="w-4 h-4 rounded-[5.5px]"
    ></div>
  ));

  // Render the contribution squares
  const contributionSquaresRender = contributionsData?.contributions?.map((day, dayIndex) => {
    const color = getColor(activeColor, day.count);
    return (
      <div
        key={dayIndex}
        style={{ backgroundColor: color, width: '16px', height: '16px', borderRadius: '5.5px' }}
      ></div>
    );
  });

  // Combine the empty squares and the contribution squares
  const allSquares = [...emptySquaresRender, ...contributionSquaresRender];

  // Group the squares into weeks (rows of 7)
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

  return <div className="flex gap-1">{rows}</div>;
};

export default ContributionGraph;
