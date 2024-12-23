import { Story, StoryItem } from "@prisma/client";
import { axiosInctance } from "./instance";

export type IStory = Story & {
  items: StoryItem[];
};

export const getAll = async () => {
  const { data } = await axiosInctance.get<IStory[]>("/stories");

  return data;
};
