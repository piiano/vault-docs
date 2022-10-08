import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export const useIsOnlineBuild = () => {
  const { siteConfig } = useDocusaurusContext();
  return !!siteConfig.customFields.isOnlineBuild;
};
