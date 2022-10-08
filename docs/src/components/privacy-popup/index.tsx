import React from "react";
import "./privacy-popup.css"

export default function PrivacyPopup({ dismiss = () => {} } : { dismiss: () => void }) {
  return (
    <div className='privacy-popup'>
      <span>This website uses cookies. <a target="_blank"
                                          href="https://piiano.com/privacy-policy"
                                          style={{textDecoration: 'underline'}}>Learn more</a>
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="currentColor"
           viewBox="0 0 16 16"
           className='dismiss-btn'
           onClick={() => dismiss() }>
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
      </svg>
    </div>
  );
}
