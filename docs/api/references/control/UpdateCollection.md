Update a collection details.

The collection properties are the only editable part of the collection.
An attempt to update the collection name or type will return an error.

The properties of a collection are updated using these rules:

- New properties in the request that are not in the existing collection are added.
- Properties in the request that haven't changed from the existing collection properties are ignored.
- If the request is missing properties that exist in the existing collection these properties are ignored (not deleted).
- Properties in the request that have changed compared to the existing collection are updated to match the request.

The role that performs this operation must have the `CapCollectionsWriter` capability.
See [Access control](/data-security/identity-and-access-management#access-control) for more information about how
capabilities are used to control access to operations.

**Note**: 
Creation and modification times of the collection and properties are set automatically by the system and ignored in the input. 

**Note**: 
In the first version of the Vault, if there are properties in the request and the existing collection with content that
does not match the properties are not updated, rather this operation returns a 501, not implemented, response.