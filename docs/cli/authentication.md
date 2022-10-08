---
sidebar_position: 1.2
sidebar_label: Authentication
---

# Piiano CLI user authentication 

The Piiano CLI uses a user [API key](/guides/manage-users-and-policies) to authenticate its communication. An environment variable and a CLI flag are available to set the key value.

### Environment variables

You set the API key using the `PVAULT_AUTH_TOKEN` environment variable. See [Global flags](../cli/globals) for more information on using and setting CLI environment variables.

### CLI flag

You set the API key using  the `--authtoken` global flag. This flag overrides the local (environment variable) configuration. Use it to run one-off commands with a specific API key.
