---
sidebar_position: 2.1
---

# Retrieve a collection

## Learn how to retrieve a collection.

During development, you may need to change Vault collections to store new properties, remove properties that are no longer needed, or update properties’ attributes. You may need to know what properties are in the collection to construct queries or add objects.

You get the details of a collection using the REST API or CLI. The collection schema includes information such as the collection name, type, a list of properties, and metadata such as creation and modification time. The metadata includes built-in properties that are added as part of the [schema prototype](reference/schema-prototypes).

### Get a collection schema

#### Overview

The steps you take to get the collection are:

1. Determine the collection you want to retrieve.
2. Use the [CLI get a collection](/cli/reference#get-a-collection) command or the [REST API get collection](/api/operations/get-collection) operation, passing the collection name and type of output required.

#### Step-by-step

You want to get the details of the ‘buyers’ collection you created in [Create a collection](create-a-collection).

You have three choices of how the collection details are presented:

- PVschema
- JSON
- table

##### Get the collection with PVschema output

With the CLI, run this command:

```bash
pvault collection get --collection buyers --pvschema
```

You get a response similar to this:

```sql
buyers PERSONS (
    date_of_birth DATE_OF_BIRTH NULL COMMENT 'Date of Birth',
    email EMAIL NULL UNIQUE INDEX COMMENT 'Email',
    first_name STRING COMMENT 'First Name',
    gender STRING NULL COMMENT 'Gender',
    last_name STRING COMMENT 'Last Name',
    other_emails EMAIL[] NULL INDEX COMMENT 'Other Email Addresses',
    other_phone_numbers PHONE_NUMBER[] NULL COMMENT 'Other Phone number',
    phone_number PHONE_NUMBER NULL UNIQUE INDEX COMMENT 'Phone Number',
    ssn SSN NULL UNIQUE INDEX ENCRYPTED COMMENT 'Social Security Number',
    zip_code_us ZIP_CODE_US NULL COMMENT 'US Zip Code',
    _creation_time TIMESTAMP BUILTIN READONLY COMMENT 'The time when the object was created',
    _expiration_time TIMESTAMP BUILTIN READONLY COMMENT 'The time when the object will be soft-deleted',
    _foreign_id FOREIGN_ID NULL BUILTIN COMMENT 'The ID that identifies the person in your application',
    _id OBJECT_ID UNIQUE INDEX BUILTIN READONLY COMMENT 'The unique identifier of an object in the collection.',
    _modification_time TIMESTAMP BUILTIN READONLY COMMENT 'The time when the object was most recently modified',
    _owner_collection STRING NULL BUILTIN COMMENT 'The name of the collection in which the owner of the object defined. For associated data, this value identifies the PERSONS collection containing the owner.',
    _owner_id OBJECT_ID NULL BUILTIN COMMENT 'The ID of the owner of the object. For associated data, this value identifies the owning object in a PERSONS collection.',
    _tenant_id TENANT_ID NULL BUILTIN COMMENT 'The ID of the tenant with access privileges for this object'
);
```

##### Get the collection with JSON format output
    
To get the collection details in JSON format, with the CLI, run this command:

```bash
pvault collection get --collection buyers --json
```

You get a response similar to this:
    
```json
{
  "type": "PERSONS",
  "name": "buyers",
  "properties": [
    {
      "description": "Date of Birth",
      "name": "date_of_birth",
      "pii_type_name": "DATE_OF_BIRTH",
      "is_unique": false,
      "is_index": false,
      "is_encrypted": false,
      "is_nullable": true,
      "is_builtin": false,
      "is_readonly": false,
      "creation_time": "2022-07-24T14:57:31.826816Z",
      "modification_time": "2022-07-24T14:57:31.826816Z"
    },
    {
      "description": "Email",
      "name": "email",
      "pii_type_name": "EMAIL",
      "is_unique": true,
      "is_index": true,
      "is_encrypted": false,
      "is_nullable": true,
      "is_builtin": false,
      "is_readonly": false,
      "creation_time": "2022-07-24T14:57:31.826816Z",
      "modification_time": "2022-07-24T14:57:31.826816Z"
    },
    {
      "description": "First Name",
      "name": "first_name",
      "pii_type_name": "STRING",
      "is_unique": false,
      "is_index": false,
      "is_encrypted": false,
      "is_nullable": false,
      "is_builtin": false,
      "is_readonly": false,
      "creation_time": "2022-07-24T14:57:31.826816Z",
      "modification_time": "2022-07-24T14:57:31.826816Z"
    },
    {
      "description": "Gender",
      "name": "gender",
      "pii_type_name": "STRING",
      "is_unique": false,
      "is_index": false,
      "is_encrypted": false,
      "is_nullable": true,
      "is_builtin": false,
      "is_readonly": false,
      "creation_time": "2022-07-24T14:57:31.826816Z",
      "modification_time": "2022-07-24T14:57:31.826816Z"
    },
    {
      "description": "Last Name",
      "name": "last_name",
      "pii_type_name": "STRING",
      "is_unique": false,
      "is_index": false,
      "is_encrypted": false,
      "is_nullable": false,
      "is_builtin": false,
      "is_readonly": false,
      "creation_time": "2022-07-24T14:57:31.826816Z",
      "modification_time": "2022-07-24T14:57:31.826816Z"
    },
    {
      "description": "Other Email Addresses",
      "name": "other_emails",
      "pii_type_name": "EMAIL",
      "is_unique": false,
      "is_index": true,
      "is_encrypted": false,
      "is_nullable": true,
      "is_builtin": false,
      "is_readonly": false,
      "creation_time": "2022-07-24T14:57:31.826816Z",
      "modification_time": "2022-07-24T14:57:31.826816Z"
    },
    {
      "description": "Other Phone number",
      "name": "other_phone_numbers",
      "pii_type_name": "PHONE_NUMBER",
      "is_unique": false,
      "is_index": false,
      "is_encrypted": false,
      "is_nullable": true,
      "is_builtin": false,
      "is_readonly": false,
      "creation_time": "2022-07-24T14:57:31.826816Z",
      "modification_time": "2022-07-24T14:57:31.826816Z"
    },
    {
      "description": "Phone Number",
      "name": "phone_number",
      "pii_type_name": "PHONE_NUMBER",
      "is_unique": true,
      "is_index": true,
      "is_encrypted": false,
      "is_nullable": true,
      "is_builtin": false,
      "is_readonly": false,
      "creation_time": "2022-07-24T14:57:31.826816Z",
      "modification_time": "2022-07-24T14:57:31.826816Z"
    },
    {
      "description": "Social Security Number",
      "name": "ssn",
      "pii_type_name": "SSN",
      "is_unique": true,
      "is_index": true,
      "is_encrypted": true,
      "is_nullable": true,
      "is_builtin": false,
      "is_readonly": false,
      "creation_time": "2022-07-24T14:57:31.826816Z",
      "modification_time": "2022-07-24T14:57:31.826816Z"
    },
    {
      "description": "US Zip Code",
      "name": "zip_code_us",
      "pii_type_name": "ZIP_CODE_US",
      "is_unique": false,
      "is_index": false,
      "is_encrypted": false,
      "is_nullable": true,
      "is_builtin": false,
      "is_readonly": false,
      "creation_time": "2022-07-24T14:57:31.826816Z",
      "modification_time": "2022-07-24T14:57:31.826816Z"
    },
    {
      "description": "The time when the object was created",
      "name": "_creation_time",
      "pii_type_name": "TIMESTAMP",
      "is_unique": false,
      "is_index": false,
      "is_encrypted": false,
      "is_nullable": false,
      "is_builtin": true,
      "is_readonly": true,
      "creation_time": "2022-07-24T14:57:31.826816Z",
      "modification_time": "2022-07-24T14:57:31.826816Z"
    },
    {
      "description": "The time when the object will be soft-deleted",
      "name": "_expiration_time",
      "pii_type_name": "TIMESTAMP",
      "is_unique": false,
      "is_index": false,
      "is_encrypted": false,
      "is_nullable": false,
      "is_builtin": true,
      "is_readonly": true,
      "creation_time": "2022-07-24T14:57:31.826816Z",
      "modification_time": "2022-07-24T14:57:31.826816Z"
    },
    {
      "description": "The ID that identifies the person in your application",
      "name": "_foreign_id",
      "pii_type_name": "FOREIGN_ID",
      "is_unique": false,
      "is_index": false,
      "is_encrypted": false,
      "is_nullable": true,
      "is_builtin": true,
      "is_readonly": false,
      "creation_time": "2022-07-24T14:57:31.826816Z",
      "modification_time": "2022-07-24T14:57:31.826816Z"
    },
    {
      "description": "The unique identifier of an object in the collection.",
      "name": "_id",
      "pii_type_name": "OBJECT_ID",
      "is_unique": true,
      "is_index": true,
      "is_encrypted": false,
      "is_nullable": false,
      "is_builtin": true,
      "is_readonly": true,
      "creation_time": "2022-07-24T14:57:31.826816Z",
      "modification_time": "2022-07-24T14:57:31.826816Z"
    },
    {
      "description": "The time when the object was most recently modified",
      "name": "_modification_time",
      "pii_type_name": "TIMESTAMP",
      "is_unique": false,
      "is_index": false,
      "is_encrypted": false,
      "is_nullable": false,
      "is_builtin": true,
      "is_readonly": true,
      "creation_time": "2022-07-24T14:57:31.826816Z",
      "modification_time": "2022-07-24T14:57:31.826816Z"
    },
    {
      "description": "The name of the collection in which the owner of the object defined. For associated data, this value identifies the PERSONS collection containing the owner.",
      "name": "_owner_collection",
      "pii_type_name": "STRING",
      "is_unique": false,
      "is_index": false,
      "is_encrypted": false,
      "is_nullable": true,
      "is_builtin": true,
      "is_readonly": false,
      "creation_time": "2022-07-24T14:57:31.826816Z",
      "modification_time": "2022-07-24T14:57:31.826816Z"
    },
    {
      "description": "The ID of the owner of the object. For associated data, this value identifies the owning object in a PERSONS collection.",
      "name": "_owner_id",
      "pii_type_name": "OBJECT_ID",
      "is_unique": false,
      "is_index": false,
      "is_encrypted": false,
      "is_nullable": true,
      "is_builtin": true,
      "is_readonly": false,
      "creation_time": "2022-07-24T14:57:31.826816Z",
      "modification_time": "2022-07-24T14:57:31.826816Z"
    },
    {
      "description": "The ID of the tenant with access privileges for this object",
      "name": "_tenant_id",
      "pii_type_name": "TENANT_ID",
      "is_unique": false,
      "is_index": false,
      "is_encrypted": false,
      "is_nullable": true,
      "is_builtin": true,
      "is_readonly": false,
      "creation_time": "2022-07-24T14:57:31.826816Z",
      "modification_time": "2022-07-24T14:57:31.826816Z"
    }
  ],
  "creation_time": "2022-07-24T14:57:31.826816Z",
  "modification_time": "2022-07-24T14:57:31.826816Z"
}
```

##### Get the collection with table format output

To get the collection details as a table, with the CLI, run this command:

 ```bash
pvault collection get --collection buyers
```

You get a response similar to this:

```table
+------------+---------+--------------------------------+---------------------+---------------+-----------+----------+--------------+-------------+------------+-------------+-------------------------------+-------------------------------+
| collection |  type   |          description           |        name         | pii_type_name | is_unique | is_index | is_encrypted | is_nullable | is_builtin | is_readonly |         creation_time         |       modification_time       |
+------------+---------+--------------------------------+---------------------+---------------+-------- d---+----------+--------------+-------------+------------+-------------+-------------------------------+-------------------------------+
| buyers     | PERSONS | Date of Birth                  | date_of_birth       | DATE_OF_BIRTH | false     | false    | false        | true        | false      | false       | Sun, 24 Jul 2022 14:57:31 UTC | Sun, 24 Jul 2022 14:57:31 UTC |
| buyers     | PERSONS | Email                          | email               | EMAIL         | true      | true     | false        | true        | false      | false       | Sun, 24 Jul 2022 14:57:31 UTC | Sun, 24 Jul 2022 14:57:31 UTC |
| buyers     | PERSONS | First Name                     | first_name          | STRING        | false     | false    | false        | false       | false      | false       | Sun, 24 Jul 2022 14:57:31 UTC | Sun, 24 Jul 2022 14:57:31 UTC |
| buyers     | PERSONS | Gender                         | gender              | STRING        | false     | false    | false        | true        | false      | false       | Sun, 24 Jul 2022 14:57:31 UTC | Sun, 24 Jul 2022 14:57:31 UTC |
| buyers     | PERSONS | Last Name                      | last_name           | STRING        | false     | false    | false        | false       | false      | false       | Sun, 24 Jul 2022 14:57:31 UTC | Sun, 24 Jul 2022 14:57:31 UTC |
| buyers     | PERSONS | Other Email Addresses          | other_emails        | EMAIL         | false     | true     | false        | true        | false      | false       | Sun, 24 Jul 2022 14:57:31 UTC | Sun, 24 Jul 2022 14:57:31 UTC |
| buyers     | PERSONS | Other Phone number             | other_phone_numbers | PHONE_NUMBER  | false     | false    | false        | true        | false      | false       | Sun, 24 Jul 2022 14:57:31 UTC | Sun, 24 Jul 2022 14:57:31 UTC |
| buyers     | PERSONS | Phone Number                   | phone_number        | PHONE_NUMBER  | true      | true     | false        | true        | false      | false       | Sun, 24 Jul 2022 14:57:31 UTC | Sun, 24 Jul 2022 14:57:31 UTC |
| buyers     | PERSONS | Social Security Number         | ssn                 | SSN           | true      | true     | true         | true        | false      | false       | Sun, 24 Jul 2022 14:57:31 UTC | Sun, 24 Jul 2022 14:57:31 UTC |
| buyers     | PERSONS | US Zip Code                    | zip_code_us         | ZIP_CODE_US   | false     | false    | false        | true        | false      | false       | Sun, 24 Jul 2022 14:57:31 UTC | Sun, 24 Jul 2022 14:57:31 UTC |
| buyers     | PERSONS | The time when the object was   | _creation_time      | TIMESTAMP     | false     | false    | false        | false       | true       | true        | Sun, 24 Jul 2022 14:57:31 UTC | Sun, 24 Jul 2022 14:57:31 UTC |
|            |         | created                        |                     |               |           |          |              |             |            |             |                               |                               |
| buyers     | PERSONS | The time when the object will  | _expiration_time    | TIMESTAMP     | false     | false    | false        | false       | true       | true        | Sun, 24 Jul 2022 14:57:31 UTC | Sun, 24 Jul 2022 14:57:31 UTC |
|            |         | be soft-deleted                |                     |               |           |          |              |             |            |             |                               |                               |
| buyers     | PERSONS | The ID that identifies the     | _foreign_id         | FOREIGN_ID    | false     | false    | false        | true        | true       | false       | Sun, 24 Jul 2022 14:57:31 UTC | Sun, 24 Jul 2022 14:57:31 UTC |
|            |         | person in your application     |                     |               |           |          |              |             |            |             |                               |                               |
| buyers     | PERSONS | The unique identifier of an    | _id                 | OBJECT_ID     | true      | true     | false        | false       | true       | true        | Sun, 24 Jul 2022 14:57:31 UTC | Sun, 24 Jul 2022 14:57:31 UTC |
|            |         | object in the collection.      |                     |               |           |          |              |             |            |             |                               |                               |
| buyers     | PERSONS | The time when the object was   | _modification_time  | TIMESTAMP     | false     | false    | false        | false       | true       | true        | Sun, 24 Jul 2022 14:57:31 UTC | Sun, 24 Jul 2022 14:57:31 UTC |
|            |         | most recently modified         |                     |               |           |          |              |             |            |             |                               |                               |
| buyers     | PERSONS | The name of the collection in  | _owner_collection   | STRING        | false     | false    | false        | true        | true       | false       | Sun, 24 Jul 2022 14:57:31 UTC | Sun, 24 Jul 2022 14:57:31 UTC |
|            |         | which the owner of the object  |                     |               |           |          |              |             |            |             |                               |                               |
|            |         | defined. For associated data,  |                     |               |           |          |              |             |            |             |                               |                               |
|            |         | this value identifies the      |                     |               |           |          |              |             |            |             |                               |                               |
|            |         | PERSONS collection containing  |                     |               |           |          |              |             |            |             |                               |                               |
|            |         | the owner.                     |                     |               |           |          |              |             |            |             |                               |                               |
| buyers     | PERSONS | The ID of the owner of the     | _owner_id           | OBJECT_ID     | false     | false    | false        | true        | true       | false       | Sun, 24 Jul 2022 14:57:31 UTC | Sun, 24 Jul 2022 14:57:31 UTC |
|            |         | object. For associated data,   |                     |               |           |          |              |             |            |             |                               |                               |
|            |         | this value identifies the      |                     |               |           |          |              |             |            |             |                               |                               |
|            |         | owning object in a PERSONS     |                     |               |           |          |              |             |            |             |                               |                               |
|            |         | collection.                    |                     |               |           |          |              |             |            |             |                               |                               |
| buyers     | PERSONS | The ID of the tenant with      | _tenant_id          | TENANT_ID     | false     | false    | false        | true        | true       | false       | Sun, 24 Jul 2022 14:57:31 UTC | Sun, 24 Jul 2022 14:57:31 UTC |
|            |         | access privileges for this     |                     |               |           |          |              |             |            |             |                               |                               |
|            |         | object                         |                     |               |           |          |              |             |            |             |                               |                               |
+------------+---------+--------------------------------+---------------------+---------------+-----------+----------+--------------+-------------+------------+-------------+-------------------------------+-------------------------------+
```
