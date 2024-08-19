"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { insertRecipeSchema } from "@/db/schema";

import {
  Form,
  FormControl,
  FormItem,
  FormField,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";


const formSchema = z.object({
  name: z.string().optional(),
  method: z.string().optional(),
  img: z.string().optional(),
})
  
type FormValues = z.input<typeof formSchema>;

type Props = {
    onSubmit: (values: FormValues) => void,
    defaultValue: string,
}

const EditMethodForm = ({onSubmit, defaultValue}: Props) => {

  const handleSubmit = (values: FormValues) => {
    console.log(values)
    onSubmit(values);
  }
  
  const form = useForm();

  return ( 
    <div>
      <Form
        {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          
        >
          <FormField
            control={form.control}
            name="method"
            render={({ field }) =>(
              <FormItem>
                <FormControl>
                  <Textarea 
                    placeholder="Describe us how to cook this recipe, use double line break to separate"
                    defaultValue={defaultValue}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="mt-4"
          >
            Save
          </Button>
        </form>
      </Form>
      
    </div>
   );
}
 
export default EditMethodForm;