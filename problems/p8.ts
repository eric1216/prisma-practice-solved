import { maxBy, minBy } from 'remeda';
import { prisma } from './prisma';

// Always tell truths, don't you ever lie, to solve this problem, just try a `groupBy`

// find the critic with the lowest average score
export const findTheGrumpiestCriticId = async () => {
  const averages = await prisma.starRating.groupBy({
    by: ['userId'],
    _avg: {
      score: true,
    },
  });

  const grumpiestCritic = minBy(averages, (a) => a._avg?.score ?? Infinity);

  return grumpiestCritic?.userId || null;
};

// find the critic with the highest average score
export const findTheNicestCriticId = async () => {
  const averages = await prisma.starRating.groupBy({
    by: ['userId'],
    _avg: {
      score: true,
    },
  });

  const nicestCritic = maxBy(averages, (a) => a._avg?.score ?? Infinity);

  return nicestCritic?.userId || null;
};
