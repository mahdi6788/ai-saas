import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";
import { MAX_FREE_COUNTS } from "@/constants";

/// increase the amount of API usage
export const increaseApiLimit = async () => {
  const { userId } = await auth();

  if (!userId) return null;

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (userApiLimit) {
    await prismadb.userApiLimit.update({
      where: { userId },
      data: { count: userApiLimit.count + 1 },
    });
  } else {
    await prismadb.userApiLimit.create({
      data: { userId, count: 1 },
    });
  }
};


/// check if the limitation is reached or not
export const checkApiLimitCount = async () => {
  const { userId } = await auth();
  if (!userId) return false;

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId },
  });
  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
    return true;
  } else {
    return false;
  }
};



/// check if the limitation is reached or not
export const getApiLimitCount = async () => {
  const { userId } = await auth();
  if (!userId) return 0;

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId },
  });
  if (!userApiLimit) {
    return 0;
  } else {
    return userApiLimit.count;
  }
};
