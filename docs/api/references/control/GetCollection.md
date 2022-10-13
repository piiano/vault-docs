Gets a single collection by its name.
- If successful, the collection is returned in either JSON or PVSchema formats (using the Accept header or format query parameter, default is JSON). 

The information returned contains the properties defined by the user and the built-in properties added by Vault when the collection was created.

The role that performs this operation must have the `CapCollectionsReader` capability.
See [Access control](/data-security/identity-and-access-management#access-control) for more information about how
capabilities are used to control access to operations.

The PVSchema format represent the collection's properties as follows:

```sql
[collection] PERSONS (
    #Name PIIType IsUnique IsIndex IsEncrypted IsNullable IsBuiltIn IsReadonly COMMENT "[description]",
    #Name PIIType IsUnique IsIndex IsEncrypted IsNullable IsBuiltIn IsReadonly COMMENT "[description]",
    ...
);
```

Where these attributes map to the JSON properties like this:

| PVSchema format keyword   | PVSchema values            | JSON property                            |
|---------------------------|----------------------------|------------------------------------------|
| `#Name`                   | `[property name]`          | `"name": "[property name]"`              |
| `PIIType`                 | PII type name              | `"pii_type_name": [pii_type name]`       |
| `IsUnique`                | `UNIQUE`/`NOT`             | `is_unique": true`/`is_unique": false`   |
| `IsIndex`                 | `INDEX`                    | `"is_index": true`                       |
| `IsEncrypted`             | `ENCRYPTED`                | `"is_encrypted": true`                   |
| `IsNullable`              | `NULL`                     | `"is_nullable": true`                    |
| `IsBuiltIn`               | `BUILTIN`                  | `"is_builtin": true`                     |
| `IsReadOnly`              | `READONLY`                 | `"is_readonly": true`                    |
| `COMMENT "[description]"` | `[description]`            | `"description": "[description]"`         | 

For example (for brevity, this example does not include the built-in properties):

```sql
customers PERSONS (
    first_name STRING NOT NULL COMMENT "First Name",
    email email UNIQUE NOT NULL,
);
```

is the equivalent of

```json
{
  "name": "customers",
  "type": "PERSONS",
  "properties": [
    {
      "description": "First Name",
      "is_encrypted": false,
      "is_index": false,
      "is_nullable": true,
      "is_unique": false,
      "name": "first_name",
      "pii_type_name": "STRING"
    },

    {
      "description": "The object's email address.",
      "is_encrypted": false,
      "is_index": false,
      "is_nullable": true,
      "is_unique": true,
      "name": "email",
      "pii_type_name": "EMAIL"
    }
  ]
}
```

