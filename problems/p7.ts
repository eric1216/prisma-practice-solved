import { prisma } from './prisma';

// get average score for a user
export const getAverageScoreForUser = async (userId: number) => {
  const averageScore = await prisma.starRating.aggregate({
    _avg: {
      score: true,
    },
    where: {
      userId: userId,
    },
  });

  return averageScore._avg.score;
};
