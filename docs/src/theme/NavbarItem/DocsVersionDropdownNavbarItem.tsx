import React from 'react';
import DocsVersionDropdownNavbarItem from '@theme-original/NavbarItem/DocsVersionDropdownNavbarItem';
import {useDropdownVersions} from "@site/src/hooks/versions";
import {OnlineOnly} from "@site/src/components/online-only";

// This component is loaded by docusaurus automatically.
// https://docusaurus.io/docs/swizzling#wrapping
export default function DocsVersionDropdownNavbarItemWrapper(props) {
  const {newerVersions, olderVersions} = useDropdownVersions()
  return (
    <OnlineOnly>
      <DocsVersionDropdownNavbarItem {...props}
                                     dropdownItemsBefore={newerVersions}
                                     dropdownItemsAfter={olderVersions}/>
    </OnlineOnly>
  );
}
