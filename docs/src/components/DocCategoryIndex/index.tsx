import React from "react";
import CardList from "../CardList";
import Card from "../Card";
import ButtonLink from "../ButtonLink";
import { useDocById } from "@docusaurus/theme-common/internal";

// Filter categories that don't have a link.
function filterItems(items) {
  return items.filter((item) => {
    return item.type === "category";
  });
}
export default function DocCategoryIndex({
  items,
  className,
  cardLink,
  columns = 3,
}) {
  return (
    <>
      {filterItems(items).map((item, index) => (
        <Index key={index} item={item} columns={columns} cardLink={cardLink} />
      ))}
    </>
  );
}

export function DocCategory({ item, cardLink, columns }) {
  const moreCount = item.items.length - columns;
  return (
    <>
      <h2>{item.label}</h2>
      <CardList columns={columns}>
        {item.items.slice(0, columns).map((item, index) => (
          <Doc key={index} item={item} cardLink={cardLink} />
        ))}
      </CardList>
      {moreCount > 0 && (
        <p>
          <ButtonLink outline to={item.href}>
            {moreCount} more
          </ButtonLink>
        </p>
      )}
    </>
  );
}

export function Doc({ item, cardLink }) {
  const doc = useDocById(item.docId ?? undefined);
  return (
    <Card
      title={item.label}
      description={doc?.description}
      to={item.href}
      link={cardLink}
    />
  );
}

export function Index({ item, columns, cardLink }) {
  switch (item.type) {
    case "link":
      return <Doc item={item} cardLink={cardLink} />;
    case "category":
      return <DocCategory item={item} columns={columns} cardLink={cardLink} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
