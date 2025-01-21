import { Link } from "@/i18n/routing";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

interface GridItemProps {
  href?: string;
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

const GridItem = ({
  href,
  icon: Icon,
  title,
  description,
  className = "",
}: GridItemProps) => {
  const t = useTranslations();

  const content = (
    <>
      <div className="relative pl-16">
        <div className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <Icon className="w-6 h-6 text-background" />
        </div>
        <div>
          <div className="text-lg font-semibold leading-7">{title}</div>
          <p className="mt-2 leading-snug">{description}</p>
          {href && (
            <p className="mt-2 text-sm underline underline-offset-2 group-hover:text-primary transition-colors">
              {t("learnMore")}
            </p>
          )}
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`group hover:scale-[1.02] duration-100 block ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <div className={`hover:scale-[1.02] duration-100 ${className}`}>
      {content}
    </div>
  );
};

interface GridProps {
  items: Array<{
    key: string;
    icon: LucideIcon;
    title: string;
    description: string;
    href?: string;
  }>;
  variant?: "card" | "inline";
  columns?: 1 | 2 | 3 | 4;
  maxWidth?:
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl";
  className?: string;
}

const Grid = ({
  items,
  columns = 2,
  maxWidth = "4xl",
  className = "",
}: GridProps) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 lg:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div
      className={`grid mx-auto max-w-${maxWidth} ${gridCols[columns]} gap-x-8 gap-y-10 ${className}`}>
      {items.map((item) => (
        <GridItem
          key={item.key}
          href={item.href}
          icon={item.icon}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default Grid;
