Updates `tags` and `expiration` token metadata.

The tokens to be updated are chosen by the token query - See [Search tokens](/operations/search-tokens) for more details.

The role performing this operation must have both of the following:
- The `CapTokensWriter` capability.
- At least one allowing policy and no denying policies for the `write` operation for the `tokens` resource of the
  collection specified in the call.

See [identity and access management](/data-security/identity-and-access-management) for more information about how
capabilities are used to control access to operations and policies are used to control access to data.