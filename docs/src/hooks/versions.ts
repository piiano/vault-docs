import axios from "axios";
import {ReactNode, useEffect, useState} from "react";
import useIsBrowser from "@docusaurus/useIsBrowser";
import {LinkLikeNavbarItemProps} from "@theme/NavbarItem";
import {useIsOnlineBuild} from "@site/src/hooks/is-online-build";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {usePluginData} from "@docusaurus/useGlobalData";


// hook to get array of all available docs versions
export function useVersionsAPI(): Version[] {
  const isOnline = useIsOnlineBuild()
  const {siteConfig} = useDocusaurusContext();
  // const [versions, setVersions] = useState<Version[]>([])
  const [versions, setVersions] = useState<Version[]>([])

  useEffect(() => {
    const { vaultVersionsPath } = siteConfig.customFields;
    // we don't want to call to setVersions if the component is already unmounted
    let unmounted = false
    if (!isOnline || !vaultVersionsPath || typeof vaultVersionsPath !== 'string') return
    axios.get(vaultVersionsPath, {withCredentials: true}).then(resp => {
      // validate response and that the component didn't unmount
      if (!unmounted && resp.status === 200 && isVersionsArray(resp.data)) {
        setVersions(resp.data)
      }
    })
    // when unmounted set unmounted to true
    return () => {
      unmounted = true
    }
  }, [isOnline, siteConfig])
  return versions
}

export function useDropdownVersions(): DropdownVersions {
  // // Get the version associate with this build
  const isBrowser = useIsBrowser()
  const isOnlineBuild = useIsOnlineBuild()
  const {siteConfig} = useDocusaurusContext();
  const docsPluginData = usePluginData('docusaurus-plugin-content-docs') as { versions: Array<{ label: ReactNode }> }

  const { vaultVersion, docsURL, currentDocsBasePath } = siteConfig.customFields ?? {}
  const allVersions = useVersionsAPI()
  const currentVersion: Version = allVersions.find(v => v.version === vaultVersion)

  // present the dropdown only if online & in browser, have versions returned by the API and have the current version there.
  if (!isBrowser || !isOnlineBuild || !vaultVersion || !docsURL || allVersions.length == 0 || !currentVersion || typeof currentDocsBasePath !== "string") {
    return {newerVersions:[],olderVersions:[]}
  }
  const { pathname = '', hash = '' } = isBrowser ? (window.location ?? {}) : {};
  // Create Nav Items from versions
  const allVersionsNavItems = allVersions.map((version: Version, i: number): LinkLikeNavbarItemProps => {
    // the versions are sorted, so we treat the first version as the latest.
    const isLatest = i === 0
    // we want to try and navigate to the same page on a different version.
    // if it's not exist we will get redirected to the home page of that version.
    const versionBasePath = isLatest ? '/docs' : version.path
    let href = `${docsURL}${versionBasePath}`
    if (pathname.startsWith(currentDocsBasePath)) {
      href = `${docsURL}${versionBasePath}${pathname.slice(currentDocsBasePath.length)}${hash}`
    }
    // Add Beta suffix to version starting with `0.`
    const betaSuffix = `${version.version.startsWith('0.') ? ' (Beta)' : ''}`;
    // Add Latest suffix to latest version label
    const latestSuffix = `${isLatest ? ' - Latest' : ''}`;

    return {
      href,
      label: `v${version.version}${betaSuffix}${latestSuffix}`,
      activeBasePath: version.path,
      target: '_self'
    };
  });
  // Split to older and newer versions using current version as a pivot.
  // The current version is excluded since docusaurus adds it on its own.
  const currentVersionIndex = allVersions.findIndex((v: Version) => (v.version === currentVersion.version));

  // hack: update label for the current version by mutating the plugin data (happens only in runtime).
  docsPluginData.versions[0].label = allVersionsNavItems[currentVersionIndex].label

  const newerVersions = allVersionsNavItems.slice(0, currentVersionIndex);
  const olderVersions = allVersionsNavItems.slice(currentVersionIndex + 1);
  return {olderVersions, newerVersions};
}


type Version = {
  version: string
  path: string
}

type DropdownVersions = {
  newerVersions: LinkLikeNavbarItemProps[],
  olderVersions: LinkLikeNavbarItemProps[]
}

function isVersion(value: unknown): value is Version {
  return value !== null && typeof value === 'object' &&
    typeof value['path'] === 'string' &&
    typeof value['version'] === 'string'
}

function isVersionsArray(value: unknown): value is Array<Version> {
  return value !== null && Array.isArray(value) && value.every(isVersion)
}
