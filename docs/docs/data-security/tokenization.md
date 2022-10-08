---
sidebar_position: 1
---

# Tokenization

The Vault tokenization engine enables you to create a non-sensitive token that references sensitive data. You can think of a token as a "handle" to the data. Because a token doesn't include the original data, it can travel safely through other systems while keeping them out of compliance scope. Only authorized clients can then detokenize to obtain the referenced data value. Tokens can weakly preserve some properties of the data, such as format and order. For example, a token could maintain the format of an email address such as `7d6496e3-8b9b-44d9@b924-b733f82e3fe4.com`. This feature helps minimize changes on client applications where they expect or validate the format for items such as credit card and email.

The first token type supported is the **pointer-token**, this type of token points to an object's data within Vault. The token references the stored value. When detokenizing, the value returned is always the current one. Also, the token is invalidated when the object is deleted. In the future, the token will be deleted automatically when the object is deleted.

:::info 
The [Vault roadmap](/roadmap) includes support for various types of tokens. These include format-preserving tokens, deterministic tokens, and many more.
:::

### Example

Assuming Vault contains an employees collection with these people:

```table
+--------------------------------------+----------------+
|                  id                  |      email     |
+--------------------------------------+----------------+
| 7d6496e3-8b9b-44d9-b924-b733f82e3fe4 | john@gmail.com |
| b91d6440-1e42-4703-bc7d-8fb026898dbb | mary@gmail.com |
| f9e17299-bc8b-4626-89c9-53760878e419 | eric@gmail.com |
+--------------------------------------+----------------+
```

Mary's email address can be toeknized using the [Tokenize](/api/operations/tokenize) REST API operation, or, as shown here, the [Tokenize](/cli/reference#create-token) CLI command.

```bash
pvault token create \
  --collection employees \
  --object-id b91d6440-1e42-4703-bc7d-8fb026898dbb \
  --props email
+--------------------------------------+
|                token                 |
+--------------------------------------+
| 6cbdc2c9-3d81-41bc-920b-47b8a07bd127 |
+--------------------------------------+
```

Then detokenized:

```bash
pvault token detokenize \
  --collection employees \
  --token-id 6cbdc2c9-3d81-41bc-920b-47b8a07bd127
+-------+----------------+
| NAME  |     VALUE      |
+-------+----------------+
| email | mary@gmail.com |
+----–--+----------------+
```

The token can be removed like this:

```bash
pvault token delete \
  --collection employees \
  --token-id 6cbdc2c9-3d81-41bc-920b-47b8a07bd127
```

Now, any attempt to detokenize the token results in an error:

```bash
pvault token detokenize \
  --collection employees \
  --token-id 6cbdc2c9-3d81-41bc-920b-47b8a07bd127 
2022/04/12 09:35:00 Error code: PV3009, Status code: 404, Message: The token is not found., Context: map[]
```
