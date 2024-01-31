function getTotal(contributionsData) {
  let total = 0;

  contributionsData?.contributions?.forEach((contribution) => {
    total += contribution.count;
  });

  return total;
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

function getMostActiveDay(contributionsData) {
  // Hard-coded mapping of index to day of the week, assuming January 1st is a Monday
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  let mostActiveDay = '';
  let highestCount = 0;

  contributionsData?.contributions?.slice(0, 31).forEach((contribution, index) => {
    if (contribution.count > highestCount) {
      highestCount = contribution.count;
      mostActiveDay = daysOfWeek[index % 7];
    }
  });

  return mostActiveDay;
}

function getMissedDays(contributionsData) {
  let missedDaysCount = 0;

  contributionsData?.contributions?.slice(0, 31).forEach((contribution) => {
    if (contribution.count === 0) {
      missedDaysCount++;
    }
  });

  return missedDaysCount;
}
function getWeeklyBarChart(contributionsData) {
  // Initialize sums for each day of the week
  const daySums = {
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  };

  // Define the days of the week for indexing
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Iterate over each contribution
  contributionsData?.contributions?.slice(0, 31).forEach((contribution, index) => {
    // Determine the day of the week
    const dayOfWeek = daysOfWeek[index % 7];
    // Sum the counts for each day of the week
    daySums[dayOfWeek] += contribution.count;
  });

  // Convert the sums into an array suitable for the BarChart
  const barChartData = Object.keys(daySums).map((day) => ({ subject: day.slice(0, 2), A: daySums[day], label: day }));

  return barChartData;
}

function getScore(highest, median, streak, total, missedDays, mostActiveDay) {
  // Convert mostActiveDay to a number (Monday = 1, ..., Sunday = 7)
  const daysMap = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 7,
  };
  const numericDay = daysMap[mostActiveDay];

  // Define weights
  const weights = {
    highest: 0.05, // Reduced weight for the 'highest' attribute
    median: 0.2, // Increased weight for the 'median' attribute
    streak: 0.2, // Weight for the 'streak' attribute
    total: 0.25, // Increased weight for the 'total' attribute
    missedDays: -0.2, // Negative weight for 'missedDays'
    weekday: 0.1, // Weight for weekdays in 'mostActiveDay'
    weekend: 0.15, // Higher weight for weekends in 'mostActiveDay'
  };

  // Apply a logarithmic transformation to 'highest' to reduce its impact
  const normalizedHighest = Math.log(highest + 1);

  // Determine the weight for mostActiveDay based on whether it's a weekday or weekend
  const dayWeight = numericDay >= 1 && numericDay <= 5 ? weights.weekday : weights.weekend;

  // Calculate the score
  const score =
    normalizedHighest * weights.highest +
    median * weights.median +
    streak * weights.streak +
    total * weights.total -
    missedDays * weights.missedDays +
    numericDay * dayWeight;

  return score;
}

export { getTotal, getStreak, getMostActiveDay, getMissedDays, getWeeklyBarChart, getScore };
