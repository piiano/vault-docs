Returns the object property values for tokens.

The tokens to detokenize are those matching all the criteria in the `token_id`, `object_id`,  and `tag` parameters. If the token query includes an invalid or not found token ID, the operation returns a 404 error. Otherwise, the operation returns an empty response if it finds no matches. See [search tokens](search-tokens) for more details.

The role performing this operation must have all of these:
- The `CapTokensDetokenizer` capability.
- Policies:
  + At least one allowing policy and no denying policies for the `detokenize` operation for each of the collection properties that are tokenized by tokens specified in the query.
  + At least one allowing policy and no denying policies for the `read` operation for each of the collection properties that are tokenized by tokens specified in the query.

See [identity and access management](/data-security/identity-and-access-management) for more information about how capabilities are used to control access to operations and policies are used to control access to data.
