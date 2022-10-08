---
sidebar_position: 2.5
---

# Define new policies

## Learn how to define new policies and add them to a role

In Vault, the ability of a user to work with data is determined by the policies associated with their role. 

This guide shows how to define policies for a role.

### Prerequisites

This guide uses the `Dashboard` user and the `DashboardRole`  role create it in [Define users](define-a-new-user). The user must also have the capabilities added to the role in [Add capabilities to a role](add-capabilities-to-a-role). To exercise the examples you also need an API token for  `Dashboard` , the process for obtaining an API token is described in [Regenerate user API key](regenerate-user-api-key). You also need a copy of the IAM configuration file, the step to getting this file is described in [Update the IAM configuration](update-the-IAM-configuration).

### Walkthrough

To create and view objects in a collection the role of the user must have at least one policy that allows this operation and no policies that deny it.

The default IAM Configuration of Vault, contains the definitions for `PolWriteAll` and `PolReadAll`. Do not add them again. The third policy, PolDenyAccessEmail, needs to be added to the `DashboardRole` role like this:

1. In the IAM configuration file, edit the `[policies]` section so that it contains these three policies:
    
    ```
    [policies.PolWriteAll]
        policy_type = "allow"
        operations  = ["write"]
        reasons     = ["*"]
        resources   = ["*"]
    
    [policies.PolReadAll]
        policy_type = "allow"
        operations  = ["read"]
        reasons     = ["*"]
        resources   = ["*"]
    
    [policies.PolDenyEmailRead]
        policy_type = "deny"
        operations  = ["read"]
        reasons     = ["*"]
        resources   = ["employees/properties/email"]
    ```
    
    The `PolWriteAll` policy provides write access to all resources for any reason. The `PolReadAll` policy provides read access to all resources for any reason. The `PolDenyAccessEmail` denies read and write access to the email property of the employees collection.
    
2. Now, edit the `[roles.DashboardRole]` section, adding these three policies to the role.

```go
[roles.DashboardRole]
    capabilities = ["CapCollectionsReader", "CapCollectionsWriter", "CapDataReader", "CapDataWriter"]
    policies     = ["PolWriteAll", "PolReadAll", "PolDenyEmailRead"]
```

1. Apply the IAM configuration to Vault.

### Demonstration

Adding these three policies to the `DashboardRole` role allows the user `Dashboard` to perform all of these operations:

1. Create an object in the `employees` collection specifying values for both the `email` and `age` properties.
2. Read the `age` property of all objects in the collection, but not the `email` property. 

To demonstrate this, add an object with the `Dashboard` user like this: 

1. Create a file called `object.json` and add this text that describes a new object for the `employees` collection:
    
    ```
    {
        "email": "john@thecompany.com",
        "age": 45
    }
    ```
    
2. Using the CLI, add the object passing in the object definition and the API token of the user `Dashboard`:
    
    ```
    pvault object add --collection=employees --fields=@object.json
    ```
    
3. This command succeeds because the `Dashboard` user has a role with the policy `PolWriteAll` that allows the write and no policies that deny it. You receive a response similar to this:
    
    ```
    +--------------------------------------+
    |                 _id                  |
    +--------------------------------------+
    | 32077c80-3792-4a45-a957-e365bb1c9533 |
    +--------------------------------------+
    ```
    
    Note the value of the `_id` returned in the response, as it is needed to identify the new object in read operations.
    

Now, attempt to read all properties of the object with the `Dashboard` user like this: 

1. Using the CLI, run this command:
    
    ```
    pvault object get --collection=employees --id=32077c80-3792-4a45-a957-e365bb1c9533 --all-unsafe 
    ```
    
2. This fails, because the role of the `Dashboard` user has a policy that denies access to the `email` property and the operation requests read access to all properties. You receive a response similar to this:
    
    ```
    2022/07/20 18:52:14 Error code: PV1006, Status code: 403, Message: The operation is forbidden due to a policy violation., Context: map[username:Dashboard]
    exit status 1
    ```
    
Though access to all properties is denied, access to the `age` property is possible, because the `DashboardRole` role has the policy `PolReadAll` that allows the `age` property to be read, and no policy that denies it.

To demonstrate this, read the `age` property for the object, like this:

1. Using the CLI, run this command:
    
    ```
    pvault object get --collection=employees --id=32077c80-3792-4a45-a957-e365bb1c9533 --props=age
    ```
    
    :::note
    Unlike the previous command, this command uses the `--props` option to request read access for specific properties.
    :::
    
2. This command succeeds. You should receive this response:
    
    ```
    +-----+
    | age |
    +-----+
    |  45 |
    +-----+
    ```
    
:::note
Using the `--props` option to access the `email` property fails, for the same reason that using the option `--all-unsafe` fails.
:::
