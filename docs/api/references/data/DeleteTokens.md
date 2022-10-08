Deletes tokens. This operation is irreversible. Once the token is invalidated, any calls to [Detokenize](get) for the token result in an error and the tokenized data cannot be recovered.

The tokens to be deleted are chosen by the token query - See [Search tokens](/operations/search-tokens) for more details.

The role performing this operation must have both of the following:
- The `CapTokensWriter` capability
- At least one allowing policy and no denying policies for the `delete` operation for the `tokens` resource of the
  specified collection.

See [identity and access management](/data-security/identity-and-access-management) for more information about how
capabilities are used to control access to operations and policies are used to control access to data.