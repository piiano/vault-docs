---
sidebar_position: 3
---

# View logs

## Learn how to view Piiano Vault logs.

All [system](/guides/monitor/about-system-logs) and [audit](/guides/monitor/about-audit-logs) logs are sent to the STDERR of a Vault container. If you run Vault using `docker run`, the messages are sent to your terminal while Vault is blocking. Alternatively, if you run the container in the background, such as with `docker run`, you can view logs using:

```bash
docker logs [-f] pvault-dev
```

The optional `-f` behaves like `tail -f`.

When running with `docker-compose`, Vault limits the logs to 2 files of up to 50Mb each. These limits are set using this definition in the `docker-compose` YAML configuration file (which you can override):

```yaml
logging:
  driver: "json-file"
  options:
    max-size: "50m"
    max-file: "2"
```
