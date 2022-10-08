---
sidebar_position: 2.3
---

# Update a token

## Learn how to update a token in Piiano Vault.

Tokens include metadata that defines tags, used to classify tokens, and an expiry date. These metadata values can be updated, this guide explains how.

### Change token tags

#### Overview

You use tags to classify tokens. However, from time to time you may wish to update the tags you use, for example, to make them more meaningful.

To update the tags you:

1. Determine how to identify the tokens with the tags you want to update.

    :::note 
    The tokens to update are matched using the query parameters described in [Retrive a token](retrieve-a-token).
    :::

2. Use the [CLI update tokens](/cli/reference#update-tokens) command setting the `--new-tag` flag or the [REST API update token](/api/operations/update-tokens) operation setting the `tags` property to a comma-separated list of the new tag values you want on the tokens.

#### Step-by-step

Your system is tagging tokens added to a `paymentinfo` collection with the document name they originated from. However, you find one document has been adding the less than meaningful tag of `a`. Also, you know that all tokens originating from this document were made by the same operator and you want to include their name as a tag too. 

You update the tag values using the CLI like this:

```bash
pvault token update \
  --tag a \
  --new-tag document1,operator1337 \
  --collection paymentinfo
```

Or using the REST API like this:

```bash
curl -X PATCH \
  -H 'Authorization: Bearer pvaultauth' \
  -H 'Content-Type: application/json' \
  -d '{ "tags": [ "document1" , "operator1337" ] }' \
  'http://localhost:8123/api/pvlt/1.0/data/collections/paymentinfo/tokens?tag=a&reason=AppFunctionality'
```

If the tags update, you get a 200 response only.

### Extend token life

#### Overview

When you create a token you can set a time to live. However, you may wish to extend a token’s life. You do this by reapplying the default token time to live to one or more tokens to reset their expiry date.

To extend the life of tokens you:

1. Determine how to identify the tokens who's life you want to extend.

    :::note
    The tokens to update are matched using the query parameters described in [Retrive a token](retrieve-a-token).
    :::

2. Use the [CLI update tokens](/cli/reference#update-tokens) command setting the `--reset-expiration-time` flag or the [REST API update token](/api/operations/update-tokens) operation setting the  `reset-expiration-time` property to `true`.

#### Step-by-step

You extend the life of tokens using the CLI like this: 

```bash
pvault token update \
  --tag operator1337 \
  --ttl 604800 \
  --collection paymentinfo
```

Or using the REST API like this:

```bash
curl -X PATCH \
  -H 'Authorization: Bearer pvaultauth' \
  -H 'Content-Type: application/json' \
  -d '{ "reset_expiration_time" : true }' \
  'http://localhost:8123/api/pvlt/1.0/data/collections/paymentinfo/tokens?tag=operator1337&reason=AppFunctionality'
```

If the expiry date updates, you get a 200 response only.
