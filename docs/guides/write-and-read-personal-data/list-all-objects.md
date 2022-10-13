---
sidebar_position: 2.4
---

# List all objects

## Learn how to list all personal data objects.

You can obtain a list of all objects in a collection, returning all or a subset of their values. You can also request transformations of values, where available.

You can use the `unsafe` option to get all the values of the objects (which is not recommended). Using `unsafe` can be combined with the `show_builtins` option to include the built-in properties. 

Whether your request for all objects succeeds depends on the permissions you've been granted as part of the Vault’s identity and access management settings.

### Get some properties of all objects in a collection

#### Overview

To get a list of all object from a collection you:

1. Determine which object property values you want returned.
2. Use the [CLI list all objects](/cli/reference#list-all-objects) command or the [REST API get objects](/api/operations/get-objects) operation passing the property or properties and the collection name.

#### Step-by-step

You want to retrieve name and email for all the buyers in the ‘buyers’ collection you created in [Create a collection](../manage-collections-and-schemas/create-a-collection).

You list the objects using the CLI like this:

```bash
pvault object list --props name,email --collection customers
```

You get a response similar to this:

```table
+-----------------------------+------------+
|            email            |    name    |
+-----------------------------+------------+
| Jeffry_Wehner9756@yahoo.com | Jeffry     |
| Ardith.Reichel9@gmail.com   | Ardith     |
| Lincoln9@yahoo.com          | Lincoln    |
| Destiney65@hotmail.com      | Destiney   |
| Quentin_Ferry@hotmail.com   | Moni       |
| Erica_Jerde@gmail.com       | Erica      |
| Arvid_Pagac20@hotmail.com   | Arvid      |
| john1234@gmail.com          | John       |
+-----------------------------+------------+
```

Or using the REST API like this:

```bash
curl --request GET \
  --url 'http://localhost:8123/api/pvlt/1.0/data/collections/customers/objects?props=name,email&reason=AppFunctionality' \
  --header 'Authorization: Bearer pvaultauth' \
  --header 'Content-Type: application/json'
```

You get a response similar to this:

```json
[{"email":"Jeffry_Wehner9756@yahoo.com","first_name":"Jeffry"},{"email":"Ardith.Reichel9@gmail.com","first_name":"Ardith"},{"email":"Lincoln9@yahoo.com","first_name":"Lincoln"},{"email":"Destiney65@hotmail.com","first_name":"Destiney"},{"email":"Quentin_Ferry@hotmail.com","first_name":"Moni"},{"email":"Erica_Jerde@gmail.com","first_name":"Erica"},{"email":"Arvid_Pagac20@hotmail.com","first_name":"Arvid"},{"email":"john1234@gmail.com","first_name":"John"}]
```

### Get transformed properties for all objects in a collection

#### Overview

Data types can have transformations. Several built-in translations are provided with Vault. For example, there is a transformation for the email data type that returns a masked email address similar to this ‘j**********@gmail.com’.

To get transformed values for all the objects in a collection you:

1. Determine which transformed property values you want from each object.
2. Use the [CLI list all objects](/cli/reference#list-all-objects) command or the [REST API get objects](/api/operations/get-objects) operation passing the IDs of the objects, the transformed properties, and collection name.

#### Step-by-step

You want to retrieve the name and transformed email of all buyers in the ‘buyers’ collection you created in [Create a collection](../manage-collections-and-schemas/create-a-collection).

First, you determine the name of the transformation for email values. See [list transformations](../manage-transformations/list-all-transformations) for a guide to listing the transformations and their names.

Once you've determined the transformation name for the object property you want to retrieve, define the transformed property by appending the mask name to the property name using dot annotation. For example, for your transformed email address, you use `email.mask`.

You now retrieve the values and transformed values using the CLI like this:

```bash
pvault object list --props name,email.mask --collection customers
```

You get a response similar to this:

```table
+-----------------------------+------------+
|         email.mask          | first_name |
+-----------------------------+------------+
| J****************@yahoo.com | Jeffry     |
| A**************@gmail.com   | Ardith     |
| L*******@yahoo.com          | Lincoln    |
| D*********@hotmail.com      | Destiney   |
| Q************@hotmail.com   | Moni       |
| E**********@gmail.com       | Erica      |
| A************@hotmail.com   | Arvid      |
| j*******@gmail.com          | John       |
+-----------------------------+------------+
```

Or using the REST API like this:

```bash
curl --request GET \
  --url 'http://localhost:8123/api/pvlt/1.0/data/collections/customers/objects?props=name,email.mask&reason=AppFunctionality' \
  --header 'Authorization: Bearer pvaultauth' \
  --header 'Content-Type: application/json'
```

You get a response similar to this:

```json
[{"email.mask":"J****************@yahoo.com","first_name":"Jeffry"},{"email.mask":"A**************@gmail.com","first_name":"Ardith"},{"email.mask":"L*******@yahoo.com","first_name":"Lincoln"},{"email.mask":"D*********@hotmail.com","first_name":"Destiney"},{"email.mask":"Q************@hotmail.com","first_name":"Moni"},{"email.mask":"E**********@gmail.com","first_name":"Erica"},{"email.mask":"A************@hotmail.com","first_name":"Arvid"},{"email.mask":"j*******@gmail.com","first_name":"John"}]
```
