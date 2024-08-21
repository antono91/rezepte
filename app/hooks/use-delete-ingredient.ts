import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.ingredients["$delete"]>;
type RequestType = InferRequestType<typeof client.api.ingredients["$delete"]>["json"];

export const useDeleteIngredient  = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async (json) => {
      const response = await client.api.ingredients["$delete"]({
        json,
      });
      const result = await response.json();
      console.log(result)
      return result
    },
    onSuccess: () => {
      toast.success("Removed ingredient");
      queryClient.invalidateQueries({ queryKey : ["ingredients"] });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return mutation;
};