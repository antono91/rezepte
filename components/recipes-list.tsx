"use client";

import RecipeCard from "@/components/recipe-card";

import { useGetRecipes } from "@/app/hooks/use-get-recipes";

const RecipesList = () => {
  const recipesQuery = useGetRecipes();

  return ( 
    <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 mt-10">
        {recipesQuery.data?.map((recipe) => {
        return(
          <RecipeCard 
            key={recipe.id}
            id={recipe.id}
            name={recipe.name}
            imgUrl={recipe.img_url}
          />
        );
        })}
        {recipesQuery.data?.length === 0 &&(
          <div className="w-full text-center text-sm text-muted-foreground mt-10">
            No recipes found
          </div>
        )}
      </div>
   );
}
 
export default RecipesList;