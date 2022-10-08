import React, { createRef, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ButtonLink from "@site/src/components/ButtonLink";
import { useIsOnlineBuild } from "@site/src/hooks/is-online-build";
import { OnlineOnlyAuth0Provider } from "./provider";
import Highlight from "@site/src/components/Highlight";
import Backdrop from "@site/src/components/Backdrop";

const LOCAL_STORAGE_KEY = "piiano.docs.pvault.license";

type StoredLicense = {
  token: string;
  exp: number;
};

// type guard for StoredLicense
const isStoredLicense = (input: unknown): input is StoredLicense => {
  return (
    input !== null &&
    typeof input === "object" &&
    "exp" in input &&
    typeof input["exp"] === "number" &&
    "token" in input &&
    typeof input["token"] === "string"
  );
};

const RegisterInstruction = () => {
  const { error } = useAuth0();
  const license = useLicense();
  const isOnlineBuild = useIsOnlineBuild();

  if (!isOnlineBuild) {
    return <span>This instance is registered.</span>;
  }

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (license) {
    // If stored but expired.
    if (!storedLicenseValid(license)) {
      return (
        <span>
          Your license key has expired. <RegisterButton /> to renew the license
          for free.
        </span>
      );
    }

    // Stored and valid.
    return (
      <span>
        Thank you for registering 🎉. Your 30 days license key has been appended
        to the docker run command in the following steps, so the command works
        when you copy and paste it to your terminal window.
      </span>
    );
  } else {
    // Not logged in.
    return (
      <span>
        <RegisterButton /> for a free license to activate Vault.
      </span>
    );
  }
};

const RegisterButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <ButtonLink
      size="small"
      onClick={() => {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        loginWithRedirect({
          redirectUri:
            window.location.origin +
            window.location.pathname
              // Trim trailing slash.
              .replace(/\/$/g, ""),
        });
      }}
    >
      Register
    </ButtonLink>
  );
};

const HighlightAfterLogin = (props) => {
  const { children } = props;
  const { isAuthenticated } = useAuth0();
  const [highlight, setHighlight] = useState(false);
  const ref = createRef<HTMLDivElement>();

  useEffect(() => {
    const timer = setTimeout(() => setHighlight(false), 4500);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (highlight) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [highlight]);
  useEffect(() => {
    // Nothing to do if not authenticated.
    if (!isAuthenticated) return;

    if (getLicenseFromStorage()) return;

    setHighlight(true);
  }, [isAuthenticated, getLicenseFromStorage]);

  return (
    <Backdrop show={highlight} hideOnClick onHide={() => setHighlight(false)}>
      <div ref={ref}>
        <Highlight show={highlight}>{children}</Highlight>
      </div>
    </Backdrop>
  );
};

const useLicense = (): StoredLicense | null => {
  // Make sure stored value is valid (token exists + not expired).
  const [license, setLicense] = useState<StoredLicense | null>(
    getLicenseFromStorage()
  );
  const { isAuthenticated, getIdTokenClaims } = useAuth0();

  useEffect(() => {
    // Nothing to do if not authenticated.
    if (license) return;

    // If authenticated and the key is already stored, just return.
    const currentlyStoredToken = getLicenseFromStorage();
    if (currentlyStoredToken) {
      setLicense(currentlyStoredToken);
      return;
    }

    // If authenticated but key is not stored yet, then store it.
    let mounted = true;
    try {
      getIdTokenClaims()
        .then((idToken) => {
          if (mounted && idToken) {
            const license: StoredLicense = {
              token: idToken.__raw,
              exp: idToken.exp,
            };
            setLicense(license);
            setLicenseInStorage(license);
          }
        })
        .catch(() => setLicense(null));
    } catch (e) {
      // always fails when offline
      setLicense(null);
    }

    return () => {
      mounted = false;
    };
  }, [isAuthenticated, getIdTokenClaims]);

  return license ?? null;
};

const getLicenseFromStorage = (): StoredLicense | null => {
  try {
    // Parse from local storage.
    const currentlyStoredToken = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)
    );

    if (isStoredLicense(currentlyStoredToken)) {
      return currentlyStoredToken;
    }

    return null;
  } catch {
    return null;
  }
};

const setLicenseInStorage = (license: StoredLicense): void => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(license));
};

const storedLicenseValid = (input: StoredLicense): boolean => {
  return (
    input && input.exp && input.token && new Date().getTime() / 1000 < input.exp
  );
};

export {
  OnlineOnlyAuth0Provider,
  RegisterButton,
  RegisterInstruction,
  HighlightAfterLogin,
  useLicense,
};
