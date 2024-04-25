import { useState, useEffect } from 'react';

const useFormatViews = (views) => {
  const [formattedViews, setFormattedViews] = useState('');

  useEffect(() => {
    if (views || views === 0) {
      const formatted = views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setFormattedViews(formatted);
    }
  }, [views]);

  return formattedViews;
};

export default useFormatViews;
