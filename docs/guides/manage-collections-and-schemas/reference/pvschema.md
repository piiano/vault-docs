---
sidebar_position: 2
---

# PVSchema

## Discover the schema format available for specifying collections

The [REST API control operations](/api/operations/add-collection) or [CLI Schema commands](/cli/reference#schema-commands) define a schema using a SQL-like syntax called PVSchema. You can also use a JSON format to specify the schema in the REST API.

### PVSchema format

The PVSchema format represents a schema like this:

```text
[collection] [schema prototype] (
    #Name PIIType IsUnique IsIndex IsEncrypted IsNullable IsBuiltIn IsReadonly COMMENT "[description]",
    #Name PIIType IsUnique IsIndex IsEncrypted IsNullable IsBuiltIn IsReadonly COMMENT "[description]",
    ...
);
```

Where `collection` is the collection name and `schema prototype` is the name of a [prototype schema](schema-prototypes)
, such as `PERSONS`. Each schema property is defined using these attributes:

| Keyword                   | Values                         | Default (if not present) | Description                                                                                                               |
|---------------------------|--------------------------------|--------------------------|:--------------------------------------------------------------------------------------------------------------------------|
| `#Name`                   | `[property name]`              | Mandatory                | The name of the property. Must be unique.                                                                                 |
| `PIIType`                 | PII type name                  | Mandatory                | The name of the property type.                                                                                            |
| `IsArray`                 | `ARRAY` or `NOT ARRAY`         | `NOT ARRAY`              | Whether the property is an array or a value.                                                                              |
| `IsUnique`                | `UNIQUE` or `NOT UNIQUE`       | `NOT UNIQUE`             | Whether the backend storage enforces unique values.                                                                       |
| `IsIndex`                 | `INDEX` or `NOT INDEX`         | `NOT INDEX`              | Whether the backend storage is optimized for searches on this value. (This attribute is ignored, support coming soon 🎁 ) |
| `IsEncrypted`             | `ENCRYPTED` or `NOT ENCRYPTED` | `NOT ENCRYPTED`          | Whether the value is stored encrypted and decrypted when retrieved by a caller.                                           |
| `IsNullable`              | `NULL` or `NOT NULL`           | `NOT NULL`               | Whether the value of the field can be removed (set to null).                                                              |
| `IsBuiltIn`               | `BUILTIN` or `NOT BUILTIN`     | `NOT BUILTIN`            | Whether the property is added by Vault when the collection is created.                                                  |
| `IsReadOnly`              | `READONLY` or `NOT READONLY`   | `NOT READONLY`           | For `BUILTIN` properties, whether the value of the property can be modified.                                              |
| `COMMENT "[description]"` | `[description]`                | `""`                     | The description of the property, If not provided, is set to an empty string.                                              | 

:::note

1. The order of property definitions in the PVSchema has no significance.
2. When creating a collection, the built-in property definitions do not need to be added to the PVSchema. If built-in
   property definitions are included in the PVSchema when creating a collection, their definitions must be the same as
   the definitions provided by Vault.
:::

### Example

This PVSchema defines the a `PERSONS` schema in a collection called `customers`:

```
customers PERSONS (
        first_name NAME COMMENT 'First Name',
        last_name NAME COMMENT 'Last Name',
        gender GENDER NULL COMMENT 'Gender',
        date_of_birth DATE_OF_BIRTH NULL COMMENT 'Date of Birth',
        ssn SSN NULL UNIQUE INDEX ENCRYPTED COMMENT 'Social Security Number',
        email EMAIL NULL UNIQUE INDEX COMMENT 'Email',
        other_emails EMAIL[] NULL INDEX COMMENT 'Other Email Addresses',
        phone_number PHONE_NUMBER NULL UNIQUE INDEX COMMENT 'Phone Number',
        other_phone_numbers PHONE_NUMBER[] NULL COMMENT 'Other Phone number',
        zip_code_us ZIP_CODE_US NULL COMMENT 'US Zip Code'
)
```


If [add collection](/api/operations/add-collection) is called with this PVSchema, the PVSchema returned includes the
built-in properties added by Vault, like this:

```
customers PERSONS (
    _id OBJECT_ID UNIQUE INDEX BUILTIN READONLY,
    _owner_id OBJECT_ID NULL BUILTIN,
    _foreign_id FOREIGN_ID NULL BUILTIN,
    _tenant_id TENANT_ID NULL BUILTIN,
    _creation_time TIMESTAMP BUILTIN READONLY,
    _modification_time TIMESTAMP BUILTIN READONLY,
    _expiration_time TIMESTAMP BUILTIN READONLY,
    first_name NAME COMMENT 'First Name',
    last_name NAME COMMENT 'Last Name',
    gender GENDER NULL COMMENT 'Gender',
    date_of_birth DATE_OF_BIRTH NULL COMMENT 'Date of Birth',
    ssn SSN NULL UNIQUE INDEX ENCRYPTED COMMENT 'Social Security Number',
    email EMAIL NULL UNIQUE INDEX COMMENT 'Email',
    other_emails EMAIL[] NULL INDEX COMMENT 'Other Email Addresses',
    phone_number PHONE_NUMBER NULL UNIQUE INDEX COMMENT 'Phone Number',
    other_phone_numbers PHONE_NUMBER[] NULL COMMENT 'Other Phone number',
    zip_code_us ZIP_CODE_US NULL COMMENT 'US Zip Code'
);
```

