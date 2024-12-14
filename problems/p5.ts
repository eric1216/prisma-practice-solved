import { groupBy, map, reduce, sumBy } from 'remeda';
import { prisma } from './prisma';
import { StarRating } from '@prisma/client';

// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones
export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
  const moviesWithRatings = await prisma.movie.findMany({
    include: {
      starRatings: true,
    },
  });

  const filteredMovies = moviesWithRatings
    .filter((movie) => {
      const totalScore = sumBy(movie.starRatings, (rating) => rating.score);
      const averageScore = movie.starRatings.length > 0 ? totalScore / movie.starRatings.length : 0;

      return averageScore > n;
    })
    .map((movie) => ({
      id: movie.id,
      title: movie.title,
      releaseYear: movie.releaseYear,
      parentalRating: movie.parentalRating,
    }));

  return filteredMovies;
};
