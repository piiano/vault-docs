import React from "react";
import {CardContainer} from "@site/src/components/Card";
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';
import clsx from "clsx";
import styles from "./styles.module.css";
import HTTPMethod from "@site/src/components/HTTPMethod";

export default function APICategoryIndex() {
  const { items } = useCurrentSidebarCategory()

  return (
    <div className={'row'}>
      {items.map(item => {
        if (!('docId' in item)) return false;
        const { method, apiPath, description } = item.customProps as { method: string, apiPath: string, description: string }
        return (
          <article key={item.docId} className={'col col--6 margin-bottom--lg'}>
            <CardContainer to={item.href}>
              <h3>{item.label}</h3>
              <div className={styles.apiSignature}
                   title={`${method} - ${item.customProps.apiPath}`}>
                <HTTPMethod method={method} />
                <span className={clsx('sl-font-mono', styles.apiPath)}>
                  {apiPath}
                </span>
              </div>
              <p className={styles.description}>
                {description}
              </p>
            </CardContainer>
          </article>
        )
      })}
    </div>
  );
}
