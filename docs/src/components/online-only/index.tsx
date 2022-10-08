import React, {ReactChild} from "react";
import {useIsOnlineBuild} from "@site/src/hooks/is-online-build";

export function OnlineOnly({ children }: { children: ReactChild }) {
  const isOnline = useIsOnlineBuild()
  return (<>{ (isOnline ?? false) && children }</>)
}
