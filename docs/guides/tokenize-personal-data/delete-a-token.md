---
sidebar_position: 2.4
---

# Delete a token

## Learn how to delete a token in Piiano Vault.

When you no longer wish to provide access to a tokenized value or no longer need the token for any reason, you can delete the token. After a token is deleted, it cannot be detokenized.

### Delete by token ID

#### Overview

To delete one or more tokens:

1. Determine the token IDs, tags, or object IDs that defined the tags you want to delete.
2. Use the [CLI invalidate tokens](/cli/reference#invalidate-tokens) command or [REST API invalidate token](/api/operations/delete-tokens) operation, passing the token IDs, tags, or object IDs for the tokens you want to remove.

#### Step-by-step

You have a token with token ID: `d27923c6-5d16-41e3-89ee-118b05a25372` on the collection `paymentinfo` that you want to delete.

To delete the token, do this in the CLI:

```bash
pvault token delete \
  -t d27923c6-5d16-41e3-89ee-118b05a25372 \
  --collection paymentinfo
```

Or this, using the REST API:

```bash
curl -X DELETE \
  -H 'Authorization: Bearer pvaultauth' \
  -H 'Content-Type: application/json' \
  'http://localhost:8123/api/pvlt/1.0/data/collections/paymentinfo/tokens?token_id=d27923c6-5d16-41e3-89ee-118b05a25372&reason=AppFunctionality'
```

If the deletion is successful, you get a 200 response only.
