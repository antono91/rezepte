"use client"

import { z } from "zod";
import { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";

import { useGetIngredients } from "@/app/hooks/use-get-ingredients";
import { useGetAllIngredients } from "@/app/hooks/use-get-all-ingredients";
import { useGetAllUnits } from "@/app/hooks/use-get-all-units";

import { ingredients, insertRecipesIngredientsSchema } from "@/db/schema";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import AddIngredientForm from "@/components/add-ingredient-form";
import { useAddIngredient } from "@/app/hooks/use-add-ingredient";
import { useDeleteIngredient } from "@/app/hooks/use-delete-ingredient";


type Props = {
  recipeId: string | undefined,
  isEditMode: boolean,
}

const formSchema = z.object({
  recipe_id: z.string().optional(),
  ingredient_id: z.string(),
  unit_id: z.string(),
  amount: z.string(),
})

type FormValues = z.infer<typeof formSchema>;

const IngredientsList = ({recipeId, isEditMode}: Props) => {

  const allIngredientsQuery = useGetAllIngredients();
  const ingredientsOptions = (allIngredientsQuery.data ?? []);

  const allUnitsQuery = useGetAllUnits();
  const unitsOptions = (allUnitsQuery.data ?? []);

  const ingredientsQuery = useGetIngredients(recipeId);
  const addIngredient = useAddIngredient();

  const deleteIngredients = useDeleteIngredient();

  const [open, setOpen] = useState(false)

  const onSubmit = (values: FormValues) => {
    addIngredient.mutate({
      recipe_id: recipeId!,
      ...values
    })
    setOpen(false);
  }

  const deleteOne = (id: string) => {
    deleteIngredients.mutate({id})
  }

  return ( 
    <div className="flex flex-col gap-2 w-full md:w-auto">
      {ingredientsQuery.data?.map((ingredient) => (
        isEditMode ? (
        <div
          key={ingredient.ingredientId}
          className="grid grid-cols-4 border items-center shadow-md rounded-sm bg-slate-200 px-4 py-1"
        >
          <p className="text-right mr-3">{ingredient.amount}</p>
          <p className="text-slate-600">{ingredient.unit}</p>
          <p className="font-medium">{ingredient.ingredient}</p>
          <Button
            size="sm"
            variant="destructive"
            className="rounded-md ml-3 border"
            onClick={() => deleteOne(ingredient.id)}
          >
            <Trash2 className="size-4"/>
          </Button>
        </div>
      ): (
        <div
          key={ingredient.ingredientId}
          className="grid grid-cols-4 items-center"
        >
          <p className="text-right mr-3">{ingredient.amount}</p>
          <p className="text-slate-600">{ingredient.unit}</p>
          <p className="font-medium">{ingredient.ingredient}</p>
      </div>)
    ))}
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            {isEditMode && (
              <Button
              className="border shadow-md w-full"
            >
              <PlusCircle className="mr-2"/>
              Add Ingredient
            </Button>
            )}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add an ingredient</DialogTitle>
              <DialogDescription>
                Choose an ingredient, a unit and an amount.
              </DialogDescription>
            </DialogHeader>
            <AddIngredientForm 
              ingredientsOptions={ingredientsOptions}
              unitsOptions={unitsOptions}
              onSubmit={onSubmit}
            />
          </DialogContent>
        </Dialog>
    </div>
   );
}

export default IngredientsList;