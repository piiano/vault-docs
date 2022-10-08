import React from 'react';
import clsx from 'clsx';
import TOCItems, {Props} from '@theme/TOCItems';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';

// Swizzle: https://github.com/facebook/docusaurus/blob/main/packages/docusaurus-theme-classic/src/theme/TOC/index.tsx
// Adds "On this page" title to TOC

// Using a custom className
// This prevents TOCInline/TOCCollapsible getting highlighted by mistake
const LINK_CLASS_NAME = 'table-of-contents__link toc-highlight';
const LINK_ACTIVE_CLASS_NAME = 'table-of-contents__link--active';
export default function TOC({className, ...props}: Props) {
  return (
    <div className={clsx(styles.tableOfContents, 'thin-scrollbar', className)}>
      <h3 className={clsx(styles.tableOfContentsHeading)}>
        <Translate
          id="theme.TOCCollapsible.toggleButtonLabel"
          description="The label used by the button on the collapsible TOC component">
          On this page
        </Translate>
      </h3>
      <TOCItems
        {...props}
        linkClassName={LINK_CLASS_NAME}
        linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
      />
    </div>
  );
}
