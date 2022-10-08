import React, {ReactNode, useEffect, useState} from "react";
import "./style.css"

const Backdrop = ({children, show = true, hideOnClick = true, onHide}: {children: ReactNode, show?: boolean, hideOnClick?: boolean, onHide?: () => any}) => {
  const [showBackdrop, setShow] = useState(show)
  useEffect(() => setShow(show), [show])
  useEffect(() => showBackdrop || onHide?.(), [showBackdrop])
  return (
    <>
      <div className={'transitioned backdrop'} onClick={() => hideOnClick && setShow(false)} style={{
        opacity: showBackdrop ? 0.75 : 0, pointerEvents: showBackdrop ? 'auto' : 'none'
      }}/>
      {children}
    </>
  );
}


export default Backdrop
