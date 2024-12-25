declare global {
  type Theme = "dark" | "light" | "system";
  /*type Blog = {
    _id: string;
    img: string;
    tags: string[];
    title: string;
    description: string;
    content: string;
    createdAt: Date | string;
    updatedAt: Date | string;
  };*/
  type Author = {
    name: string;
    avatar: string;
  };

  type Blog = {
    title: string;
    description: string;
    date: Date | string;
    tags: string[];
    img: string;
    author: Author;
    views?: number;
    readTime: number;
  };
  type comment = {
    id: number;
    userId: number;
    author: string;
    avatar: string;
    content: string;
    date: Date;
    parentId?: number;
  };
  type SortOption = "date" | "popularity" | "readTime";
  type DateRange = "week" | "month" | "year" | "all";
  type FilterState = {
    searchQuery: string;
    selectedTags: string[];
    sortBy: SortOption;
    dateRange: DateRange;
    contentTypes: string[];
  };
}

export {};
