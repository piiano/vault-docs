---
sidebar_position: 2.3
---

# Define users

## Learn how to define a new user with a new role

IAM in Vault controls access based on users. These users are assigned a role that defines the capabilities (REST API operations and CLI commands) they can use and policies that provide for fine-grained control over the data they can access. 

This guide demonstrates how to define a new user called `Dashboard` with a new role called `DashboardRole`.

### Walkthrough

In the IAM configuration TOML file, add this text to the `[users]` section:

```
[users.Dashboard]
    role = "DashboardRole"
```

and this to the `[roles]` section:

```
[roles.DashboardRole]
    capabilities = []
    policies     = []
```

The `DashboardRole` role has no capabilities and no policies, therefore this user cannot perform any Vault operations and cannot access any data. 

The [Add capabilities to a role](add-capabilities-to-a-role) and [Define new policies](define-new-policies) guides describe how to assign capabilities and policies to a user.
