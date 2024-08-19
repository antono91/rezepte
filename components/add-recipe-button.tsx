import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewRecipeButton () {
  return (
    
    <Button asChild>
      <Link href="/add-recipe">
        <Plus />
        <p className="ml-1">
          New Recipe
        </p>
      </Link>
    </Button>
  );
}