import { prisma } from './prisma';

// Deleting a thing, only works swell, if things that reference it are deleted as well
export const deleteAllUsersWithAgeUnderN = async (n: number) => {
  const users = await prisma.user.findMany({
    where: {
      age: { lt: n },
    },
    select: {
      id: true,
    },
  });

  const userIds = users.map((user) => user.id);

  if (userIds.length > 0) {
    await prisma.starRating.deleteMany({
      where: {
        userId: { in: userIds },
      },
    });

    const deletedUsers = await prisma.user.deleteMany({
      where: {
        id: { in: userIds },
      },
    });

    return deletedUsers;
  }

  return { count: 0 };
};
