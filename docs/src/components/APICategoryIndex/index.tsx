import React from "react";
import {CardContainer} from "@site/src/components/Card";
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';
import clsx from "clsx";
import styles from "./styles.module.css";

export default function APICategoryIndex() {
  const { items } = useCurrentSidebarCategory()

  return (
    <div className={'row'}>
      {items.map(item => {
        if (!('docId' in item)) return false;
        return (
          <article key={item.docId} className={'col col--6 margin-bottom--lg'}>
            <CardContainer to={item.href}>
              <h3>{item.label}</h3>
              <div className={styles.apiSignature}
                   title={`${item.customProps.method} - ${item.customProps.apiPath}`}>
                <span className={styles.httpMethod}
                      style={{background: `var(--http-${item.customProps.method})`}}>
                  {item.customProps.method}
                </span>
                <span className={clsx('sl-font-mono', styles.apiPath)}>
                  {item.customProps.apiPath}
                </span>
              </div>
              <p className={styles.description}>
                {item.customProps.description}
              </p>
            </CardContainer>
          </article>
        )
      })}
    </div>
  );
}
