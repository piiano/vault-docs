Rotates all the KMS keys that Vault uses to encrypt properties, tokens, and more.

When the keys are rotated, new data is encrypted with the new key. All old keys are retained, so that content encrypted with previous keys can be decipherable.

The role that performs this operation must have the `CapKMSWriter` capability.
See [Access control](/data-security/identity-and-access-management#access-control) for more information about how
capabilities are used to control access to operations.