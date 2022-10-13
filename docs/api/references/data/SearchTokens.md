Lists tokens with their metadata. 

If the token query includes an invalid or not found token ID, the operation returns a 404 error. Otherwise, if no matches are found, the operation returns an empty response. 

The role performing this operation must have all of these:
- The `CapTokensReader` capability.
- At least one allowing policy and no denying policies for the `read` operation for the `tokens` resource of the specified collection.

See [identity and access management](/data-security/identity-and-access-management) for more information about how capabilities are used to control access to operations and policies are used to control access to data.

## Token query

The tokens returned by this operation are defined using 3 query parameters. All parameters are optional, but at least one must be provided:

1. `token_id` - A list of token IDs. The operation will fail if any of the tokens don't exist, are soft deleted, or are expired.
2. `object_id` - A list of object IDs.
3. `tag` - A list of tags.

The returned tokens are those that match all of the criteria. 

Examples: 
* If only the `tag` parameter is specified, then the result is the tokens with the specified tags. 
* If only `token_id` is specified, then the result is the tokens with the requested token IDs. Because token IDs can be reused, multiple tokens can match even if only one token ID is specified. 
* If `token_id` and `object_id` are specified, then the result is the tokens with the requested token IDs that have tokenized values for the specified object IDs.