import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export const useIsBasicAuthEnabled = () => {
  const { siteConfig } = useDocusaurusContext()
  return !!siteConfig.customFields.basicAuthEnabled;
};
