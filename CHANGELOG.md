# Changelog

## v0.9.6 - Beta (2022-09-25)

#### New features

- CLI json output if formatted by default. Added a new flag `-c` to get a compact output.
- New configuration to enable masking for the License returned by 'get-license' endpoint.
- New `pvault-dev` edition for a single-container all-in-one Vault. Docker images available at `piiano/pvault-dev`.
  
#### Logic change

- General terminology change! `Vault Lite` --> `Vault Server`, `Vault Mini` --> `Vault ServerX`.
- Objects and tokens does not expire by default.
- `hide-builtins` option and flag changed to `show-builtins` (with reverse logic). Builtins are not showed by default.
- Parameters for 'get-token' API moved to from the HTTP request query the HTTP request body.
- Parameters for 'regenerate-user-api-key' API moved to from the HTTP request query the HTTP request body.
- 'get-kms' API URL change: `/api/pvlt/1.0/system/kms` —> `/api/pvlt/1.0/system/info/kms`
- Access reason is no longer required by Control APIs.
- 'garbage-collection' API changed from GET HTTP request to POST.

#### Bug fixes

- Fix bug of failure to tokenize from object with TTL.
- Fix bug of Data failed to initialize because of Snowflake ID initialization.

##### BREAKING CHANGE
Docker image `piiano/pvault-lite` is still available, but new versions will be pushed to `piiano/pvault-server` for this version onwards.

#### Known issues and limitations

