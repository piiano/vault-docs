---
sidebar_position: 3
---

# TLS

## Learn how to configure Piiano Vault to use TLS.

To configure [Dev edition](/architecture/editions#dev) or the [Server edition](/architecture/editions#server) to use TLS (and listen as HTTPS), use one of these options:

1. Set the environment variable `PVAULT_TLS_ENABLE` to 1, set `PVAULT_TLS_CERT_FILE` to the TLS
   certificate location, and `PVAULT_TLS_KEY_FILE` to the private key location. For example, if running Vault Dev, add these flags to the `docker run` command:

   ```bash
   -v $(pwd):/certs -e \
   -e PVAULT_TLS_ENABLE=1 \
   -e PVAULT_TLS_CERT_FILE=/certs/pvault.crt \
   -e PVAULT_TLS_KEY_FILE=/certs/pvault.key \
   ```

   Then, use this command to generate the key and certificate:

   ```bash
   openssl req -newkey rsa:2048 -nodes -keyout pvault.key -x509 -days 365 -out pvault.crt -subj "/CN=localhost/O=Piiano"
   ```

2. Set the environment variable `PVAULT_TLS_SELFSIGNED` to `true` to instruct Vault to generate and use a
   self-signed certificate that is valid for 1 year. The default toolchains do not trust this certificate. To accept
   the certificate, configure the client to allow insecure connections (for example, by running `curl -k` when using
   cURL).
