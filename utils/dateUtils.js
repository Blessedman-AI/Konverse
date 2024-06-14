export function formatDate(dateString) {
  const dateObject = new Date(dateString);
  const currentDate = new Date();
  const differenceInMilliseconds = currentDate - dateObject;
  const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
  const differenceInMinutes = Math.floor(differenceInSeconds / 60);
  const differenceInHours = Math.floor(differenceInMinutes / 60);
  const differenceInDays = Math.floor(differenceInHours / 24);
  const differenceInWeeks = Math.floor(differenceInDays / 7);
  const differenceInMonths =
    currentDate.getMonth() +
    1 -
    (dateObject.getMonth() + 1) +
    (currentDate.getFullYear() - dateObject.getFullYear()) * 12;
  const differenceInYears =
    currentDate.getFullYear() - dateObject.getFullYear();

  if (differenceInSeconds < 60) {
    return 'just now';
  } else if (differenceInMinutes < 60) {
    return `${differenceInMinutes} ${
      differenceInMinutes === 1 ? 'minute' : 'minutes'
    } ago`;
  } else if (differenceInHours < 24) {
    return `${differenceInHours} ${
      differenceInHours === 1 ? 'hour' : 'hours'
    } ago`;
  } else if (differenceInDays < 7) {
    return `${differenceInDays} ${
      differenceInDays === 1 ? 'day' : 'days'
    } ago`;
  } else if (differenceInWeeks < 4) {
    return `${differenceInWeeks} ${
      differenceInWeeks === 1 ? 'week' : 'weeks'
    } ago`;
  } else if (differenceInMonths < 12) {
    return `${differenceInMonths} ${
      differenceInMonths === 1 ? 'month' : 'months'
    } ago`;
  } else {
    return `${differenceInYears} ${
      differenceInYears === 1 ? 'year' : 'years'
    } ago`;
  }
}
