import React from 'react';
import Link from '@docusaurus/Link';
import {useThemeConfig} from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import FooterCopyright from '@theme/Footer/Copyright';
import type {Props} from '@theme/Footer/LinkItem';

// Override link item to avoid adding IconExternalLink component
function LinkItem({item}: Props): JSX.Element {
  const {to, href, label, prependBaseUrlToHref, ...props} = item;
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, {forcePrependBaseUrl: true});
  return (
    <Link
      className="footer__link-item"
      {...(href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            to: toUrl,
          })}
      {...props}>
      {label}
    </Link>
  );
}

// Swizzle: https://github.com/facebook/docusaurus/blob/main/packages/docusaurus-theme-classic/src/theme/Footer/index.tsx
// We don't swizzle FooterLayout because we need to override FooterLinks to use our own FooterLinkItem
function Footer(): JSX.Element | null {
  const {footer} = useThemeConfig();
  if (!footer) {
    return null;
  }
  const {copyright, links = []} = footer;

  return <footer className="margin-bottom--md margin-top--md">
    <div className="container container--fluid">
      <div className="text--center">
        { links.map((item, i) => (
          <React.Fragment key={i}>
            <LinkItem item={item} />
          </React.Fragment>
        )) }
        { copyright && <FooterCopyright copyright={copyright} /> }
      </div>
    </div>
  </footer>
}

export default React.memo(Footer);
