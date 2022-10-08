---
sidebar_position: 2
---

# Add an object

## Learn how to add an object in Piiano Vault.

An object is a group of personal or sensitive data values that belong to a collection.

Adding an object to a collection is similar to adding a row to a table; depending on the collection you want to add an object to, you should provide values for all properties or a subset of them. When an object is added, it's assigned a unique ID.

Whether your request for object values succeeds depends on the permissions you've been granted as part of the Vault’s identity and access management settings.

### Add an object to a collection

#### Overview

The steps you take to add an object to the collection are:

1. Define the property values for the object.
2. Use the [CLI Add object](/cli/reference#add-an-object) command or [REST API Add object](/api/operations/add-object) operation passing the property values and the collection name.

#### Step-by-step

You want to add an object to the `buyers` collection you created in [Create a collection](../manage-collections-and-schemas/create-a-collection) with these values:

- name = "John Doe"
- email = "john@somemail.com"
- address is empty
- phone number = "+1-121212123"

For these values you use a JSON object to define the data to the REST API or CLI, like this:

```json
{ 
  "name":"John Doe", 
  "email":"john@somemail.com", 
  "phone_number":"+1-121212123" 
}
```

You now add the object using the CLI like this:

```bash
pvault object add \
  --collection customers \
  --fields '{
    "name": "John Doe",
    "email": "john@somemail.com",
    "phone_number":"+1-121212123"
  }'
```

You get a response similar to this:

```table
+--------------------------------------+
|                 _id                  |
+--------------------------------------+
| ab3d5be0-ffde-4a8c-983a-f79dd5d34e17 |
+--------------------------------------+
```

Or using the REST API like this:

```bash
curl --request POST \
  --url 'http://localhost:8123/api/pvlt/1.0/data/collections/customers/objects?reason=AppFunctionality' \
  --header 'Authorization: Bearer pvaultauth' \
  --header 'Content-Type: application/json' \
  --data '{ 
    "name":"John Doe", 
    "email":"john@somemail.com", 
    "phone_number":"+1-121212123" 
  }'
```

You get a response similar to this:

```json
{"_id":"b00e021c-7880-43c8-9bdc-e4fa3a474a85"}
```
