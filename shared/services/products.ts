import { Product } from "@prisma/client"
import { axiosInctance } from "./instance"
import { ApiRoutes } from "./constants";

export const search = async (query: string): Promise<Product[]> => {
    const {data} = await axiosInctance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, {params: {query}});

    return data;
};