Creates tokens that reference the values of objects' properties. The token ID is partially or wholly randomly-generated and, therefore, is not sensitive.

The returned token IDs are in the same order as the object IDs in the request. No tokens are created if any object IDs are invalid or not found.

If this operation is called for an object ID and properties that have a token:
- Any token tags are appended to the existing token.
- If time to live (TTL) is specified, then the token expiry is updated. If TTL is not specified, the token expiry is updated if the default settings result in an expiry date after the token's current expiry date.

The role performing this operation must have both of these:
- The `CapTokensWriter` capability.
- At least one allowing policy and no denying policies for the `tokenize` operation for each of the collection properties specified in the call.

See [identity and access management](/data-security/identity-and-access-management) for more information about how capabilities are used to control access to operations and policies are used to control access to data.
