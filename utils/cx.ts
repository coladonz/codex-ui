type ClassName = string | { [key: string]: boolean };

export const cx = (...classNames: ClassName[]): string => {
  return classNames
    .flat()
    .filter(Boolean)
    .map((className) =>
      typeof className === "object" && className !== null
        ? Object.keys(className)
          .filter((key) => className[key])
          .join(" ")
        : className
    )
    .join(" ")
    .trim();
};
