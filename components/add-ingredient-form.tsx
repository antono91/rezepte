import { z } from "zod";
import { useForm } from "react-hook-form";
import { PlusCircle } from "lucide-react";


import { zodResolver } from "@hookform/resolvers/zod";

import { insertRecipesIngredientsSchema } from "@/db/schema";

import { Combobox } from "./combobox";

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


type Props = {
  ingredientsOptions: {id: string; value: string;}[],
  unitsOptions: {id: string; value: string;}[],
  onSubmit: (values: FormValues) => void,
}

const formSchema = insertRecipesIngredientsSchema.omit({
  id: true,
  recipe_id: true,
});

type FormValues = z.input<typeof formSchema>;

const AddIngredientForm = ({
  ingredientsOptions,
  unitsOptions,
  onSubmit,
}: Props) => {

  

  const submit = (values: FormValues) => {
    onSubmit(values);
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const {isSubmitting, isValid} = form.formState;
  

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className="space-y-2"
      >
        <FormField 
          name="ingredient_id"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Combobox 
                  valuesList={ingredientsOptions}
                  selectType="ingredient"
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
            
          )}
        />
        <FormField 
          name="amount"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
               <Input 
                className="w-20"
                placeholder="amount"
                {...field}
              />
              </FormControl>
            </FormItem>
            
          )}
        />
         <FormField 
          name="unit_id"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Combobox 
                  valuesList={unitsOptions}
                  selectType="unit"
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={!isValid}
        >
          <PlusCircle className="mr-2"/>
          Add
        </Button>
        <FormMessage />
      </form>
    </Form>
  );
}

export default AddIngredientForm;