---
sidebar_position: 2
---

# Schema prototypes

## Discover the prototypes collection schemas are created from

Each schema is based on a schema prototype that provides default properties appropriate to the type of data held in the
schema.

:::info
Vault includes `PERSONS` and `DATA` schema prototypes. The [Vault roadmap](/roadmap) includes support for more schema
prototypes.
:::

### PERSONS schema prototype

A `PERSONS` schema defines objects that contain people's information, such as name, home address, SSN, email address,
phone number, etc.

The `PERSONS` schema prototype includes these built-in properties:

- `_id`
- `_owner_id`
- `_owner_collection`
- `_foreign_id`
- `_tenant_id`
- `_creation_time`
- `_modification_time`
- `_expiration_time`

### DATA schema prototype

A `DATA` schema prototype defines objects that contains information that is associated with a person, such as credit
card details, financial transactions, etc.

The `DATA` schema prototype includes these built-in properties:

- `_id`
- `_owner_id`
- `_owner_collection`
- `_foreign_id`
- `_tenant_id`
- `_creation_time`
- `_modification_time`
- `_expiration_time`

For associated data, if an owner exist, `_owner_id` and `_owner_collection` must reference a person record in a
collection based on the `PERSONS` schema prototype. If `_owner_id` is defined, then `_tenant_id` is set to the
owner's `_tenant_id`.
