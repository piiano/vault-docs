# Manage users and policies

## Learn how to manage Piiano Vault users, roles and access policies.

In this guide, you'll learn about how [identity and access management](/data-security/identity-and-access-management) users, roles and policies are represented in the API, how to set IAM configuration, and how to get current IAM configuration. You'll also learn how to regenerate user API keys.

---

[Identity and access management](/data-security/identity-and-access-management) users, roles, and policies are defined using a [TOML configuration file](toml) loaded using the Set IAM configuration [REST API operation](/api/operations/set-iam-conf) or [CLI command](/cli/reference#set-iam-configuration).

Once a user is defined in Vault, their API key is obtained using the Regenerate user API key [REST API operation](/api/operations/regenerate-user-api-key) or [CLI command](/cli/reference#regenerate-user-api-key).