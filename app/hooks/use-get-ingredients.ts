
import { useQuery } from "@tanstack/react-query";

import {client} from "@/lib/hono";

export const useGetIngredients  = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["ingredients", { id }],
    queryFn: async () => {
      const response = await client.api.ingredients[":id"].$get({
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