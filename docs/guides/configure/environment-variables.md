---
sidebar_position: 2
---

# Environment variables

## Learn how to configure Piiano Vault using environment variables.

You can set environment variables to configure Piiano Vault, which take precedence over
the [configuration file](custom-configuration-file) of the Piiano Vault settings.

:::info
The [Set configuration variable](/api/operations/set-conf-var) REST API call
and [Set configuration variable](/cli/reference#set-configuration-variable) CLI command enable some environment
variables to be configured dynamically. Refer to the REST API or CLI documentation for details of the supported
environment variables.
:::

### Production and development mode

| Name           |  Type  | Default (Dev / Server) | Edition | Details                                                                                                                                                                                                                                            |
| :------------- | :----: | :--------------------: | :-----: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PVAULT_DEVMODE | `bool` |        `false`         |   All   | Whether Vault runs in development mode. The mode also determines the [default values for several environment variables](#variables-dependent-on-pvault_devmode). If those variables are set, that value overrides the default implied by the mode. |

### Variables dependent on PVAULT_DEVMODE

| Name                               | Default when PVAULT_DEVMODE is `true` | Default when PVAULT_DEVMODE is `false` |
| ---------------------------------- | ------------------------------------- | -------------------------------------- |
| PVAULT_SERVICE_ADMIN_MAY_READ_DATA | `true`                                | `false`                                |
| PVAULT_TLS_ENABLE                  | `false`                               | `true`                                 |
| PVAULT_DB_REQUIRE_TLS              | `false`                               | `true`                                 |

### Database

| Name                                             |   Type   |                  Default (Dev / Server)                  | Edition | Details                                                                                                                                                                                                                                                    |
| :----------------------------------------------- | :------: | :------------------------------------------------------: | :-----: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PVAULT_DB_HOSTNAME                               | `string` |                      `"localhost"`                       |   All   | Hostname of the running database                                                                                                                                                                                                                           |
| PVAULT_DB_NAME                                   | `string` |                        `"pvault"`                        |   All   | Name of the database to connect to                                                                                                                                                                                                                         |
| PVAULT_DB_USER                                   | `string` |                        `"pvault"`                        |   All   | Username for the database                                                                                                                                                                                                                                  |
| PVAULT_DB_PASSWORD                               | `string` |                        `"pvault"`                        |   All   | Password for the database                                                                                                                                                                                                                                  |
| PVAULT_DB_PORT                                   |  `int`   |                          `5432`                          |   All   | Port of the running database                                                                                                                                                                                                                               |
| PVAULT_DB_REQUIRE_TLS                            |  `bool`  | [Mode dependent](#variables-dependent-on-pvault_devmode) |   All   | Vault tries to connect to the database with TLS. If this value is `true` and the connection fails, Vault does not start. If this value is `false` and the connection fails, Vault starts and connects without TLS                                          |
| PVAULT_DB_MAX_OPEN_CONNS                         |  `int`   |                           `16`                           |   All   | Maximum number of open connections to the backend database–do not modify unless requested to do so by the Piiano team                                                                                                                                      |
| PVAULT_DB_MAX_IDLE_CONNS                         |  `int`   |                           `16`                           |   All   | Maximum number of idle connections to the backend database–do not modify unless requested to do so by the Piiano team                                                                                                                                      |
| PVAULT_DB_CONN_MAX_LIFETIME_MINUTES              |  `int`   |                           `5`                            |   All   | The limit on the time, in minutes, a connection to the backend database is maintained–do not modify unless requested to do so by the Piiano team                                                                                                           |
| PVAULT_DB_MIGRATION_AUTO_RUN                     |  `bool`  |                          `true`                          |   All   | Whether Vault sets up the database during migration. Set to `false` when performing the database migration externally                                                                                                                                      |
| PVAULT_DB_MIGRATION_ENABLE_RETRIES               |  `bool`  |                          `true`                          |   All   | Whether Vault performs retries for the database migration. When running the migration in Vault and multiple instances are running, this option must be `true` to handle race conditions. When running the migration externally, this can be set to `false` |
| PVAULT_DB_MIGRATION_INITIAL_WAIT_BETWEEN_RETRIES | `string` |                          `20ms`                          |   All   | The initial wait duration between retries for the migration exponential backoff                                                                                                                                                                            |
| PVAULT_DB_MIGRATION_MAX_WAIT_BETWEEN_RETRIES     | `string` |                           `5s`                           |   All   | The maximum wait duration between retries for the migration exponential backoff                                                                                                                                                                            |
| PVAULT_DB_MIGRATION_MAX_RETRIES                  |  `int`   |                           `25`                           |   All   | The maximum number of retries attempts for the migration exponential backoff                                                                                                                                                                               |
| PVAULT_DB_GC_GRACE_PERIOD_DAYS                   |  `int`   |                           `30`                           |   All   | The number of days deleted and expired objects and tokens are held before they are hard-deleted by the purge objects and tokens [REST API operation](/api/operations/garbage-collection) and [CLI command](/cli/reference#purge-objects-and-tokens).       |

### Key management service

A key management service (KMS) should be configured when property encryption is turned on
with `PVAULT_FEATURES_ENCRYPTION`. For more information on using a KMS and property encryption,
see [Key management service](/data-security/property-encryption#key-management-service) on the encryption page.

| Name            |   Type   | Default (Dev / Server) | Edition | Details                                                     |
| :-------------- | :------: | :--------------------: | :-----: | :---------------------------------------------------------- |
| PVAULT_KMS_URI  | `string` |          `""`          |   All   | The KMS key URI used for property encryption                |
| PVAULT_KMS_SEED | `string` |          `""`          |   All   | Generate a local KMS using this seed (KMS_URI can be unset) |

### Service and features

| Name                                          |   Type   |                   Default (Dev / Server)                    | Edition | Details                                                                                                                                                                          |
| :-------------------------------------------- | :------: | :---------------------------------------------------------: | :-----: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PVAULT_SERVICE_LISTEN_ADDR                    | `string` |                      `"0.0.0.0:8123"`                       |   All   | Listener address of Vault                                                                                                                                                        |
| PVAULT_SERVICE_ADMIN_API_KEY                  | `string` |                       `"pvaultauth"`                        |   All   | The admin API key for authentication                                                                                                                                             |
| PVAULT_SERVICE_FORCE_ACCESS_REASON            |  `bool`  |                           `true`                            |   All   | Whether Vault should force a valid access reason to be provided with calls                                                                                                       |
| PVAULT_SERVICE_ADMIN_MAY_READ_DATA            |  `bool`  | [Mode dependent](#variables-dependent-on-by-pvault_devmode) |   All   | Whether Admin is allowed to read data                                                                                                                                            |
| PVAULT_FEATURES_ENCRYPTION                    |  `bool`  |                           `true`                            |   All   | Whether properties set as `is_encrypted` are encrypted                                                                                                                           |
| PVAULT_FEATURES_API_KEY_HASHING               |  `bool`  |                           `true`                            |   All   | Whether API keys for users are hashed when stored on the database                                                                                                                |
| PVAULT_FEATURES_POLICY_ENFORCEMENT            |  `bool`  |                           `true`                            |   All   | Whether  [policy management](/data-security/identity-and-access-management#policy-management) is enforced                                                                        |
| PVAULT_FEATURES_MASK_LICENSE                  |  `bool`  |                           `false`                           |   All   | Whether Vault's service license will be maskd while retrieving it using [Get license API](/api#/operations/get-license) or [Get license CLI](/cli/Reference#get-license-details) |
| PVAULT_SERVICE_TIMEOUT_SECONDS                | `float`  |                            `30`                             |   All   | Timeout in seconds for REST API calls                                                                                                                                            |
| PVAULT_SERVICE_DEFAULT_PAGE_SIZE              |  `int`   |                            `100`                            |   All   | The default page size for object queries when the page size is not specified. The page size is the maximum number of objects that may be requested in one call.                  |
| PVAULT_SERVICE_MAX_PAGE_SIZE                  |  `int`   |                           `1000`                            |   All   | The maximum page size that can be specified for a call. The page size is the maximum number of objects that may be requested in one call.                                        |
| PVAULT_SERVICE_CACHE_REFRESH_INTERVAL_SECONDS |  `int`   |                            `30`                             |   All   | The refresh interval in seconds of the control data cache that serves the data APIs (under `/api/pvlt/1.0/data/`). If this value is zero the cache is disabled.                  |

### Logs and telemetry

See [Logs](/guides/monitor/about-system-logs) for more information on logs and telemetry.

| Name                           |   Type   | Default (Dev / Server) | Edition | Details                                                                                                                  |
|:-------------------------------| :------: | :--------------------: | :-----: |:-------------------------------------------------------------------------------------------------------------------------|
| PVAULT_LOG_LEVEL               | `string` |        `"info"`        |   All   | Log level (supports `debug`, `info`, `warn`, and  `error`)                                                               |
| PVAULT_LOG_DATADOG_ENABLE      |  `bool`  |         `true`         |   All   | Enable Datadog logs and metrics                                                                                          |
| PVAULT_LOG_DATADOG_ENV         | `string` |        `"prod"`        |   All   | Controls env field of logs sent to Datadog                                                                               |
| PVAULT_LOG_DATADOG_APM_ENABLE  |  `bool`  |        `false`         |   All   | Enable Datadog application performance monitoring (APM)                                                                  |
| PVAULT_SENTRY_ENABLE           |  `bool`  |         `true`         |   All   | Enable Sentry telemetry logging                                                                                          |
| PVAULT_LOG_CUSTOMER_IDENTIFIER | `string` |          ` `           |   All   | Identifies the customer in all the observability platforms                                                               |
| PVAULT_LOG_CUSTOMER_ENV        | `string` |          ` `           |   All   | Identifies the environment in all the observability platforms. Recommended values are `PRODUCTION`, `STAGING`, and `DEV` |

### TLS

See [TLS](/guides/configure/tls) for more information on configuring Piiano Vault to use TLS.

| Name                  |   Type   |                   Default (Dev / Server)                    | Edition | Details                                                                                                                                                          |
| :-------------------- | :------: | :---------------------------------------------------------: | :-----: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PVAULT_TLS_SELFSIGNED |  `bool`  |                           `false`                           |   All   | Whether Vault runs with a self-signed TLS key (valid for 24h)                                                                                                    |
| PVAULT_TLS_ENABLE     |  `bool`  | [Mode dependent](#variables-dependent-on-by-pvault_devmode) |   All   | Whether Vault listens on HTTPS (TLS). If `false`, Vault listens on HTTP. If PVAULT_TLS_SELFSIGNED is `true`, this setting is ignored and Vault listens on HTTPS. |
| PVAULT_TLS_CERT_FILE  | `string` |                            `""`                             |   All   | Path to the TLS certificate file. Must be valid to enable listening on HTTPS (TLS)                                                                               |
| PVAULT_TLS_KEY_FILE   | `string` |                            `""`                             |   All   | Path to the TLS key file. Must be valid to enable listening on HTTPS (TLS)                                                                                       |

### Time to live

| Name                            |      Type       |      Default (Dev / Server)      | Edition | Details                                             |
| :------------------------------ | :-------------: | :------------------------------: | :-----: | :-------------------------------------------------- |
| PVAULT_TTL_TOKENS               | `time.Duration` | `""` <br /> Objects don't expire |   All   | Default time to live (TTL) for tokens.              |
| PVAULT_TTL_ASSOCIATED_OBJECTS   | `time.Duration` | `""` <br /> Objects don't expire |   All   | Default time to live (TTL) for associated object.   |
| PVAULT_TTL_UNASSOCIATED_OBJECTS | `time.Duration` | `""` <br /> Objects don't expire |   All   | Default time to live (TTL) for unassociated object. |

:::info
The duration string is a decimal fraction with a time unit suffix, such as "300ms", "-1.5h", or "2h45m". Valid time units
are "ns", "us" (or "µs"), "ms", "s", "m", and "h".
:::

### Docker Compose configurations

These environment variables can be used
when [installing Piiano Vault server using Docker Compose](/guides/install/pre-built-docker-containers#run-with-docker-compose):

| Name              | Type  | Default |     Edition      | Details                                                                |
| :---------------- | :---: | :-----: | :--------------: | :--------------------------------------------------------------------- |
| SERVER_API_PORT   |  int  |  8123   | Server / ServerX | Listener port for Vault Server and of the router (Traefik) for ServerX |
| CONTROL_API_PORT  |  int  |  8124   |     ServerX      | Listener port for the control plane of Vault                           |
| DATA_API_PORT     |  int  |  8125   |     ServerX      | Listener port for the data plane of Vault                              |
| TRAEFIK_DASH_PORT |  int  |  8080   |     ServerX      | Listener port for the router (Traefik) dashboard                       |
