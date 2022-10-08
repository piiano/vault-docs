---
sidebar_position: 2.3
---

# Delete an object

## Learn how to delete a personal data object.

After adding an object, you may want to delete an object from a collection.

### Delete an object from a collection

#### Overview

To delete an object in a collection you:

1. Determine the ID of the object you want to delete.
2. Use the [CLI delete an object](/cli/reference#delete-an-object) command or the [REST API delete object by id](/api/operations/delete-object-by-id) operation passing the ID of the object.

#### Step-by-step

You want to delete the object with the ID `ab3d5be0-ffde-4a8c-983a-f79dd5d34e17` in the ‘buyers’ collection you created in [Create a collection](../manage-collections-and-schemas/create-a-collection).

You request the deletion using either the CLI like this:

```bash
pvault object delete --collection users --id a7a445d0-7173-41c5-957d-bf83feadf32b
```

or REST API like this:

```bash
curl --request DELETE \
  --url 'http://localhost:8123/api/pvlt/1.0/data/collections/customers/objects?id=ab3d5be0-ffde-4a8c-983a-f79dd5d34e17&reason=AppFunctionality' \
  --header 'Authorization: Bearer pvaultauth' \
  --header 'Content-Type: application/json'
```

If the request is successful, you get a 200 response; there is no other output.
