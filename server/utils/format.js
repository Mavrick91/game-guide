function convertMinutesToTime(minute) {
  // Constants for time conversion
  const MINUTES_PER_HOUR = 60;
  const HOURS_PER_DAY = 24;
  const DAYS_PER_WEEK = 7;
  const WEEKS_PER_MONTH = 4;

  // Directly calculate months, weeks, days, hours, and remaining minutes
  let totalMinutes = minute;
  let months = Math.floor(
    totalMinutes /
      (MINUTES_PER_HOUR * HOURS_PER_DAY * DAYS_PER_WEEK * WEEKS_PER_MONTH)
  );
  totalMinutes %=
    MINUTES_PER_HOUR * HOURS_PER_DAY * DAYS_PER_WEEK * WEEKS_PER_MONTH;
  let weeks = Math.floor(
    totalMinutes / (MINUTES_PER_HOUR * HOURS_PER_DAY * DAYS_PER_WEEK)
  );
  totalMinutes %= MINUTES_PER_HOUR * HOURS_PER_DAY * DAYS_PER_WEEK;
  let days = Math.floor(totalMinutes / (MINUTES_PER_HOUR * HOURS_PER_DAY));
  totalMinutes %= MINUTES_PER_HOUR * HOURS_PER_DAY;
  let hours = Math.floor(totalMinutes / MINUTES_PER_HOUR);
  let remainingMinutes = totalMinutes % MINUTES_PER_HOUR;

  // Helper function for pluralization
  const pluralize = (quantity, singular, plural) =>
    quantity === 1 ? singular : plural;

  // Build the result string
  let result = [];
  if (months > 0) {
    result.push(`${months} ${pluralize(months, 'month', 'months')}`);
  }
  if (weeks > 0) {
    result.push(`${weeks} ${pluralize(weeks, 'week', 'weeks')}`);
  }
  if (days > 0) {
    result.push(`${days} ${pluralize(days, 'day', 'days')}`);
  }
  if (hours > 0) {
    result.push(`${hours} ${pluralize(hours, 'hour', 'hours')}`);
  }
  if (remainingMinutes > 0) {
    result.push(
      `${remainingMinutes} ${pluralize(remainingMinutes, 'minute', 'minutes')}`
    );
  }

  // Return the formatted string
  return result.join(', ');
}
module.exports = { convertMinutesToTime };
