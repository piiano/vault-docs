---
sidebar_position: 2.1
---

# Retrieve an object

## Learn how to retrieve personal data object.

To retrieve personal data values for an object or objects in a collection, you provide an ID or a comma-separated list of IDs. 

After specifying the objects, you set the property or properties whose values you want to retrieve. You can also request transformations of the values.

You can use the `unsafe` option to get all the values of the objects (which is not recommended). Using `unsafe` can be combined with the `show_builtins` option to include the built-in properties. 

Whether your request for object values succeeds depends on the permissions you've been granted as part of the Vault’s identity and access management settings.

### Get properties of an object

#### Overview

To get an object’s data from a collection you:

1. Determine which objects you want to retrieve and determine their IDs.
2. Determine which values you want from every object.
3. Use the [CLI get object](/cli/reference#get-an-object) command or [REST API get objects](/api/operations/get-objects) operation passing the IDs of the objects, the properties, and collection name.


#### Step-by-step

Say you want to retrieve the name and email of a buyer with the ID `ab3d5be0-ffde-4a8c-983a-f79dd5d34e17` from the ‘buyers’ collection you created in [Create a collection](../manage-collections-and-schemas/create-a-collection). 

You retrieve the object values using the CLI like this:

```bash
pvault object get \
  --id 'ab3d5be0-ffde-4a8c-983a-f79dd5d34e17' \
  --props name,email \
  --collection customers
```

You get a response similar to this:

```table
+-------------------+----------+
|       email       |   name   |
+-------------------+----------+
| john@somemail.com | John Doe |
+-------------------+----------+
```

Or using the REST API like this:

```bash
curl --request GET \
  --url 'http://localhost:8123/api/pvlt/1.0/data/collections/customers/objects?id=ab3d5be0-ffde-4a8c-983a-f79dd5d34e17&props=name,email&reason=AppFunctionality' \
  --header 'Authorization: Bearer pvaultauth' \
  --header 'Content-Type: application/json'
```

You get a response similar to this:

```json
[{"email":"john@somemail.com","name":"John Doe"}]
```

### Get transformed properties of an object from a collection

#### Overview

Data types can have transformations. Several built-in translations are provided with Vault. For example, there is a transformation for the email data type that returns a masked email address similar to this ‘j**********@gmail.com’.

To get an object’s transformed values from a collection you:

1. Determine which objects you want to retrieve and determine their IDs.
2. Determine which transformed property values you want from every object.
3. Use the [CLI get object](/cli/reference#get-an-object) command or [REST API get objects](/api/operations/get-objects) operation passing the IDs of the objects, the transformed properties, and collection name.

#### Step-by-step

Say you now want to retrieve the name and transformed email of the buyer with the ID `ab3d5be0-ffde-4a8c-983a-f79dd5d34e17`.

First, you determine the name of the transformation for email values. See [list transformations](../manage-transformations/list-all-transformations) for a guide to listing the transformations and their names.

Once you've determined the transformation name for the object property you want to retrieve, define the transformed property by appending the mask name to the property name using dot annotation. For example, for your transformed email address, you use `email.mask`.

You now retrieve the object values and transform values using the CLI like this:

```bash
pvault object get \
  --id 'ab3d5be0-ffde-4a8c-983a-f79dd5d34e17' \
  --props name,email.mask \
  --collection customers
```

You get a response similar to this:

```table
+-----------------------+----------+
|      email.mask       |   name   |
+-----------------------+----------+
| j**********@gmail.com | John Doe |
+-----------------------+----------+
```

Or using the REST API like this:

```bash
curl --request GET \
  --url 'http://localhost:8123/api/pvlt/1.0/data/collections/customers/objects?id=ab3d5be0-ffde-4a8c-983a-f79dd5d34e17&props=name,email.mask&reason=AppFunctionality' \
  --header 'Authorization: Bearer pvaultauth' \
  --header 'Content-Type: application/json'
```

You get a response similar to this:

```json
[{"email.mask":"j**********@gmail.com","name":"John Doe"}]
```