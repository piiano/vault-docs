Returns the object property values for tokens.

The tokens to be detokenized are chosen by the token query - See [Search tokens](/operations/search-tokens) for more details.

The role performing this operation must have all the following:
- The `CapTokensDetokenizer` capability.
- Policies:
  + At least one allowing policy and no denying policies for the `detokenize` operation for each of the collection
    properties that are tokenized by tokens specified in the query.
  + At least one allowing policy and no denying policies for the `read` operation for each of the collection properties
    that are tokenized by tokens specified in the query.

See [identity and access management](/data-security/identity-and-access-management) for more information about how
capabilities are used to control access to operations and policies are used to control access to data.