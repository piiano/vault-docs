---
sidebar_position: 1
---

# Custom configuration file

## Learn how to configure Piiano Vault using custom configuration file.

Vault supports a configuration file in [TOML format](https://en.wikipedia.org/wiki/TOML). The file is searched at `.` and, if not found, then at `/etc/pvault`. [Environment variables](environment-variables), if present, **override** the corresponding values read from the configuration file.

```toml
[db]
hostname = "localhost"
name = "pvault"
user = "pvault"
password = "pvault"
port = 5432
reset = false

[service]
listen_addr = "0.0.0.0:8123"

[log]
level = "info"
```

When [installing Piiano Vault server using Docker](/guides/install/pre-built-docker-containers), you can mount your config directory into the container at this location using:  
`-v /my/local/vault/config/path:/etc/pvault`.

You can always retrieve the current system configuration by calling GetConfiguration on [REST API operation](/api/operations/get-configuration) or [CLI command](/cli/reference#get-system-configuration).