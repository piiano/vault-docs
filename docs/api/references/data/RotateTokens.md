Rotate token-id.

The tokens to be rotated are chosen by the token ID

The role performing this operation must have both of the following:
- The `CapTokensWriter` capability.
- At least one allowing policy and no denying policies for the `write` operation for the `tokens` resource of the
  specified collection.

See [identity and access management](/data-security/identity-and-access-management) for more information about how
capabilities are used to control access to operations and policies are used to control access to data.