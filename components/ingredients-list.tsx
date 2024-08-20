"use client"

import { z } from "zod";
import { PlusCircle, Trash2 } from "lucide-react";

import { useGetIngredients } from "@/app/hooks/use-get-ingredients";
import { insertRecipesIngredientsSchema } from "@/db/schema";
import { client } from "@/lib/hono";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Combobox } from "./combobox";
import { useState } from "react";


type Props = {
  recipeId: string | undefined,
}

const IngredientsList = ({recipeId}: Props) => {

  const [unit, setUnit] = useState("");
  const [ing, setIngredient] = useState("");


  const handleAddIngredient = () => {
    console.log("test")
    console.log(unit, ing)
  }

  const ingredientsValues = [
    {
      value: "Apfel",
      label: "Apfel",
    },
    {
      value: "Mehl",
      label: "Mehl",
    },
    {
      value: "Zucker",
      label: "Zucker",
    },
    {
      value: "Zimt",
      label: "Zimt",
    },
    {
      value: "Milch",
      label: "Milch",
    },
  ]

  const unitValues = [
    {
      value: "g",
      label: "g",
    },
    {
      value: "Stück",
      label: "Stück",
    },
    {
      value: "EL",
      label: "EL",
    },
    {
      value: "TL",
      label: "TL",
    },
    {
      value: "ml",
      label: "ml",
    },
  ]

  const ingredientsQuery = useGetIngredients(recipeId);

  return ( 
    <div className="flex flex-col gap-2">
      {ingredientsQuery.data?.map((ingredient) => (
        <div
          key={ingredient.ingredientId}
          className="grid grid-cols-4 border items-center shadow-md rounded-sm bg-slate-200 px-4 py-1"
        >
          <p>{ingredient.amount}</p>
          <p className="text-slate-600">{ingredient.unit}</p>
          <p className="font-medium">{ingredient.ingredient}</p>
          <Button
            size="sm"
            variant="destructive"
            className="rounded-md ml-3 border"
          >
            <Trash2 className="size-4"/>
          </Button>
        </div>
      ))}
        
        <Dialog>
          <DialogTrigger>
            <Button
              className="border shadow-md w-full"
            >
              <PlusCircle className="mr-2"/>
              Add Ingredient
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add an ingredient</DialogTitle>
              <DialogDescription>
                Choose an ingredient, a unit and an amount.
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-2 flex-col md:flex-row">
              <Combobox 
                valuesList={ingredientsValues}
                selectType="ingredient"
                onChange={setIngredient}
              />
              <Input 
                className="w-20"
                placeholder="amount"
              />
              <Combobox 
                valuesList={unitValues}
                selectType="unit"
                onChange={setUnit}
              />
            </div>
            <DialogClose asChild>
              <Button
                onClick={handleAddIngredient}
              >
                <PlusCircle className="mr-2"/>
                Add Ingredient
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
    </div>
   );
}
 
export default IngredientsList;