---
sidebar_position: 2.4
---

# Add capabilities to a role

## Learn how to add capabilities to a role

In Vault, the ability of a user to execute a REST API operation or CLI command is determined by the capabilities associated with their role. 

This guide shows how to define the capabilities for a role. It illustrates how to give a user their ability to create and view collections, using the `CapCollectionsReader` and `CapCollectionsWriter` capabilities, and create and view objects in a collection, using the `CapDataReader` and `CapDataWriter` capabilities.

### Prerequisites

This guide uses the `Dashboard` user and the `DashboardRole`  role create it in [Define users](define-a-new-user). To exercise the examples you also need an API token for  `Dashboard` , the process for obtaining an API token is described in [Regenerate user API key](regenerate-user-api-key).  You also need a copy of the IAM configuration file, the step to getting this file is described in [Update the IAM configuration](update-the-IAM-configuration).

### Walkthrough

You add capabilities to a role like this:

1. In the IAM configuration file, edit the section defining the role, such as `[roles.DashboardRole]` , to add the list of capabilities like this:
    
    ```yaml
    [roles.DashboardRole]
        capabilities = ["CapCollectionsReader", "CapCollectionsWriter", "CapDataReader", "CapDataWriter"]
        policies     = []
    ```
    
2. Apply the IAM configuration to Vault.

The role, `DashboardRole`, of the user, `Dashboard`, now has the required capabilities that allow it to create a new collection and delete a new collection. However, to successfully add objects and delete them from the collection, it is not sufficient to have the required capabilities CapDataReader and CapDataWriter.

This is because Vault implements policy management to control access to data in Vault and the role does not have any policies.

### Demonstration

To demonstrate this, create a new collection called `employees` using the user `Dashboard` like this: 

1. Create a file called `employees.json` containing this text to describe the employees collection:
    
    ```json
    {
      "name": "employees",
      "type": "PERSONS",
      "properties": [
        {
          "description": "The employee's email",
          "name": "email",
          "pii_type_name": "EMAIL",
          "is_unique": false,
          "is_index": false,
          "is_encrypted": false,
          "is_nullable": false
        },
        {
          "description": "The employee's age",
          "name": "age",
          "pii_type_name": "INTEGER",
          "is_unique": false,
          "is_index": false,
          "is_encrypted": false,
          "is_nullable": false
        }
      ]
    }
    ```
    
    In this example, the `employees` collection has only two properties: `email` and `age`.
    
2. Using the CLI, create the collection passing in the collection definition and the API token of the user `Dashboard`:
    
    ```
    pvault collection add --collection-json=@employees.json
    ```
    