- Queries can match properties only in their base form (properties without transformations, such as `ssn.mask`).
- Some REST API calls do not receive error messages. However, these error messages are printed on the server-side. To view these error messages, use STDOUT or STDERR in Docker. See the Docker article [View logs for a container or service](https://docs.docker.com/config/containers/logging/) for more information on accessing these logs.
- The maximum length of the property name and description is 450 characters.
- The maximum length of the value in encrypted and unencrypted string-based properties, including properties using PTypes for email address, SSN, and bank account number, is limited to 450 characters.
- Encrypted arrays and arrays with mixed elements do not work as expected.
- Large `int64` values may lose their precision.
- TTL of an object does not affect owned objects, and those may outlive their owner.
- Deletion of a collection will hard-delete its objects.
- No pagination for tokens APIs: Get tokens metadata, Detokenization.
- No pagination for "Get objects by IDs" API. When requesting a number of objects which exceeds the page size (see above), an error is returned.

## v0.9.5 - Beta (2022-09-12)

#### New features

- All timestamps in the system now include a timezone.
- In memory caching support to improve performance.
- All the Vault instances in the same system can be listed with `pvault system cluster-info`.
- TTL inheritance for objects and tokens.
- Renamed CLI `pvault token lookup` command to `pvault token detokenize`.

#### Bug fixes
- Pagination is now guaruanteed to return sorted
- Fix Policy engine integration if wildcard evaluator with type selectors.
- Prepend `--` to CLI flag errors.
- Support for single letter collections.

##### BREAKING CHANGE
Vault now requires a valid license to startup. You can follow the instructions in [Getting Started](/guides/get-started#prerequisites) page to retrieve a license.

#### Known issues and limitations

- Queries can match properties only in their base form (properties without transformations, such as `ssn.mask`).
- Some REST API calls do not receive error messages. However, these error messages are printed on the server-side. To view these error messages, use STDOUT or STDERR in Docker. See the Docker article [View logs for a container or service](https://docs.docker.com/config/containers/logging/) for more information on accessing these logs.
- The maximum length of the property name and description is 450 characters.
- The maximum length of the value in encrypted and unencrypted string-based properties, including properties using PTypes for email address, SSN, and bank account number, is limited to 450 characters.
- Encrypted arrays and arrays with mixed elements do not work as expected.
- Large `int64` values may lose their precision.
- Deletion of a collection will hard-delete its objects.
- No pagination for tokens APIs: Get tokens metadata, Detokenization.
- No pagination for "Get objects by IDs" API. When requesting a number of objects which exceeds the page size (see above), an error is returned.

## v0.9.2 - Beta (2022-09-06)

#### New features

- Documentation improvements.
- New rotate token API and CLI for generating a new token-id for an existing token.

#### Known issues and limitations

- Queries can match properties only in their base form (properties without transformations, such as `ssn.mask`).
- Some REST API calls do not receive error messages. However, these error messages are printed on the server-side. To view these error messages, use STDOUT or STDERR in Docker. See the Docker article [View logs for a container or service](https://docs.docker.com/config/containers/logging/) for more information on accessing these logs.
- The maximum length of the property name and description is 450 characters.
- The maximum length of the value in encrypted and unencrypted string-based properties, including properties using PTypes for email address, SSN, and bank account number, is limited to 450 characters.
- Encrypted arrays and arrays with mixed elements do not work as expected.
- Large `int64` values may lose their precision.
- TTL of an object does not affect owned objects, and those may outlive their owner.
- Deletion of a collection will hard-delete its objects.
- No pagination for tokens APIs: Get tokens metadata, Detokenization.
- No pagination for "Get objects by IDs" API. When requesting a number of objects which exceeds the page size (see above), an error is returned.

## v0.9.1 - Beta (2022-08-18)

#### New features

- Docker compose installation now include TLS configuration for Traefik.
- Updated pagination behaviour in the CLI.
- The database schema version is now returned with the version API and CLI command.
- Changes to GC CLI flags and API query params.
- IAM policies can now specify resource selector for PII type.
- Bug fix for IAM policy with Allow + Deny combination.
- Add logs for DB connection failure reason.
- Added support for a seeded local KMS.
- Objects and tokens now have the same mechanism and API to deal with expiration.

#### Known issues and limitations

- Queries can match properties only in their base form (properties without transformations, such as `ssn.mask`).
- Some REST API calls do not receive error messages. However, these error messages are printed on the server-side. To view these error messages, use STDOUT or STDERR in Docker. See the Docker article [View logs for a container or service](https://docs.docker.com/config/containers/logging/) for more information on accessing these logs.
- The maximum length of the property name and description is 450 characters.
- The maximum length of the value in encrypted and unencrypted string-based properties, including properties using PTypes for email address, SSN, and bank account number, is limited to 450 characters.
- Encrypted arrays and arrays with mixed elements do not work as expected.
- Large `int64` values may lose their precision.
- TTL of an object does not affect owned objects, and those may outlive their owner.
- Deletion of a collection will hard-delete its objects.
- No pagination for tokens APIs: Get tokens metadata, Detokenization.
- No pagination for "Get objects by IDs" API. When requesting a number of objects which exceeds the page size (see above), an error is returned.

#### Breaking changes
- Environment variables name change:
  - `PVAULT_LITE_SELFSIGNED` --> `PVAULT_TLS_SELFSIGNED`
  - `PVAULT_LITE_CERT_FILE` --> `PVAULT_TLS_CERT_FILE`
  - `PVAULT_LITE_KEY_FILE` --> `PVAULT_TLS_KEY_FILE`
  - `PVAULT_LITE_LISTEN_ON_HTTP` --> `PVAULT_TLS_ENABLE` (meaning is inversed)

## v0.9.0 - Beta (2022-08-08)

#### Known issues and limitations

- Queries can match properties only in their base form (properties without transformations, such as `ssn.mask`).
- Some REST API calls do not receive error messages. However, these error messages are printed on the server-side. To view these error messages, use STDOUT or STDERR in Docker. See the Docker article [View logs for a container or service](https://docs.docker.com/config/containers/logging/) for more information on accessing these logs.
- The maximum length of the property name and description is 450 characters.
- The maximum length of the value in encrypted and unencrypted string-based properties, including properties using PTypes for email address, SSN, and bank account number, is limited to 450 characters.
- Encrypted arrays and arrays with mixed elements do not work as expected.
- Large `int64` values may lose their precision.
- TTL of an object does not affect owned objects, and those may outlive their owner.
- Deletion of a collection will hard-delete its objects.
- No pagination for tokens APIs: Get tokens metadata, Detokenization.
- No pagination for "Get objects by IDs" API. When requesting a number of objects which exceeds the page size (see above), an error is returned. 
