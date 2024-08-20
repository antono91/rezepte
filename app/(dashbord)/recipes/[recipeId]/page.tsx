"use client";

import Image from "next/image";
import { useState } from "react";
import { z } from "zod";

import { useGetRecipe } from "@/app/hooks/use-get-recipe";
import { useEditRecipe } from "@/app/hooks/use-edit-recipe";

import EditMethodForm from "@/components/edit-method-form";
import { CookingPot, List, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import IngredientsList from "@/components/ingredients-list";

type Props = {
  params: {recipeId: string},
}

const formSchema = z.object({
  name: z.string().optional(),
  method: z.string().optional(),
  img: z.string().optional(),
})

type FormValues = z.input<typeof formSchema>;

export default function RecipePage ({params}: Props) {
  const recipeQuery = useGetRecipe(params.recipeId);
  const editRecipe = useEditRecipe(params.recipeId);

  const [isEditMode, setEditMode] = useState(false);
  
  const toggleEditMode = () => setEditMode((current) => !current)

  const onSubmit = (values: FormValues) => {
    editRecipe.mutate({
      name: recipeQuery.data?.name!,
      ...values,
    });
  toggleEditMode();
  }

  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="p-6">
        <div className="flex items-center justify-between">
            <h1 className="text-4xl font-medium">
              {recipeQuery.data?.name}
            </h1>
            <Button
              variant="outline"
              onClick={toggleEditMode}
            >
              <Pencil size="16" className="mr-2" />
              {isEditMode && "Cancel"}
              {!isEditMode && "Edit this recipe"}
            </Button>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            {isEditMode ? (
              <FileUpload 
                endpoint="recipeImage"
                onChange={(url) => onSubmit({img: url})}
              />
            ):
            (<Image 
              src={recipeQuery.data?.img_url!}
              alt="recipe image"
              width={500}
              height={500}
              className="rounded-lg shadow-md"
            />
          )}
          </div>
          <div>
            <div className="flex items-center gap-x-3">
              <List />
              <h2 className="text-xl">
                Ingredients
              </h2>
              
            </div>
            <div className="flex mt-4 p-6 bg-slate-100 rounded-xl border">
              <IngredientsList 
                recipeId={recipeQuery.data?.id}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-6 items-center mt-10">
          <CookingPot />
          <h2 className="text-xl">
            Method
          </h2>
          
        </div>
        <div className="felx flex-col mt-4 p-6 bg-slate-100 rounded-xl border">
          {isEditMode && (
          <EditMethodForm
            onSubmit={onSubmit}
            defaultValue="Test"
          />)}
          {!isEditMode && (
          <>
            <div>
              {recipeQuery.data?.method}
            </div>
          </>
          )}
        </div>
      </div>
    </div>
  );
}