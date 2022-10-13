---
sidebar_position: 2.5
---

# Search objects

## Learn how to search for personal data objects.

You can search for objects in a collection and return all or a subset of the found object’s values. You can also request transformations of values, where available.

You can use `unsafe` option to get all the values of the objects (which is not recommended). Using `unsafe` can be combined with `show_builtins` option to include the built-in properties. 

Whether your request for object values succeeds depends on the permissions you've been granted as part of the Vault’s identity and access management settings.

### Search for objects and return object properties

#### Overview

To search for objects in a collection you:

1. Build a search query. 
2. Use [CLI search objects](/cli/reference#search-objects) or the [REST API search objects](/api/operations/search-objects) operation passing the property or properties you want to get and the collection name.

#### Step-by-step

You want to retrieve name and email for all the buyers with the name "John" in the ‘buyers’ collection you created in [Create a collection](../manage-collections-and-schemas/create-a-collection).

First, build your search query like this:

```bash
name=John
```

You search for the objects using the CLI like this:

```bash
pvault object query \
  --match name=John \
  --props name,email \
  --collection customers
```

You get a response similar to this:

```table
+-----------------------------+------------+
|            email            |    name    |
+-----------------------------+------------+
| mr.john@somemail.com        | John       |
| john1234@gmail.com          | John       |
+-----------------------------+------------+
```

Or using the REST API like this:

```bash
curl --request POST \
  --url 'http://localhost:8123/api/pvlt/1.0/data/collections/customers/query/objects?props=name,email&reason=AppFunctionality' \
  --header 'Authorization: Bearer pvaultauth' \
  --header 'Content-Type: application/json' \
  --data '{
    "match": {"name":"John"}
  }'
```

You get a response similar to this:

```json
[{"email":"mr.john@somemail.com","name":"John"},{"email":"john1234@gmail.com","name":"John"}]
```

### Search for objects and return transformed properties

#### Overview

Data types can have transformations. Several built-in translations are provided with Vault. For example, there is a transformation for the email data type that returns a masked email address similar to this ‘j**********@gmail.com’.

To get transformed values of objects you search for you:

1. Determine which transformed property values you want from each object.
2. Use [CLI search objects](/cli/reference#search-objects) or the [REST API search objects](/api/operations/search-objects) operation passing the IDs of the objects, the transformed properties, and collection name.

:::note
Search queries only support exact matches. Support for other search options is coming soon 🎁.  
:::

#### Step-by-step

You want to return the name and transformed email address for all buyers in the ‘buyers’ collection you created in [Create a collection](../manage-collections-and-schemas/create-a-collection) with the name "John".

First, build your search query like this:

```bash
name=John
```

Now, you determine the name of the transformation for email values. See [list transformations](../manage-transformations/list-all-transformations) for a guide to listing the transformations and their names.

Once you've determined the transformation name for the object property you want to retrieve, define the transformed property by appending the mask name to the property name using dot annotation. For example, for your transformed email address, you use `email.mask`.

You now search for your buyers and retrieve the values and transformed values using the CLI like this:

```bash
pvault object query \
  --match name=John \
  --props name,email.mask \
  --collection customers
```

You get a response similar to this:

```table
+-----------------------------+------------+
|            email            |    name    |
+-----------------------------+------------+
| m*******@gmail.com          | John       |
| j*******@gmail.com          | John       |
+-----------------------------+------------+
```

Or using the REST API like this:

```bash
curl --request POST \
  --url 'http://localhost:8123/api/pvlt/1.0/data/collections/customers/query/objects?props=name,email.mask&reason=AppFunctionality' \
  --header 'Authorization: Bearer pvaultauth' \
  --header 'Content-Type: application/json' \
  --data '{
    "match": {"name":"John"}
  }'
```

You get a response similar to this:

```json
[{"email":"m*******@gmail.com","name":"John"},{"email":"j*******@gmail.com","name":"John"}]
```