3. This succeeds because the `Dashboard` user has the `CapCollectionsWriter` capability. You get a response similar to this:
    
    ```json
    +------------+---------+--------------------------------+--------------------+---------------+-----------+----------+--------------+-------------+------------+-------------+-------------------------------+-------------------------------+
    | collection |  type   |          description           |        name        | pii_type_name | is_unique | is_index | is_encrypted | is_nullable | is_builtin | is_readonly |         creation_time         |       modification_time       |
    +------------+---------+--------------------------------+--------------------+---------------+-----------+----------+--------------+-------------+------------+-------------+-------------------------------+-------------------------------+
    | employees  | PERSONS | The unique identifier of an    | _id                | OBJECT_ID     | true      | true     | false        | false       | true       | true        | Wed, 20 Jul 2022 14:53:47 UTC | Wed, 20 Jul 2022 14:53:47 UTC |
    |            |         | object in the collection.      |                    |               |           |          |              |             |            |             |                               |                               |
    | employees  | PERSONS | The name of the collection in  | _owner_collection  | STRING        | false     | false    | false        | true        | true       | false       | Wed, 20 Jul 2022 14:53:47 UTC | Wed, 20 Jul 2022 14:53:47 UTC |
    |            |         | which the owner of the object  |                    |               |           |          |              |             |            |             |                               |                               |
    |            |         | defined. For associated data,  |                    |               |           |          |              |             |            |             |                               |                               |
    |            |         | this value identifies the      |                    |               |           |          |              |             |            |             |                               |                               |
    |            |         | PERSONS collection containing  |                    |               |           |          |              |             |            |             |                               |                               |
    |            |         | the owner.                     |                    |               |           |          |              |             |            |             |                               |                               |
    | employees  | PERSONS | The ID of the owner of the     | _owner_id          | OBJECT_ID     | false     | false    | false        | true        | true       | false       | Wed, 20 Jul 2022 14:53:47 UTC | Wed, 20 Jul 2022 14:53:47 UTC |
    |            |         | object. For associated data,   |                    |               |           |          |              |             |            |             |                               |                               |
    |            |         | this value identifies the      |                    |               |           |          |              |             |            |             |                               |                               |
    |            |         | owning object in a PERSONS     |                    |               |           |          |              |             |            |             |                               |                               |
    |            |         | collection.                    |                    |               |           |          |              |             |            |             |                               |                               |
    | employees  | PERSONS | The ID that identifies the     | _foreign_id        | FOREIGN_ID    | false     | false    | false        | true        | true       | false       | Wed, 20 Jul 2022 14:53:47 UTC | Wed, 20 Jul 2022 14:53:47 UTC |
    |            |         | person in your application     |                    |               |           |          |              |             |            |             |                               |                               |
    | employees  | PERSONS | The ID of the tenant with      | _tenant_id         | TENANT_ID     | false     | false    | false        | true        | true       | false       | Wed, 20 Jul 2022 14:53:47 UTC | Wed, 20 Jul 2022 14:53:47 UTC |
    |            |         | access privileges for this     |                    |               |           |          |              |             |            |             |                               |                               |
    |            |         | object                         |                    |               |           |          |              |             |            |             |                               |                               |
    | employees  | PERSONS | The time when the object was   | _creation_time     | TIMESTAMP     | false     | false    | false        | false       | true       | true        | Wed, 20 Jul 2022 14:53:47 UTC | Wed, 20 Jul 2022 14:53:47 UTC |
    |            |         | created                        |                    |               |           |          |              |             |            |             |                               |                               |
    | employees  | PERSONS | The time when the object was   | _modification_time | TIMESTAMP     | false     | false    | false        | false       | true       | true        | Wed, 20 Jul 2022 14:53:47 UTC | Wed, 20 Jul 2022 14:53:47 UTC |
    |            |         | most recently modified         |                    |               |           |          |              |             |            |             |                               |                               |
    | employees  | PERSONS | The time when the object will  | _expiration_time   | TIMESTAMP     | false     | false    | false        | false       | true       | true        | Wed, 20 Jul 2022 14:53:47 UTC | Wed, 20 Jul 2022 14:53:47 UTC |
    |            |         | be soft-deleted                |                    |               |           |          |              |             |            |             |                               |                               |
    | employees  | PERSONS | The employee's email           | email              | EMAIL         | false     | false    | false        | false       | false      | false       | Wed, 20 Jul 2022 14:53:47 UTC | Wed, 20 Jul 2022 14:53:47 UTC |
    | employees  | PERSONS | The employee's age             | age                | INTEGER       | false     | false    | false        | false       | false      | false       | Wed, 20 Jul 2022 14:53:47 UTC | Wed, 20 Jul 2022 14:53:47 UTC |
    +------------+---------+--------------------------------+--------------------+---------------+-----------+----------+--------------+-------------+------------+-------------+-------------------------------+-------------------------------+
    ```
    
Now, attempt to add an object with the `Dashboard` user like this:

1. Create a file called `object.json` and add this text that describes a new object for the `employees` collection:
    
    ```
    {
        "email": "john@thecompany.com",
        "age": 45
    }
    ```
    
2. Using the CLI, try to add the new object passing in the object definition and the API token of the user `Dashboard`:
    
    ```
    pvault object add --collection=employees --fields=@object.json
    ```
    
3. This operation fails. You see a response similar to this:
    
    ```
    2022/07/20 18:09:06 Error code: PV1006, Status code: 403, Message: The operation is forbidden due to a policy violation., Context: map[username:Dashboard]
    exit status 1
    ```
    
To allow the user to add objects to the employees collection, you must define policies that enable that.
