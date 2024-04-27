import { useMemo } from 'react';

const useRandomComment = (comments) => {
  const totalComments = comments?.length || 0;

  const randomIndex = useMemo(() => {
    return Math.floor(Math.random() * totalComments);
  }, [totalComments]);

  const randomComment = useMemo(() => {
    return comments?.[randomIndex];
  }, [comments, randomIndex]);

  return randomComment;
};

export default useRandomComment;
