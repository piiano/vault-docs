---
sidebar_position: 2
---

# Create a collection

## Learn how to create a collection.

Personal and sensitive data is stored in the Vault using collections. There are two types of collections you can create:

1. `PERSONS` – collections of data that describe people. For example, customers, employees, users, teachers, students, patients, etc.
2. `DATA` – collections that describe sensitive private resources owned by a person in a one-to-one or one-to-many relationship. For example, workplace data and information about education, bank information, credit cards, health-related information, etc.

### Create a PERSONS collection

#### Overview

To create a collection you:

1. Define the collection schema as a PVSchema or JSON file.
2. Use the [CLI add collection](/cli/reference#add-collection) command or [REST API add collection](/api/operations/add-collection) operation, passing the PVSchema or JSON file.


#### Step-by-step

##### Step 1 – Design the collection schema

Before creating a collection, you should decide what properties to store in it. 

Say you want to build a system to store the private information for an e-commerce app. You have seller and buyer data you want to store. Also, you have buyers’ payment information, which a buyer owns. To support the system, you create `sellers` and `buyers` `PERSONS` collections.

For the `buyers` collection, you identify the private information to store for each buyer. For example, each buyer has a name, email, address, and optional phone number. You also want to verify that emails are unique for each buyer.

After identifying the information, you define it in a PVSchema, like this:

```sql
buyers PERSONS (
  name NAME,
  email EMAIL UNIQUE,
  address ADDRESS,
  phone_number PHONE_NUMBER NULL
)

```

or JSON format, like this:

```json
{
  "name": "buyers",
  "type": "PERSONS",
  "properties": [
    {
      "name": "name",
      "pii_type_name": "NAME"
    }, {
      "name": "email",
      "pii_type_name": "EMAIL",
      "is_unique": true,
    }, {
      "name": "address",
      "pii_type_name": "ADDRESS"
    }, {
      "name": "phone_number",
      "pii_type_name": "PHONE_NUMBER",
      "is_nullable": true,
    }
  ]
}
```

:::note
When possible, use the [semantic data types](./reference/data-types) provided by Vault.
In this example, you could define each property of the buyer as a `STRING`. Defining the properties with the semantic data types `NAME`, `EMAIL`, and `PHONE_NUMBER` means you can apply transformations and use other Vault features that handle scenarios for various data types.
:::

##### Step 2 - Create the collection

Once you have defined the collection schema, you create the collection using the REST API or  CLI.

To create the `buyers` collection with the CLI you use this command:

```bash
pvault collection add --collection-pvschema "
buyers PERSONS (
  name NAME,
  email EMAIL UNIQUE,
  address ADDRESS,
  phone_number PHONE_NUMBER NULL
)"
```

You get a response similar to this:

```table
+------------+---------+--------------------------------+--------------------+---------------+----------+-----------+----------+--------------+-------------+------------+-------------+-------------------------------+-------------------------------+
| collection |  type   |          description           |        name        | pii_type_name | is_array | is_unique | is_index | is_encrypted | is_nullable | is_builtin | is_readonly |         creation_time         |       modification_time       |
+------------+---------+--------------------------------+--------------------+---------------+----------+-----------+----------+--------------+-------------+------------+-------------+-------------------------------+-------------------------------+
| buyers     | PERSONS | The unique identifier of an    | _id                | OBJECT_ID     | false    | true      | true     | false        | false       | true       | true        | Tue, 19 Jul 2022 14:48:11 UTC | Tue, 19 Jul 2022 14:48:11 UTC |
|            |         | object in the collection.      |                    |               |          |           |          |              |             |            |             |                               |                               |
| buyers     | PERSONS | The name of the collection in  | _owner_collection  | STRING        | false    | false     | false    | false        | true        | true       | false       | Tue, 19 Jul 2022 14:48:11 UTC | Tue, 19 Jul 2022 14:48:11 UTC |
|            |         | which the owner of the object  |                    |               |          |           |          |              |             |            |             |                               |                               |
|            |         | defined. For associated data,  |                    |               |          |           |          |              |             |            |             |                               |                               |
|            |         | this value identifies the      |                    |               |          |           |          |              |             |            |             |                               |                               |
|            |         | PERSONS collection containing  |                    |               |          |           |          |              |             |            |             |                               |                               |
|            |         | the owner.                     |                    |               |          |           |          |              |             |            |             |                               |                               |
| buyers     | PERSONS | The ID of the owner of the     | _owner_id          | OBJECT_ID     | false    | false     | false    | false        | true        | true       | false       | Tue, 19 Jul 2022 14:48:11 UTC | Tue, 19 Jul 2022 14:48:11 UTC |
|            |         | object. For associated data,   |                    |               |          |           |          |              |             |            |             |                               |                               |
|            |         | this value identifies the      |                    |               |          |           |          |              |             |            |             |                               |                               |
|            |         | owning object in a PERSONS     |                    |               |          |           |          |              |             |            |             |                               |                               |
|            |         | collection.                    |                    |               |          |           |          |              |             |            |             |                               |                               |
| buyers     | PERSONS | The ID that identifies the     | _foreign_id        | FOREIGN_ID    | false    | false     | false    | false        | true        | true       | false       | Tue, 19 Jul 2022 14:48:11 UTC | Tue, 19 Jul 2022 14:48:11 UTC |
|            |         | person in your application     |                    |               |          |           |          |              |             |            |             |                               |                               |
| buyers     | PERSONS | The ID of the tenant with      | _tenant_id         | TENANT_ID     | false    | false     | false    | false        | true        | true       | false       | Tue, 19 Jul 2022 14:48:11 UTC | Tue, 19 Jul 2022 14:48:11 UTC |
|            |         | access privileges for this     |                    |               |          |           |          |              |             |            |             |                               |                               |
|            |         | object                         |                    |               |          |           |          |              |             |            |             |                               |                               |
| buyers     | PERSONS | The time when the object was   | _creation_time     | TIMESTAMP     | false    | false     | false    | false        | false       | true       | true        | Tue, 19 Jul 2022 14:48:11 UTC | Tue, 19 Jul 2022 14:48:11 UTC |
|            |         | created                        |                    |               |          |           |          |              |             |            |             |                               |                               |
| buyers     | PERSONS | The time when the object was   | _modification_time | TIMESTAMP     | false    | false     | false    | false        | false       | true       | true        | Tue, 19 Jul 2022 14:48:11 UTC | Tue, 19 Jul 2022 14:48:11 UTC |
|            |         | most recently modified         |                    |               |          |           |          |              |             |            |             |                               |                               |
| buyers     | PERSONS | The time when the object will  | _expiration_time   | TIMESTAMP     | false    | false     | false    | false        | false       | true       | true        | Tue, 19 Jul 2022 14:48:11 UTC | Tue, 19 Jul 2022 14:48:11 UTC |
|            |         | be soft-deleted                |                    |               |          |           |          |              |             |            |             |                               |                               |
| buyers     | PERSONS |                                | name               | NAME          | false    | false     | false    | false        | false       | false      | false       | Tue, 19 Jul 2022 14:48:11 UTC | Tue, 19 Jul 2022 14:48:11 UTC |
| buyers     | PERSONS |                                | email              | EMAIL         | false    | true      | false    | false        | false       | false      | false       | Tue, 19 Jul 2022 14:48:11 UTC | Tue, 19 Jul 2022 14:48:11 UTC |
| buyers     | PERSONS |                                | address            | ADDRESS       | false    | false     | false    | false        | false       | false      | false       | Tue, 19 Jul 2022 14:48:11 UTC | Tue, 19 Jul 2022 14:48:11 UTC |
| buyers     | PERSONS |                                | phone_number       | PHONE_NUMBER  | false    | false     | false    | false        | true        | false      | false       | Tue, 19 Jul 2022 14:48:11 UTC | Tue, 19 Jul 2022 14:48:11 UTC |
+------------+---------+--------------------------------+--------------------+---------------+----------+-----------+----------+--------------+-------------+------------+-------------+-------------------------------+-------------------------------+
```

Similarly, you can create the collection with the REST API like this:

```bash
curl --request POST \
  --url 'http://localhost:8123/api/pvlt/1.0/ctl/collections?reason=AppFunctionality' \
  --header 'Authorization: Bearer pvaultauth' \
  --header 'Content-Type: application/json' \
  --data '{
  "name": "buyers",
  "type": "PERSONS",
  "properties": [
    {
      "name": "name",
      "pii_type_name": "NAME"
    }, {
      "name": "email",
      "pii_type_name": "EMAIL",
      "is_unique": true
    }, {
      "name": "address",
      "pii_type_name": "ADDRESS"
    }, {
      "name": "phone_number",
      "pii_type_name": "PHONE_NUMBER",
      "is_nullable": true
    }
  ]
}'
```

### Create a DATA collection

#### Overview

Similar to a `PERSONS` collection, the steps you take to create a `DATA` collection are:

1. Define the collection schema as a PVSchema or JSON file.
2. Use the [CLI add collection](/cli/reference#add-collection) command or [REST API add collection](/api/operations/add-collection) operation, passing the PVSchema or JSON file.

#### Step-by-step

##### Step 1 – Design the collection schema

Before creating the collection, you should decide on what properties to store in it. 

In your e-commerce app, there is buyers’ payment method information that a buyer owns. You create the  `credit_cards` `DATA` collection to store the information

The payment method information defines credit card details including card number, holder name, expiration date, and a CVV. You also want to specify that the card number is encrypted.

After identifying the information, you define it in a PVSchema, like this:

```sql
credit_cards DATA (
  number      CC_NUMBER ENCRYPTED,
  holder_name CC_HOLDER_NAME,
  expiration  CC_EXPIRATION_STRING,
  cvv         CC_CVV
)
```

or in JSON format, like this:

```json
{
  "name": "credit_cards",
  "type": "DATA",
  "properties": [
    {
      "name": "holder_name",
      "pii_type_name": "CC_HOLDER_NAME"
    }, {
      "name": "number",
      "pii_type_name": "CC_NUMBER",
			"is_encrypted": true
    }, {
      "name": "expiration",
      "pii_type_name": "CC_EXPIRATION_STRING"
    }, {
      "name": "cvv",
      "pii_type_name": "CC_CVV"
    }
  ]
}
```

##### Step 2 – Create the collection

When you have defined the collection schema, you create the collection using the REST API or CLI.

To create the `credit_cards` collection with the CLI you use this command:

```bash
pvault collection add --collection-pvschema "
credit_cards DATA (
  number      CC_NUMBER ENCRYPTED,
  holder_name CC_HOLDER_NAME,
  expiration  CC_EXPIRATION_STRING,
  cvv         CC_CVV
)"
```

You get a response similar to this:

```table
+--------------+------+--------------------------------+--------------------+----------------------+----------+-----------+----------+--------------+-------------+------------+-------------+-------------------------------+-------------------------------+
|  collection  | type |          description           |        name        |    pii_type_name     | is_array | is_unique | is_index | is_encrypted | is_nullable | is_builtin | is_readonly |         creation_time         |       modification_time       |
+--------------+------+--------------------------------+--------------------+----------------------+----------+-----------+----------+--------------+-------------+------------+-------------+-------------------------------+-------------------------------+
| credit_cards | DATA | The unique identifier of an    | _id                | OBJECT_ID            | false    | true      | true     | false        | false       | true       | true        | Tue, 19 Jul 2022 14:49:53 UTC | Tue, 19 Jul 2022 14:49:53 UTC |
|              |      | object in the collection.      |                    |                      |          |           |          |              |             |            |             |                               |                               |
| credit_cards | DATA | The name of the collection in  | _owner_collection  | STRING               | false    | false     | false    | false        | true        | true       | false       | Tue, 19 Jul 2022 14:49:53 UTC | Tue, 19 Jul 2022 14:49:53 UTC |
|              |      | which the owner of the object  |                    |                      |          |           |          |              |             |            |             |                               |                               |
|              |      | defined. For associated data,  |                    |                      |          |           |          |              |             |            |             |                               |                               |
|              |      | this value identifies the      |                    |                      |          |           |          |              |             |            |             |                               |                               |
|              |      | PERSONS collection containing  |                    |                      |          |           |          |              |             |            |             |                               |                               |
|              |      | the owner.                     |                    |                      |          |           |          |              |             |            |             |                               |                               |
| credit_cards | DATA | The ID of the owner of the     | _owner_id          | OBJECT_ID            | false    | false     | false    | false        | true        | true       | false       | Tue, 19 Jul 2022 14:49:53 UTC | Tue, 19 Jul 2022 14:49:53 UTC |
|              |      | object. For associated data,   |                    |                      |          |           |          |              |             |            |             |                               |                               |
|              |      | this value identifies the      |                    |                      |          |           |          |              |             |            |             |                               |                               |
|              |      | owning object in a PERSONS     |                    |                      |          |           |          |              |             |            |             |                               |                               |
|              |      | collection.                    |                    |                      |          |           |          |              |             |            |             |                               |                               |
| credit_cards | DATA | The ID that identifies the     | _foreign_id        | FOREIGN_ID           | false    | false     | false    | false        | true        | true       | false       | Tue, 19 Jul 2022 14:49:53 UTC | Tue, 19 Jul 2022 14:49:53 UTC |
|              |      | person in your application     |                    |                      |          |           |          |              |             |            |             |                               |                               |
| credit_cards | DATA | The ID of the tenant with      | _tenant_id         | TENANT_ID            | false    | false     | false    | false        | true        | true       | false       | Tue, 19 Jul 2022 14:49:53 UTC | Tue, 19 Jul 2022 14:49:53 UTC |
|              |      | access privileges for this     |                    |                      |          |           |          |              |             |            |             |                               |                               |
|              |      | object                         |                    |                      |          |           |          |              |             |            |             |                               |                               |
| credit_cards | DATA | The time when the object was   | _creation_time     | TIMESTAMP            | false    | false     | false    | false        | false       | true       | true        | Tue, 19 Jul 2022 14:49:53 UTC | Tue, 19 Jul 2022 14:49:53 UTC |
|              |      | created                        |                    |                      |          |           |          |              |             |            |             |                               |                               |
| credit_cards | DATA | The time when the object was   | _modification_time | TIMESTAMP            | false    | false     | false    | false        | false       | true       | true        | Tue, 19 Jul 2022 14:49:53 UTC | Tue, 19 Jul 2022 14:49:53 UTC |
|              |      | most recently modified         |                    |                      |          |           |          |              |             |            |             |                               |                               |
| credit_cards | DATA | The time when the object will  | _expiration_time   | TIMESTAMP            | false    | false     | false    | false        | false       | true       | true        | Tue, 19 Jul 2022 14:49:53 UTC | Tue, 19 Jul 2022 14:49:53 UTC |
|              |      | be soft-deleted                |                    |                      |          |           |          |              |             |            |             |                               |                               |
| credit_cards | DATA |                                | number             | CC_NUMBER            | false    | false     | false    | true         | false       | false      | false       | Tue, 19 Jul 2022 14:49:53 UTC | Tue, 19 Jul 2022 14:49:53 UTC |
| credit_cards | DATA |                                | holder_name        | CC_HOLDER_NAME       | false    | false     | false    | false        | false       | false      | false       | Tue, 19 Jul 2022 14:49:53 UTC | Tue, 19 Jul 2022 14:49:53 UTC |
| credit_cards | DATA |                                | expiration         | CC_EXPIRATION_STRING | false    | false     | false    | false        | false       | false      | false       | Tue, 19 Jul 2022 14:49:53 UTC | Tue, 19 Jul 2022 14:49:53 UTC |
| credit_cards | DATA |                                | cvv                | CC_CVV               | false    | false     | false    | false        | false       | false      | false       | Tue, 19 Jul 2022 14:49:53 UTC | Tue, 19 Jul 2022 14:49:53 UTC |
+--------------+------+--------------------------------+--------------------+----------------------+----------+-----------+----------+--------------+-------------+------------+-------------+-------------------------------+-------------------------------+
```

Similarly, you can create the collection with the REST API, like this:

```bash
curl --request POST \
  --url 'http://localhost:8123/api/pvlt/1.0/ctl/collections?reason=AppFunctionality' \
  --header 'Authorization: Bearer pvaultauth' \
  --header 'Content-Type: application/json' \
  --data '{
  "name": "credit_cards",
  "type": "DATA",
  "properties": [
    {
      "name": "holder_name",
      "pii_type_name": "CC_HOLDER_NAME"
    }, {
      "name": "number",
      "pii_type_name": "CC_NUMBER",
			"is_encrypted": true
    }, {
      "name": "expiration",
      "pii_type_name": "CC_EXPIRATION_STRING"
    }, {
      "name": "cvv",
      "pii_type_name": "CC_CVV"
    }
  ]
}'
```
