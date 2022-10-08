---
sidebar_position: 2.1
---

# Retrieve a token

## Learn how to retrieve a token in Piiano Vault.

After tokenizing data, you may want to get the data from the token. This process is called "detokenization". In addition to detokenizing tokens, you may want to retrieve token metadata such as the expiration date, reusability state, tags, etc.

When detokenizing or retrieving metadata, tokens are identified by three parameters. All parameters are optional, but at least one must be provided. These parameters are:

1. `token_id` - A list of token IDs. If not empty, all the IDs must exist and be valid, otherwise the operation errors.
2. `object_id` - A list of object IDs.
3. `tag` - A list of tags.

The returned tokens are those that match all of the parameters and are valid, that is, the token has not expired or the tokenized object is present.

### Detokenize using token ID

#### Overview

To obtain the underlying values of tokens using token IDs:

1. Determine the IDs of the tokens. 
2. Use the [CLI detokenize](/cli/reference#detokenize) command or [REST API detokenize](/api/operations/detokenize) operation, passing the token IDs.

#### Step-by-step

Say you want to get the value of a token on the `paymentinfo` collection with the ID `d27923c6-5d16-41e3-89ee-118b05a25372`.

You retrieve the value using the CLI like this:

```bash
pvault token detokenize \
  -t d27923c6-5d16-41e3-89ee-118b05a25372 \
  --collection paymentinfo
```

You get a response similar to this:

```table
+--------------------------------------+------------------+
|               token_id               |       pan        |
+--------------------------------------+------------------+
| d27923c6-5d16-41e3-89ee-118b05a25372 | 4012888888881881 |
+--------------------------------------+------------------+
```

Or using the REST API like this:

```bash
curl -X GET \
  -H 'Authorization: Bearer pvaultauth' \
  -H 'Content-Type: application/json' \
  'http://localhost:8123/api/pvlt/1.0/data/collections/paymentinfo/tokens?token_id=d27923c6-5d16-41e3-89ee-118b05a25372&reason=AppFunctionality'
```

You get a response similar to this:

```json
[{"token_id":"d27923c6-5d16-41e3-89ee-118b05a25372","fields":{"pan":"4012888888881881"}}]
```
    
### Search token by token ID

#### Overview

To obtain the metadata of tokens using token IDs:

1. Determine the IDs of the tokens.
2. Use the [CLI get-token](/cli/reference#search-tokens) command or [[REST API get tokens metadata](/api/operations/search-tokens) operation, passing the token IDs.

#### Step-by-step

Say you want to get the metadata for a token on the `paymentinfo` collection with the ID `d27923c6-5d16-41e3-89ee-118b05a25372`.

You retrieve the value using the CLI like this:

```bash
pvault token info \
  -t d27923c6-5d16-41e3-89ee-118b05a25372 \
  --collection paymentinfo
```

You get a response similar to this:

```table
+--------------------------------------+---------+------------+-------------------+-------------------------------+------+-------------------------------+-------------------------------+--------------------------------------+
|               token_id               |  scope  | reversible | reusable_token_id |      max_expiration_time      | tags |         creation_time         |        expiration_time        |              object_id               |
+--------------------------------------+---------+------------+-------------------+-------------------------------+------+-------------------------------+-------------------------------+--------------------------------------+
| d27923c6-5d16-41e3-89ee-118b05a25372 | default | true       | true              | Wed, 20 Jul 2022 23:15:44 UTC | []   | Tue, 19 Jul 2022 23:01:00 UTC | Wed, 20 Jul 2022 23:15:44 UTC | b3436a70-5f2d-48f6-b887-6a87087f8b03 |
+--------------------------------------+---------+------------+-------------------+-------------------------------+------+-------------------------------+-------------------------------+--------------------------------------+
```

Or using the REST API like this:

```bash
curl -X POST \
  -H 'Authorization: Bearer pvaultauth' \
  -H 'Content-Type: application/json' \
  -d '{ "token_id": ["d27923c6-5d16-41e3-89ee-118b05a25372"] }' \
  'http://localhost:8123/api/pvlt/1.0/data/collections/paymentinfo/query/tokens?reason=AppFunctionality'
```

You get a response similar to this:

```json
[{"token_id":"d27923c6-5d16-41e3-89ee-118b05a25372","scope":"default","reusable_token_id":true,"reversible":true,"tokens":[{"tags":[],"creation_time":"2022-07-19T23:01:00.981784Z","expiration_time":"2022-07-20T23:15:44.399209Z","object_id":"b3436a70-5f2d-48f6-b887-6a87087f8b03"}],"agg":{"max_expiration_time":"2022-07-20T23:15:44.399209Z"}}]
```
    
### Search tokens for an object

#### Overview

You may want to know what tokens an object or objects have. To get a list of the objects’ token IDs and token metadata:

1. Determine the IDs of the objects. 
2. Use the [CLI search-tokens](/cli/reference#search-tokens) command or [[REST API get tokens metadata](/api/operations/search-tokens) operation, passing the object IDs.

#### Step-by-step

Say you want to get the metadata for an object on the `paymentinfo` collection with the ID `3afa094a-6443-4e6f-926c-2526151f892d` where the collection contains these tokens:

```table
+--------------------------------------+---------+------------+-------------------+-------------------------------+------+-------------------------------+-------------------------------+--------------------------------------+
|               token_id               |  scope  | reversible | reusable_token_id |      max_expiration_time      | tags |         creation_time         |        expiration_time        |              object_id               |
+--------------------------------------+---------+------------+-------------------+-------------------------------+------+-------------------------------+-------------------------------+--------------------------------------+
| 32077c80-3792-4a45-a957-e365bb1c9533 | default | true       | true              | Thu, 21 Jul 2022 00:19:28 UTC | [a]  | Wed, 20 Jul 2022 00:19:28 UTC | Thu, 21 Jul 2022 00:19:28 UTC | 6b0323e6-b587-4f1b-8cfc-712fc4a4781f |
| 32077c80-3792-4a45-a957-e365bb1c9533 | default | true       | true              | Thu, 21 Jul 2022 00:19:28 UTC | [a]  | Wed, 20 Jul 2022 00:19:28 UTC | Thu, 21 Jul 2022 00:19:28 UTC | 3afa094a-6443-4e6f-926c-2526151f892d |
| d3038cd5-afd6-483b-b74c-20efea0041ea | default | true       | true              | Thu, 21 Jul 2022 00:19:47 UTC | [b]  | Wed, 20 Jul 2022 00:19:47 UTC | Thu, 21 Jul 2022 00:19:47 UTC | 3afa094a-6443-4e6f-926c-2526151f892d |
+--------------------------------------+---------+------------+-------------------+-------------------------------+------+-------------------------------+-------------------------------+--------------------------------------+
```

You retrieve the object’s tokens and their metadata using the CLI like this:

```bash
pvault token info \
  --object-id 3afa094a-6443-4e6f-926c-2526151f892d \
  --collection paymentinfo
```

You get a response similar to this:

```table
+--------------------------------------+---------+------------+-------------------+-------------------------------+------+-------------------------------+-------------------------------+--------------------------------------+
|               token_id               |  scope  | reversible | reusable_token_id |      max_expiration_time      | tags |         creation_time         |        expiration_time        |              object_id               |
+--------------------------------------+---------+------------+-------------------+-------------------------------+------+-------------------------------+-------------------------------+--------------------------------------+
| 32077c80-3792-4a45-a957-e365bb1c9533 | default | true       | true              | Thu, 21 Jul 2022 00:19:28 UTC | [a]  | Wed, 20 Jul 2022 00:19:28 UTC | Thu, 21 Jul 2022 00:19:28 UTC | 3afa094a-6443-4e6f-926c-2526151f892d |
| d3038cd5-afd6-483b-b74c-20efea0041ea | default | true       | true              | Thu, 21 Jul 2022 00:19:47 UTC | [b]  | Wed, 20 Jul 2022 00:19:47 UTC | Thu, 21 Jul 2022 00:19:47 UTC | 3afa094a-6443-4e6f-926c-2526151f892d |
+--------------------------------------+---------+------------+-------------------+-------------------------------+------+-------------------------------+-------------------------------+--------------------------------------+
```

Or using the REST API like this:

```bash
curl -X POST \
  -H 'Authorization: Bearer pvaultauth' \
  -H 'Content-Type: application/json' \
  -d '{ "object_id": ["3afa094a-6443-4e6f-926c-2526151f892d"] }' \
  'http://localhost:8123/api/pvlt/1.0/data/collections/paymentinfo/query/tokens?reason=AppFunctionality'
```

You get a response similar to this:

```json
[{"token_id":"32077c80-3792-4a45-a957-e365bb1c9533","scope":"default","reusable_token_id":true,"reversible":true,"tokens":[{"tags":["a"],"creation_time":"2022-07-20T00:19:28.386427Z","expiration_time":"2022-07-21T00:19:28.391701Z","object_id":"3afa094a-6443-4e6f-926c-2526151f892d"}],"agg":{"max_expiration_time":"2022-07-21T00:19:28.400582Z"}},{"token_id":"32077c80-3792-4a45-a957-e365bb1c9533","scope":"default","reusable_token_id":true,"reversible":true,"tokens":[{"tags":["a"],"creation_time":"2022-07-20T00:19:47.364796Z","expiration_time":"2022-07-21T00:19:47.369808Z","object_id":"3afa094a-6443-4e6f-926c-2526151f892d"}],"agg":{"max_expiration_time":"2022-07-21T00:19:47.369808Z"}}]
```

### Search tokens by tag

#### Overview

You may want to know what tokens exist for a tag or tags. To get a list of the objects’ token IDs and token metadata:

1. Determine the tags. 
2. Use the [CLI search-tokens](/cli/reference#search-tokens) command or [[REST API get tokens metadata](/api/operations/search-tokens) operation, passing the tags.

#### Step-by-step

Say you want to get the metadata for tokens on the `paymentinfo` collection with the `a` tag, where the collection contains these tokens:

```table
+--------------------------------------+---------+------------+-------------------+-------------------------------+------+-------------------------------+-------------------------------+--------------------------------------+
|               token_id               |  scope  | reversible | reusable_token_id |      max_expiration_time      | tags |         creation_time         |        expiration_time        |              object_id               |
+--------------------------------------+---------+------------+-------------------+-------------------------------+------+-------------------------------+-------------------------------+--------------------------------------+
| 32077c80-3792-4a45-a957-e365bb1c9533 | default | true       | true              | Thu, 21 Jul 2022 00:19:28 UTC | [a]  | Wed, 20 Jul 2022 00:19:28 UTC | Thu, 21 Jul 2022 00:19:28 UTC | 6b0323e6-b587-4f1b-8cfc-712fc4a4781f |
| 32077c80-3792-4a45-a957-e365bb1c9533 | default | true       | true              | Thu, 21 Jul 2022 00:19:28 UTC | [a]  | Wed, 20 Jul 2022 00:19:28 UTC | Thu, 21 Jul 2022 00:19:28 UTC | 32077c80-3792-4a45-a957-e365bb1c9533 |
| d3038cd5-afd6-483b-b74c-20efea0041ea | default | true       | true              | Thu, 21 Jul 2022 00:19:47 UTC | [b]  | Wed, 20 Jul 2022 00:19:47 UTC | Thu, 21 Jul 2022 00:19:47 UTC | 32077c80-3792-4a45-a957-e365bb1c9533 |
+--------------------------------------+---------+------------+-------------------+-------------------------------+------+-------------------------------+-------------------------------+--------------------------------------+
```

You retrieve the tagged objects’ tokens and their metadata using the CLI like this:

```bash
pvault token info --tag a --collection paymentinfo
```

You should get a response similar to this:

```table
+--------------------------------------+---------+------------+-------------------+-------------------------------+------+-------------------------------+-------------------------------+--------------------------------------+
|               token_id               |  scope  | reversible | reusable_token_id |      max_expiration_time      | tags |         creation_time         |        expiration_time        |              object_id               |
+--------------------------------------+---------+------------+-------------------+-------------------------------+------+-------------------------------+-------------------------------+--------------------------------------+
| 32077c80-3792-4a45-a957-e365bb1c9533 | default | true       | true              | Thu, 21 Jul 2022 00:19:28 UTC | [a]  | Wed, 20 Jul 2022 00:19:28 UTC | Thu, 21 Jul 2022 00:19:28 UTC | 6b0323e6-b587-4f1b-8cfc-712fc4a4781f |
| 32077c80-3792-4a45-a957-e365bb1c9533 | default | true       | true              | Thu, 21 Jul 2022 00:19:28 UTC | [a]  | Wed, 20 Jul 2022 00:19:28 UTC | Thu, 21 Jul 2022 00:19:28 UTC | 32077c80-3792-4a45-a957-e365bb1c9533 |
+--------------------------------------+---------+------------+-------------------+-------------------------------+------+-------------------------------+-------------------------------+--------------------------------------+
```

Or using the REST API like this:

```bash
curl -X POST \
  -H 'Authorization: Bearer pvaultauth' \
  -H 'Content-Type: application/json' \
  -d '{ "tag": ["a"] }' \
  'http://localhost:8123/api/pvlt/1.0/data/collections/paymentinfo/query/tokens?reason=AppFunctionality'
```

You get a response similar to this:

```json
[{"token_id":"32077c80-3792-4a45-a957-e365bb1c9533","scope":"default","reusable_token_id":true,"reversible":true,"tokens":[{"tags":["a"],"creation_time":"2022-07-20T00:19:28.386427Z","expiration_time":"2022-07-21T00:19:28.400582Z","object_id":"6b0323e6-b587-4f1b-8cfc-712fc4a4781f"},{"tags":["a"],"creation_time":"2022-07-20T00:19:28.386427Z","expiration_time":"2022-07-21T00:19:28.391701Z","object_id":"32077c80-3792-4a45-a957-e365bb1c9533"}],"agg":{"max_expiration_time":"2022-07-21T00:19:28.400582Z"}}]
```

### Search tokens using multiple parameters

You may want to know what tokens exist for a combination of object IDs, token IDs, or tags. To get a list of the objects’ token IDs and token metadata:

1. Determine the object IDs, token IDs, or tags. 
2. Use the [CLI search-tokens](/cli/reference#search-tokens) command or [[REST API get tokens metadata](/api/operations/search-tokens) operation, passing the object IDs, token IDs, or tags.

#### Step-by-step

Say you want to get the metadata for all tokens for the object with the ID `32077c80-3792-4a45-a957-e365bb1c9533` and token ID `d3038cd5-afd6-483b-b74c-20efea0041ea` from the `paymentinfo` collection, where the collection contains these tokens:

```table
+--------------------------------------+---------+------------+-------------------+-------------------------------+------+-------------------------------+-------------------------------+--------------------------------------+
|               token_id               |  scope  | reversible | reusable_token_id |      max_expiration_time      | tags |         creation_time         |        expiration_time        |              object_id               |
+--------------------------------------+---------+------------+-------------------+-------------------------------+------+-------------------------------+-------------------------------+--------------------------------------+
| 32077c80-3792-4a45-a957-e365bb1c9533 | default | true       | true              | Thu, 21 Jul 2022 00:19:28 UTC | [a]  | Wed, 20 Jul 2022 00:19:28 UTC | Thu, 21 Jul 2022 00:19:28 UTC | 6b0323e6-b587-4f1b-8cfc-712fc4a4781f |
| 32077c80-3792-4a45-a957-e365bb1c9533 | default | true       | true              | Thu, 21 Jul 2022 00:19:28 UTC | [a]  | Wed, 20 Jul 2022 00:19:28 UTC | Thu, 21 Jul 2022 00:19:28 UTC | 32077c80-3792-4a45-a957-e365bb1c9533 |
| d3038cd5-afd6-483b-b74c-20efea0041ea | default | true       | true              | Thu, 21 Jul 2022 00:19:47 UTC | [b]  | Wed, 20 Jul 2022 00:19:47 UTC | Thu, 21 Jul 2022 00:19:47 UTC | 32077c80-3792-4a45-a957-e365bb1c9533 |
+--------------------------------------+---------+------------+-------------------+-------------------------------+------+-------------------------------+-------------------------------+--------------------------------------+
```

You retrieve the tokens and their metadata using the CLI like this:

```bash
pvault token info \
  --object-id 32077c80-3792-4a45-a957-e365bb1c9533 \
  --token-id d3038cd5-afd6-483b-b74c-20efea0041ea \
  --collection paymentinfo
```

You get a response similar to this:

```table
+--------------------------------------+---------+------------+-------------------+-------------------------------+------+-------------------------------+-------------------------------+--------------------------------------+
|               token_id               |  scope  | reversible | reusable_token_id |      max_expiration_time      | tags |         creation_time         |        expiration_time        |              object_id               |
+--------------------------------------+---------+------------+-------------------+-------------------------------+------+-------------------------------+-------------------------------+--------------------------------------+
| d3038cd5-afd6-483b-b74c-20efea0041ea | default | true       | true              | Thu, 21 Jul 2022 00:19:47 UTC | [b]  | Wed, 20 Jul 2022 00:19:47 UTC | Thu, 21 Jul 2022 00:19:47 UTC | 32077c80-3792-4a45-a957-e365bb1c9533 |
+--------------------------------------+---------+------------+-------------------+-------------------------------+------+-------------------------------+-------------------------------+--------------------------------------+
```
