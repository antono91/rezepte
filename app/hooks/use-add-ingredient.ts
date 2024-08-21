import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.ingredients.$post>;
type RequestType = InferRequestType<typeof client.api.ingredients.$post>["json"]

export const useAddIngredient  = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async (json) => {
      console.log(json)
      const response = await client.api.ingredients.$post({json});
      const result = await response.json();
      console.log(result)
      return result
    },
    onSuccess: () => {
      toast.success("Added ingredient");
      queryClient.invalidateQueries({ queryKey : ["ingredients"] });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return mutation;
};