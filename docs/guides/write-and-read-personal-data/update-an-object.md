---
sidebar_position: 2.2
---

# Update an object

## Learn how to update a personal data object.

To update personal data values for an object in a collection you provide the ID of the object and the values of the properties you want to update. If you provide a field with the same value as it has, the field won’t be updated.

Whether your request to update object values succeeds depends on:

- the correct specification of the collection and object ID.
- the value provided validating against the rules for their data type.
- the permissions you've been granted as part of the Vault’s identity and access management settings.

If the operation fails an error message is returned, while no output means a successful update.

### Update an object to PERSONS collection

#### Overview

To update an object in a collection you:

1. Determine the ID of the object you want to update in a collection.
2. Determine which property values should be updated and construct the JSON.
3. Use the [CLI update an object](/cli/reference#update-an-object) command or [REST API update object by id](/api/operations/update-object-by-id) operation passing the ID of the object, the property values JSON, and the collection name.

#### Step-by-step

You want to update the email and phone number of an object with the ID `ab3d5be0-ffde-4a8c-983a-f79dd5d34e17` in the ‘buyers’ collection you created in [Create a collection](../manage-collections-and-schemas/create-a-collection) with these values:

- `email` = "john@newmail.com"
- `phone_number` = "+1-121212123"

First, you construct the JSON to specify the changes, like this:

```json
{ 
"email":"john2@newmail.com", 
"phone_number":"+1-121212123" 
}
```

Now, you can request the update using either the CLI like this:

```bash
pvault object update --id 'ab3d5be0-ffde-4a8c-983a-f79dd5d34e17' --fields '{ "email":"john@newmail.com", "phone_number":"+1-121212123" }' --collection customers
```

or REST API like this:

```bash
curl --request PATCH \
  --url 'http://localhost:8123/api/pvlt/1.0/data/collections/customers/objects?id=ab3d5be0-ffde-4a8c-983a-f79dd5d34e17&reason=AppFunctionality' \
  --header 'Authorization: Bearer pvaultauth' \
  --header 'Content-Type: application/json' \
  --data '{ 
"email":"john2@newmail.com", 
"phone_number":"+1-121212123" 
}'
```

If the request is successful, you get a 200 response; there is no other output.
