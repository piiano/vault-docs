import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export const useDockerTag = (): string => {
  const { siteConfig } = useDocusaurusContext();
  return siteConfig.customFields.dockerTag as string;
};

export const DockerTag = () => {
  const dockerTag = useDockerTag();
  return <span>{dockerTag}</span>;
};
