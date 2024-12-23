import { Ingredient } from "@prisma/client"
import { axiosInctance } from "./instance"
import { ApiRoutes } from "./constants";

export const getAll = async (): Promise<Ingredient[]> => {
    const {data} = await axiosInctance.get<Ingredient[]>(ApiRoutes.INGREDIENTS);

    return data;
};