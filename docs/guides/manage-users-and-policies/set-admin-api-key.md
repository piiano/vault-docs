---
sidebar_position: 4
---

# Set the admin's API key

Vault always has an admin user account, which you use to update the configuration of Vault. Unlike other user accounts, the admin API key is [set using an environment variable](/guides/configure/environment-variables#service-and-features). You can override this API key by changing the value of the environment variable and restarting Vault. This option makes the admin API key a "break the glass" mechanism that enables you to regain control of Vault when all the other API keys have changed.

It is highly recommended that you change the value of the admin API key to a unique value when deploying Vault to production. 
