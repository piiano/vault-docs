import React, { type ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import IconRightArrow from "../IconRightArrow";

import styles from "./styles.module.css";

type Props = {
  to: string;
  icon?: Location;
  title: string;
  link: string;
  description?: string;
};

export function CardContainer({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}): JSX.Element {
  return (
    <Link to={to} className={clsx("card", styles.cardContainer)}>
      {children}
    </Link>
  );
}
function CardLayout({
  to,
  icon,
  title,
  link,
  description,
}: {
  to: string;
  icon: ReactNode;
  title: string;
  link?: string;
  description?: string;
}): JSX.Element {
  return (
    <CardContainer to={to}>
      {(icon || title) && (
        <div className="card__header">
          {icon && <h2 className={clsx(styles.cardIcon)}>{icon}</h2>}
          {title && (
            <h3
              className={clsx("text--truncate", styles.cardTitle)}
              title={title}
            >
              {title}
            </h3>
          )}
        </div>
      )}
      {description && (
        <div
          className={clsx("card__body", styles.cardDescription)}
          title={description}
        >
          {description}
        </div>
      )}
      {link && (
        <div className={clsx("card__footer", styles.cardLink)}>
          {link}
          <IconRightArrow
            width={16}
            height={16}
            className={clsx(styles.arrowIcon)}
          />
        </div>
      )}
    </CardContainer>
  );
}

const Card = (props: Props): JSX.Element => {
  return (
    <CardLayout
      icon={props.icon}
      to={props.to}
      title={props.title}
      link={props.link}
      description={props?.description}
    />
  );
};

export default Card;
