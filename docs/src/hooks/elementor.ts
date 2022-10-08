import React, {Dispatch, SetStateAction} from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

/**
 * Elementor is a WordPress plugin.
 * Our corporate site use Elementor to display some of its pages and components.
 * Elementor saves the following state in local storage to track page-views, sessions, popup states and more.
 *
 * This structure is based on what elementor saves to localStorage.
 *
 * Since both the site and the docs are served from the same domain they share access to localStorage.
 * Using the same state allow users that dismissed the cookies' usage popup to have the browser remember their choice on both the site and the docs.
 */
export type ElementorData = {
  __expiration: object,
  pageViews: number,
  sessions: number,
  /**
   * Count how many times the popup displayed to the user
   */
  popup_1888_times: number,
  /**
   * This is what controls display of the popup
   */
  popup_1888_disable: boolean
}

const elementorLocalStorageKey = 'elementor';

/**
 * Fetch Elementor Data from Local Storage (can be stored by the site or by this component from the docs.)
 */
export function useElementorDataState(): [ElementorData, Dispatch<SetStateAction<ElementorData>>] {
  const {siteConfig} = useDocusaurusContext();
  const enabled = siteConfig.customFields.enablePrivacyPopup ?? false;
  const cachedElementorData = useCachedElementorData();
  const [elementorData, setElementorData] = React.useState(() => {
    // Merge existing elementor cached data with default values
    const data: ElementorData = {
      __expiration: {},
      pageViews: 0,
      sessions: 1,
      popup_1888_times: 0,
      popup_1888_disable: false,
      ...cachedElementorData
    };
    data.pageViews++;
    data.popup_1888_times++;
    return data;
  });
  React.useEffect(() => {
    if (enabled) {
      localStorage.setItem(elementorLocalStorageKey, JSON.stringify(elementorData));
    }
  }, [elementorData, enabled]);
  return [elementorData, setElementorData];
}

/**
 * Fetch Elementor Data from Local Storage (can be stored by the site or by this component from the docs.)
 */
export function useCachedElementorData(): Partial<ElementorData> {
  try {
    const cachedElementorData = JSON.parse(localStorage.getItem(elementorLocalStorageKey));
    if (cachedElementorData !== null && typeof cachedElementorData == 'object') {
      return cachedElementorData;
    }
  } catch (e) { } // Ignore error if localStorage key isn't a valid JSON
  return {};
}
