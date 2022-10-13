---
sidebar_position: 1
---

# About system logs

## Learn how Piiano Vault collects system logs.

Vault collects system logs to enable the Piiano team to improve your experience, identify faults, and enhance Vault. System logs include system-level events and application logs. These logs are sent to [DataDog](https://www.datadoghq.com).

When an unexpected error occurs, Vault sends telemetry to [Sentry](https://sentry.io). This telemetry does not include any PII or other data stored in Vault.

### Log content

Logs provide details about your interactions with Vault. To protect your business and its PII data, these logs do not include PII data or any information about the your configuration of Vault, such as collection or property names. This is an example of a typical log:

```json
{
    "app_trace_id": "",
    "caller": "/app/common/rest/mws.go:102",
    "collection": "customers",
    "duration": 0.466146,
    "level": "info",
    "message": "Done",
    "method": "GET",
    "path": "/api/pvlt/1.0/data/collections/customers/objects?id=a9a97bc6-4897-4f26-83a6-1884f71695c5&options=unsafe&reason=Analytics",
    "reason": "Analytics",
    "request_ip": "10.0.1.254",
    "server_trace_id": "0191c76e-a487-480b-b2c0-896e00a3e9d2",
    "service": "data",
    "status_code": 200,
    "time": 1649078327323
}
```

Each log contains your unique and random Vault ID, which is used to identify your logs. You can view your Vault ID by running [`pvault version`](/cli/reference#version).

### DataDog logging

Vault confirms it is sending logs to DataDog by printing this to the terminal during start up:

```bash
Enabling Datadog log backend
Attention: Sending usage logs and metrics for analytics purpose and improving the product. Your data never leaves the Vault.
```

To disable the sending of logs to DataDog, add this environment variable to 'docker run':

```bash
-e PVAULT_LOG_DATADOG_ENABLE=false
```

The 'DataDogEnable' flag then confirms that logging is disabled like this:

```bash
...Log:{Level:info DataDogAPIKey:xxxxxxxxxxxxxxxxx DataDogEnable:false DataDogSource:prod}}"}...
```

### Sentry telemetry

Vault confirms it is sending unexpected errors telemetry to Sentry by printing this to the terminal during start up:

```bash
Enabling Sentry telemetry
Attention: Sending unexpected crash telemetry
```

To disable the sending of telemetry to Sentry, add this environment variable to 'docker run':

```bash
-e PVAULT_SENTRY_ENABLE=false
```

The 'Sentry' flag group confirms that logging is disabled like this:

```bash
...Sentry:{Enable:false DSN:}...
```

### Observability additional data

To identify a Vault instance in Datadog and Sentry, two additional configuration options are available. Providing these configuration options enables Piiano to proactively assist you with errors in your Vault environment.

- `PVAULT_LOG_CUSTOMER_IDENTIFIER` to record your customer identifier.
- `PVAULT_LOG_CUSTOMER_ENV` to identify your environment. The recommended values are `PRODUCTION`, `STAGING`, and `DEV`.

### Setting persistence

If you run Vault with the `--rm` flag, the logs and telemetry are restarted when you restart Vault. To persist the changes across restarts, run Vault without the `--rm` flag.
