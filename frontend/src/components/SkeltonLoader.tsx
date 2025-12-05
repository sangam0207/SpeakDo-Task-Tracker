import { Skeleton } from "@/components/ui/skeleton";
import type { ViewMode } from "@/types/task.types";

interface LoadingSkeletonsProps {
  viewMode: ViewMode;
}

export default function LoadingSkeletons({ viewMode }: LoadingSkeletonsProps) {
  if (viewMode === "kanban") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((column) => (
          <div
            key={column}
            className="rounded-xl border-2 border-gray-200 bg-white shadow-sm p-5"
          >
           
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
              <Skeleton className="h-6 w-24" />
              
            </div>

            {/* Task Cards */}
            <div className="space-y-3">
              {[1, 2, 3].map((task) => (
                <div
                  key={task}
                  className="border border-gray-200 rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <Skeleton className="h-5 w-3/4" />
                    <div className="flex gap-1">
                      <Skeleton className="h-7 w-7 rounded" />
                      
                    </div>
                  </div>
                  <Skeleton className="h-3 w-full" />
                 
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                 
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // List View Skeleton
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="divide-y divide-gray-100">
        {[1, 2, 3, 4, 5, 6].map((task) => (
          <div key={task} className="p-5 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <Skeleton className="h-5 w-1/3 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-3" />
                <div className="flex gap-2 flex-wrap">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-28 rounded-full" />
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <Skeleton className="h-9 w-9 rounded-lg" />
                <Skeleton className="h-9 w-9 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}