const CardSkeleton = () => {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-[16/10] bg-muted" />
      <div className="p-6 space-y-4">
        <div className="w-24 h-6 bg-muted rounded-full" />
        <div className="space-y-2">
          <div className="h-5 bg-muted rounded w-full" />
          <div className="h-5 bg-muted rounded w-4/5" />
        </div>
        <div className="h-4 bg-muted rounded w-2/3" />
        <div className="flex justify-between pt-4 border-t border-border">
          <div className="h-3 bg-muted rounded w-20" />
          <div className="h-3 bg-muted rounded w-16" />
        </div>
      </div>
    </div>
  );
};

const FeaturedSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-muted animate-pulse min-h-[520px] md:min-h-[580px]">
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16 space-y-6">
        <div className="flex gap-3">
          <div className="w-28 h-8 bg-background/20 rounded-full" />
          <div className="w-32 h-8 bg-background/20 rounded-full" />
        </div>
        <div className="space-y-3 max-w-2xl">
          <div className="h-10 bg-background/20 rounded w-full" />
          <div className="h-10 bg-background/20 rounded w-4/5" />
        </div>
        <div className="h-6 bg-background/20 rounded w-2/3" />
        <div className="flex gap-4">
          <div className="w-36 h-12 bg-background/30 rounded-full" />
          <div className="w-28 h-12 bg-background/20 rounded-full" />
        </div>
      </div>
    </div>
  );
};

const SidebarSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-border animate-pulse">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-muted" />
        <div className="h-5 bg-muted rounded w-32" />
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex gap-4 p-3">
            <div className="w-8 h-8 bg-muted rounded" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-3 bg-muted rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { CardSkeleton, FeaturedSkeleton, SidebarSkeleton };
