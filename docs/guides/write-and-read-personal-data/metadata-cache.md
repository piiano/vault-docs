---
sidebar_position: 2.6
---

# Metadata cache

## Overview

The Vault maintains an in memory cached copy of your collection's schema, IAM and other configurations.
The purpose for this cache is to speed up data access. If you are running multiple Vault containers, 
please familiarize yourself with the implications.  

### What is cached?

Only structural/metadata information is cached for data operations.

That includes:
1. Collection names (`pvault collection list`)
2. The list and definition for all properties within a collection (`pvault collection get`)
3. Encryption keys for encrypted properties
4. The IAM configuration (`pvault iam get`)
5. The system configuration (`pvault admin get-configuration`)

:::info

Your **data** is **never** cached (in contrast to the metadata).

**Control operations** are **never** cached.
:::

### What's the impact for you?

There is no impact on environments with a single container such as a local development environment.
For production environments with multiple containers, metadata changes follow the semantic of eventual consistency.

The following needs to be taken into account when performing "breaking" changes to the schema. 
You should allow up to 30 seconds from the time of the modification
to allow propagation of these changes to all Vault containers. 
Only then, you can perform data operations that depend on the new changes being in effect.

Alternatively, you can [force a cache reload](#forcing-a-cache-reload) for the next
data operation requiring it without waiting for the 30 seconds. 

### Examples

#### Wait for refresh
1. Add a new property
2. Wait for 30 seconds
3. Write data to the new property

#### Force reload cache
1. Add a new property
2. Write data to the new property passing the "reload cache" flag

### Cache refresh rate

The cache is refreshed every 30 seconds by default. This value is suitable for typical use cases.
Modify this setting with the environment variable PVAULT_SERVICE_CACHE_REFRESH_INTERVAL_SECONDS.
When this environment variable is set to zero, the cache will be disabled. 
It is strongly recommended NOT to disable caching in production systems.

### Forcing a cache reload

To reload the cache before accessing an object use:
1. CLI - use `--reload-cache`
2. REST API - use `reload_cache=true` on the call.
