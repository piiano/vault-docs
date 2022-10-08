import React, { type ReactNode } from "react";
import clsx from "clsx";

type Props = {
  children: ReactNode;
  className?: string;
  columns?: number;
};

export default function CardList({
  children,
  className = "",
  columns,
}: Props): JSX.Element {
  const cardClasses = clsx(
    `col`,

    {
      // Default columns = 3
      "col--4": !columns || columns === 3,
      "col--12": columns === 1,
      "col--6": columns === 2,
      "col--3": columns === 4,
    },

    `margin-bottom--md`
  );

  return (
    <section className={clsx("row", className)}>
      {React.Children.map(children, (child, index) => (
        <article key={index} className={cardClasses}>
          {child}
        </article>
      ))}
    </section>
  );
}
