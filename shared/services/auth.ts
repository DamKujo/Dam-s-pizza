import { User } from "@prisma/client";
import { axiosInctance } from "./instance";

export const getMe = async () => {
  const { data } = await axiosInctance.get<User>("/auth/mineinfo");

  return data;
};
