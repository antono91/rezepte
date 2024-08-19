import { useQuery } from "@tanstack/react-query";
import {client} from "@/lib/hono";

export const useGetRecipes = () => {
  const query = useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const response = await client.api.recipes.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch recipes")
      }

      const { data } = await response.json();
      return data;
    },
  });
  
  return query;
}