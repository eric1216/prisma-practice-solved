import { prisma } from './prisma';

// find all movies that a user has watched
export const findAllMoviesThatAUserWatched = async (userId: number) => {
  const allMoviesWatchedByUser = await prisma.movie.findMany({
    where: {
      starRatings: {
        some: {
          userId: userId,
        },
      },
    },
  });

  return allMoviesWatchedByUser;
};
