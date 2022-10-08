---
sidebar_position: 1
---

# Schema properties

## Discover the attributes that defines schema properties and details of the built-in properties

### Property attributes

Properties define the values stored in a collection's objects. These attributes describe a property:

- Name, which must be unique within the schema.
- [Data type](data-types) of the value.
- Description
- Options that specify whether the value is:
  - Unique within the collection
  - Indexed (coming soon 🎁 )
  - Encrypted
  - Nullable
  - An array
  - Built-in (see [Built-in properties](#built-in-properties))
  - Read-only (see [Built-in properties](#built-in-properties))

:::info
The storage backend database supports standard structured data. Support for file storage and blobs is on the [Vault roadmap](/roadmap).
:::

:::info
Vault does not support the selective modification of values in array data types in objects. To modify an array in an object, you must read the entire array, change it locally, and then provide the whole array back.
:::

### Built-in properties

When Vault creates a collection, it adds built-in properties based on the [schema prototype](schema-prototypes). These built-in properties are readable and are subject to the identity and access management [policies](/guides/manage-users-and-policies/how-iam-works#policy-management) in the same way that user-defined properties are. After creating a collection and adding data, read requests can include built-in properties to get the values of these properties.

These are the built-in properties:

| Name               | PIIType      | IsArray     | IsUnique     | IsIndex     | IsEncrypted     | IsNullable | IsBuiltIn | IsReadOnly     | Description                                                                                                                                                  |
| ------------------ | ------------ | ----------- | ------------ | ----------- | --------------- | ---------- | --------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _id                | `OBJECT_ID`  | `NOT ARRAY` | `UNIQUE`     | `INDEX`     | `NOT ENCRYPTED` | `NOT NULL` | `BUILTIN` | `READONLY`     | The unique identifier of an object in the collection.                                                                                                        |
| _owner_id          | `OBJECT_ID`  | `NOT ARRAY` | `NOT UNIQUE` | `NOT INDEX` | `NOT ENCRYPTED` | `NULL`     | `BUILTIN` | `NOT READONLY` | The ID of the owner of the object. For associated data, this value identifies the owning object in a PERSONS collection.                                     |
| _owner_collection  | `OBJECT_ID`  | `NOT ARRAY` | `NOT UNIQUE` | `NOT INDEX` | `NOT ENCRYPTED` | `NULL`     | `BUILTIN` | `NOT READONLY` | The name of the collection in which the owner of the object defined. For associated data, this value identifies the PERSONS collection containing the owner. |
| _foreign_id        | `FOREIGN_ID` | `NOT ARRAY` | `NOT UNIQUE` | `NOT INDEX` | `NOT ENCRYPTED` | `NULL`     | `BUILTIN` | `NOT READONLY` | The ID that identifies the person in your application.                                                                                                       |
| _tenant_id         | `TENANT_ID`  | `NOT ARRAY` | `NOT UNIQUE` | `NOT INDEX` | `NOT ENCRYPTED` | `NULL`     | `BUILTIN` | `NOT READONLY` | The ID of the tenant with access privileges for this object.                                                                                                 |
| _creation_time     | `TIMESTAMP`  | `NOT ARRAY` | `NOT UNIQUE` | `NOT INDEX` | `NOT ENCRYPTED` | `NOT NULL` | `BUILTIN` | `READONLY`     | The time when the object was created.                                                                                                                        |
| _modification_time | `TIMESTAMP`  | `NOT ARRAY` | `NOT UNIQUE` | `NOT INDEX` | `NOT ENCRYPTED` | `NOT NULL` | `BUILTIN` | `READONLY`     | The time when the object was most recently modified.                                                                                                         |
| _expiration_time   | `TIMESTAMP`  | `NOT ARRAY` | `NOT UNIQUE` | `NOT INDEX` | `NOT ENCRYPTED` | `NOT NULL` | `BUILTIN` | `READONLY`     | The time when the object will be soft-deleted.                                                                                                               |

:::note
The names of the built-in properties are prefixed with '_'. Properties defined by the user cannot have this prefix.
:::

The definitions of the built-in properties cannot be changed. Attempts to do so when updating a collection returns an error.

The built-in properties are returned by all the REST API operations and CLI calls that return the properties of a collection, such as add collection, get all properties, etc. Both the [PVSchema](pvschema) and JSON formats return built-in properties.
