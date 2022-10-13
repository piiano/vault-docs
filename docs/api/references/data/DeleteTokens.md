Deletes tokens.

The tokens to delete are those that match all the criteria in the `token_id`, `object_id`,  and `tag` parameters. If the token query finds no matches, the operation returns a 404 error. See [search tokens](search-tokens) for more details.

Deleted tokens remain available to the [detokenize](detokenize), [update](update-tokens), and [search](search-tokens) operations, by using the ` delete ` option, until they are hard deleted with this operation or [purged](garbage-collection).

The role performing this operation must have both of these:
- The `CapTokensWriter` capability.
- At least one allowing policy and no denying policies for the `delete` operation for the `tokens` resource of the specified collection.

See [identity and access management](/data-security/identity-and-access-management) for more information about how capabilities are used to control access to operations and policies are used to control access to data.
