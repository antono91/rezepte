import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.recipes[":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.recipes[":id"]["$patch"]>["json"]

export const useEditRecipe  = (id?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async (json) => {
      const response = await client.api.recipes[":id"]["$patch"]({
        param: { id },
        json,
      });

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Edited recipe");
      queryClient.invalidateQueries({ queryKey : ["recipe"] });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return mutation;
};