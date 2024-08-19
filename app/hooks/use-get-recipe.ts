import { useQuery } from "@tanstack/react-query";

import {client} from "@/lib/hono";

export const useGetRecipe  = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["recipe", { id }],
    queryFn: async () => {
      const response = await client.api.recipes[":id"].$get({
        param: {id},
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recipe")
      }

      const { data } = await response.json();
      return data;
    },
  });
  
  return query;
}