---
sidebar_position: 2
---

# List all transformations

## Learn how to list all transformations

You get a complete list of the transformations using the [Get transformations](/api/operations/list-transformations) REST API operation, or, as shown here, the [Get transformations](/cli/reference#list-all-transformations) CLI command. 

```bash
pvault transformation list
```

```table
+-------------------------+------+---------------+
|         config          | name | pii_type_name |
+-------------------------+------+---------------+
| {}                      | mask | EMAIL         |
| {}                      | mask | SSN           |
| {"non_masked_length":4} | mask | BAN           |
| {"non_masked_length":4} | mask | PHONE_NUMBER  |
| {"non_masked_length":4} | mask | CC_NUMBER     |
+-------------------------+------+---------------+
```

You can then access the masked SSNs using the CLI like this:

```bash
pvault object list --props _id,ssn.mask
```

```table
+--------------------------------------+-------------+
|                 _id                  | ssn.mask    |
+--------------------------------------+-------------+
| 7d6496e3-8b9b-44d9-b924-b733f82e3fe4 | ***-**-1234 |
| b91d6440-1e42-4703-bc7d-8fb026898dbb | ***-**-1235 |
| f9e17299-bc8b-4626-89c9-53760878e419 | ***-**-1236 |
+--------------------------------------+-------------+
```

Or, using [Get properties of object](/api/operations/get-objects), you can obtain the masked value of an SSN like this:

```bash
curl --request GET \
  --url 'http://localhost:8123/api/pvlt/1.0/data/collections/customers?id=f9e17299-bc8b-4626-89c9-53760878e419&props=ssn.mask&reason=Maintenance' \
  --header 'Authorization: Bearer pvaultauth' \
  --header 'Content-Type: application/json'
{"id":"f9e17299-bc8b-4626-89c9-53760878e419","ssn.mask":"***-**-1236"}
```
