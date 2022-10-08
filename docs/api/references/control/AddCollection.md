Adds a collection.
- The collection can be provided in either the JSON or PVSchema formats (using the ContentType header)
- If successful, the collection is returned in either JSON or PVSchema formats (using the Accept header or format query parameter, default is JSON)

The role performing this operation must have the `CapCollectionsWriter` capability.
See [Access control](/data-security/identity-and-access-management#access-control) for more information about how
capabilities are used to control access to operations.