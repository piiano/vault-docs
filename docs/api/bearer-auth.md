---
sidebar_position: 2
sidebar_label: Authentication
---

# Authenticate with a Bearer authorization header

The Piiano Vault REST API uses API keys to authenticate and authorize requests. It accepts Bearer tokens in the HTTP `Authorization` header using the `Bearer <api-key>` scheme.

To obtain an API key, use the regenerate user API key [REST API operation](/api/operations/regenerate-user-api-key) or [CLI command](/cli/reference#regenerate-user-api-key).

See [Manage users and policies](/guides/manage-users-and-policies) to learn more about how Vault controls access to operations and data.
