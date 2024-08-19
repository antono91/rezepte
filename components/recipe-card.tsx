import Link from "next/link";
import Image from "next/image";

type Props = {
  id: string,
  name: string,
  imgUrl: string,
}

export default function RecipeCard({id, name, imgUrl}: Props) {
  return (
    <Link href={`/recipes/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-square rounded-md overflow-hidden">
          <Image
            fill
            className="object-cover"
            placeholder="data:image/no-image.png"
            src={imgUrl!}
            alt={name}
          />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {name}
          </div>
          <p className="text-xs text-muted-foreground">Category</p>
        </div>
      </div>
    </Link>
  );
};