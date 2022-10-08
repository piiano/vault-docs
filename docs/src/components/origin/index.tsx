import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useIsBrowser from '@docusaurus/useIsBrowser';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export const useOrigin = (path = '') => {
  const isBrowser = useIsBrowser();
  const {siteConfig} = useDocusaurusContext();
  const origin = isBrowser ? window.location.origin : siteConfig.customFields.docsURL;

  return origin + useBaseUrl(path);
};

export const Origin = ({ path = '' }) => {
  const url = useOrigin(path);
  return <span>{url}</span>;
};
