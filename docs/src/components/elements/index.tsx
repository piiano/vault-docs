import React, {useEffect} from 'react';

import {API} from '@stoplight/elements';
// import '@stoplight/elements/styles.min.css';
import './elements.min.css';
import './custom.css';
import {usePluginData} from "@docusaurus/useGlobalData";
import {OpenAPISpec} from "@site/src/components/elements/openapi";
import useIsBrowser from "@docusaurus/useIsBrowser";
import {useLocation} from "@docusaurus/router";

// Major CSS changes:
// 1. Added ".elementsBox" selector to all of the rules, to scope it down to this page only.
// 2. Switched ":root" to ".html"
// 3. Switched "html" -> ".html", and "body" -> ".body"

function useOpenAPISpec(): OpenAPISpec {
  const {openapiSpec} = (usePluginData('docusaurus-plugin-elements', 'elements')) as {openapiSpec: OpenAPISpec };
  return openapiSpec
}


function Elements({path}: {path?: string}) {
  const isBrowser = useIsBrowser();
  const spec = useOpenAPISpec();
  const { pathname } = useLocation();

  const basePath = pathname.slice(1, -path.length)

  useEffect(() => {
    try {
      // Init bearerAuth to 'pvaultauth' if not set already to something else
      // https://github.com/stoplightio/elements/blob/032118a6f3a4c5e649c8693298c4349db945ced6/packages/elements-core/src/components/TryIt/Auth/authentication-utils.ts#L71
      const key = 'TryIt_securitySchemeValues';
      if (!localStorage.getItem(key)) {
          localStorage.setItem(key, JSON.stringify({ bearerAuth: 'pvaultauth' }))
      }
    } catch (e) { }
  }, []);
  return (
     <div className="elementsBox">
      <div className="html">
        <div className="body">
          <API
            // sidebar is hidden by CSS but this the layout we want to show a single operation per page
            layout='sidebar'
            apiDescriptionDocument={spec}
            basePath={basePath}
            hideSchemas={true}
            { ...(isBrowser ? {
              router: 'history',
            }: {
              router: 'static',
              staticRouterPath: path,
            }) }
          />
        </div>
      </div>
    </div>
  );
}

export default Elements;