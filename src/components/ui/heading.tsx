import { cn } from "@/lib/utils";
import type React from "react";

interface HeadingProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center" | "right";
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  description,
  align = "center",
  size = "md",
  className,
}) => {
  const sizeClasses = {
    xs: {
      subtitle: "text-xs",
      title: "text-xl md:text-2xl my-2",
      description: "text-sm",
    },
    sm: {
      subtitle: "text-xs",
      title: "text-2xl md:text-3xl my-2",
      description: "text-sm",
    },
    md: {
      subtitle: "text-sm",
      title: "text-3xl md:text-4xl my-3",
      description: "text-base mb-12",
    },
    lg: {
      subtitle: "text-sm",
      title: "text-4xl md:text-5xl my-4",
      description: "text-base",
    },
  };

  return (
    <div
      className={cn(
        "flex flex-col mt-8 mb-12",
        {
          "items-start text-left": align === "left",
          "items-center text-center": align === "center",
          "items-end text-right": align === "right",
        },
        className
      )}>
      {subtitle && (
        <h3 className={cn("font-semibold", sizeClasses[size].subtitle)}>
          {subtitle}
        </h3>
      )}
      <h1 className={cn("font-bold max-w-3xl", sizeClasses[size].title)}>
        {title}
      </h1>
      {description && (
        <p className={cn("max-w-xl leading-6", sizeClasses[size].description)}>
          {description}
        </p>
      )}
    </div>
  );
};

export default Heading;
