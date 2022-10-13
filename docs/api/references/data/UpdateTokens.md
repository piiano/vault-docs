Updates `tags` and `expiration` token metadata.

The tokens to update are those that match all the criteria in the `token_id`, `object_id`,  and `tag` parameters. If the token query finds no matches, the operation returns a 404 error. See [search tokens](search-tokens) for more details.

The role performing this operation must have both of these:
- The `CapTokensWriter` capability.
- At least one allowing policy and no denying policies for the `write` operation for the `tokens` resource of the collection specified in the call.

See [identity and access management](/data-security/identity-and-access-management) for more information about how capabilities are used to control access to operations and policies are used to control access to data.
