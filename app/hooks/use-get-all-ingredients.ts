
import { useQuery } from "@tanstack/react-query";

import {client} from "@/lib/hono";

export const useGetAllIngredients  = () => {
  const query = useQuery({
    queryKey: ["ingredients"],
    queryFn: async () => {
      const response = await client.api.ingredients.$get({});

      if (!response.ok) {
        throw new Error("Failed to fetch ingredients")
      }

      const { data } = await response.json();
      return data;
    },
  });
  
  return query;
}