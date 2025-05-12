import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";

const loading = () => {
  return (
    <section className="flex-1 p-2 gap-4 flex flex-col items-center justify-center w-inherit h-inherit">
      <div className="relative">
        <Skeleton className={"h-80 w-72 rounded-lg"} />
        <ChevronRight className="absolute bottom-5 left-5 animate-pulse w-36 h-36 stroke-foreground/25" />
      </div>
    </section>
  );
};

export default loading;
