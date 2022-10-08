import React, {ReactNode, useEffect, useState} from "react";
import "./style.css"

const Highlight = ({children, show = true, onHide}: {children: ReactNode, show?: boolean, onHide?: () => any}) => {
  const [showBackdrop, setShow] = useState(show)
  useEffect(() => setShow(show), [show])
  useEffect(() => showBackdrop || onHide?.(), [showBackdrop])
  return (
    <div className={'transitioned' + (show ? ' highlight' : '')}>{children}</div>
  );
}

export default Highlight
