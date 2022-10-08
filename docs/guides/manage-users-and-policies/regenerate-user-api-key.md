---
sidebar_position: 3
---

# Regenerate user API key

## Learn how to regenerate user API key.

This guide describes how to create an API token for a user.

1. Using the CLI, create an API token for the user `Dashboard` like this:
   ```bash
   pvault iam regen-api-key --name=Dashboard
   ```
2. You get a response similar to this:
    
   ```text
   +--------------------------------------+-------------------------------+
   |                APIKEY                |         APIKEYEXPIRY          |
   +--------------------------------------+-------------------------------+
   | 25969a8f-b9ff-463a-9e5f-c992fad7cb2d | Thu, 01 Jul 2023 00:00:00 UTC |
   +--------------------------------------+-------------------------------+`
   ```
