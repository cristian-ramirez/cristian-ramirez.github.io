const getDateFormat = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour12: false,
  };
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('en-US', options);
};

export default getDateFormat;
