Returns metadata for tokens. 

The role performing this operation must have all the following:
- The `CapTokensReader` capability.
- At least one allowing policy and no denying policies for the `read` operation for the `tokens` resource of the
  specified collection.

See [identity and access management](/data-security/identity-and-access-management) for more information about how
capabilities are used to control access to operations and policies are used to control access to data.

--- 

The tokens for this operations are queried by 3 parameters. All parameters are optoinal, but at least one must be not empty.
1. `token_id` - A list of token IDs. If not empty, all the IDs must exist and be valid, otherwise the operation will error.
2. `object_id` - A list of object IDs.
3. `tag` - A list of tags.

The returned tokens are those who match the intersection of the three conditions, and are valid (i.e. not expired, and the tokenized object ID is not deleted).

Examples: 
* If only the `tag` parameter is filled, then the result will be tokens that has all the requested tags. 
* If only `token_id` is filled, then the result will be tokens with the requested token IDs. Because token IDs can be reused, multiple tokens can match even if only one token ID was requested. 
* If the both `token_id` and `object_id` are filled, then the result will be tokens with the requested token IDs, which are tokenizing the requested object IDs.