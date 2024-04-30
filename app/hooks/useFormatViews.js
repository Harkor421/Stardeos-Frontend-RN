import { useState, useEffect } from 'react';

const useFormatNumber = (number) => {
  const [formattedNumber, setFormattedNumber] = useState('');

  useEffect(() => {
    if (number || number === 0) {
      let formatted = '';
      if (number >= 1000000) {
        formatted = `${(number / 1000000).toFixed(1)}M`;
      } else if (number >= 1000) {
        formatted = `${(number / 1000).toFixed(1)}K`;
      } else {
        formatted = number.toString();
      }
      setFormattedNumber(formatted);
    }
  }, [number]);

  return formattedNumber;
};

export default useFormatNumber;
