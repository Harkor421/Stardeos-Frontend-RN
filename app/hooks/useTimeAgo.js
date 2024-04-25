import { useEffect, useState } from 'react';

function calculateElapsedTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  const seconds = Math.floor((now - date) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return 'hace ' + interval + ' años';
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return 'hace ' + interval + ' meses';
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return 'hace ' + interval + ' días';
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return 'hace ' + interval + ' horas';
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return 'hace ' + interval + ' minutos';
  }
  return 'hace ' + Math.floor(seconds) + ' segundos';
}

function useTimeAgo(initialDate) {
  const [timeAgo, setTimeAgo] = useState(calculateElapsedTime(initialDate));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeAgo(calculateElapsedTime(initialDate));
    }, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, [initialDate]);

  return timeAgo;
}

export default useTimeAgo;
