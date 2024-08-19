"use client"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { insertRecipeSchema } from "@/db/schema";
import { client } from "@/lib/hono";
import { useGetRecipes } from "@/app/hooks/use-get-recipes";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = insertRecipeSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export default function AddRecipePage () {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleSubmit = async (values: FormValues) => {
    const res = await client.api.recipes.$post({json: values});
    
    if (res.ok) {
      const {data} = await res.json();
      toast.success("Added recipe")
      router.push(`/recipes/${data.id}`);
      /*queryClient.invalidateQueries({queryKey: ["recipes"] })*/
    }
    else {
      toast.error("Failed to add recipe")
    }
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const {isSubmitting, isValid} = form.formState;

  return (
    <div className="max-w-5xl mx-auto py-6 flex md:items-center md:justify-center mt-32">
      <div>
        <h1 className="text-2xl">
          Name your recipe
        </h1>
        <p className="text-sm text-slate-600">
          What would you name your recipe? Don&apos;t worry you can change this later.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField 
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>
                    Recipe Title
                  </FormLabel>
                  <FormControl>
                    <Input 
                      disabled={isSubmitting}
                      placeholder="e.g. Apfelstrudel"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What will you cook in this recipe?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              
                <Button 
                  asChild
                  variant="ghost"
                >
                  <Link href ="/">
                    Cancel
                  </Link>
                </Button>
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
      
    </div>
  );
}