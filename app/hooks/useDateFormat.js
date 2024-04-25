import { useState, useEffect } from 'react';

const useDateFormat = (dateString) => {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    if (dateString) {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      const formatted = date.toLocaleDateString('en-US', options).replace(/(\w+) (\d+),/, '$1 $2,');
      setFormattedDate(formatted);
    }
  }, [dateString]);

  return formattedDate;
};

export default useDateFormat;
