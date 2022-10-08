Gets all collections from the Vault.
- If successful, the collections are returned in either JSON or PVSchema formats (using the Accept header or format query parameter, default is JSON).
- The PVSchema format for multiple collections is the concatenated strings of the PVSchema of each collection separated by a newline.

The role that performs this operation must have the `CapCollectionsReader` capability.
See [Access control](/data-security/identity-and-access-management#access-control) for more information about how
capabilities are used to control access to operations.
