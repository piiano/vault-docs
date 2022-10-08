import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export const useVaultVersion = (): string => {
  const {siteConfig} = useDocusaurusContext();
  return siteConfig.customFields.vaultVersion as string;
};

export const VaultVersion = () => {
  const vaultVersion = useVaultVersion();
  return <span>{vaultVersion}</span>;
};
