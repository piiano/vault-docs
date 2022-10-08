import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Auth0Provider } from "@auth0/auth0-react";
import { useIsOnlineBuild } from "@site/src/hooks/is-online-build";

export const OnlineOnlyAuth0Provider = (props) => {
  const { children } = props;
  const { siteConfig } = useDocusaurusContext();
  const { authDomain, authClientId } = siteConfig.customFields;

  return useIsOnlineBuild() ? (
    <Auth0Provider
      domain={authDomain as string}
      clientId={authClientId as string}
      advancedOptions={{ defaultScope: "openid" }}
    >
      {children}
    </Auth0Provider>
  ) : (
    <>{children}</>
  );
};
