import React from "react";
import PrivacyPopup from "@site/src/components/privacy-popup";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useElementorDataState } from "@site/src/hooks/elementor";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { OnlineOnlyAuth0Provider } from "@site/src/components/registration";

/**
 * The Root component allow to customize carousals page layout for all pages.
 * https://docusaurus.io/docs/next/swizzling#wrapper-your-site-with-root
 */
export default function Root({ children }) {
  const { siteConfig } = useDocusaurusContext();
  const { enablePrivacyPopup = false } = siteConfig.customFields;
  const [elementorData, setElementorData] = useElementorDataState();

  const showPrivacyPopup = React.useMemo(() => {
    return (
      enablePrivacyPopup && elementorData && !elementorData.popup_1888_disable
    );
  }, [enablePrivacyPopup, elementorData]);

  return (
    <OnlineOnlyAuth0Provider>
      {showPrivacyPopup && (
        <BrowserOnly>
          {() => (
            <PrivacyPopup
              dismiss={() =>
                setElementorData((prev) => ({
                  ...prev,
                  popup_1888_disable: true,
                }))
              }
            />
          )}
        </BrowserOnly>
      )}
      {children}
    </OnlineOnlyAuth0Provider>
  );
}
