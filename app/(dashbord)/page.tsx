import NewRecipeButton from "@/components/add-recipe-button";
import RecipesList from "@/components/recipes-list";

export default function Home () {


  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="mt-3 flex justify-end">
        <NewRecipeButton />
      </div>
      <RecipesList />
    </div>
  );
}