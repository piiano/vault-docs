Creates tokens that reference the values of objects' properties.
The token is a randomly-generated unique ID and, therefore, is not sensitive.

Parameters:
* `object_ids` - A list of object IDs to create tokens to using the rest of of the parameters.
* `props` - List of properties to tokenize.
* `type` - There are two types of tokens `VALUE` and `POINTER`.
  * `VALUE` token will always return (when detokenizing) the original values of the object when it was tokenized, even if the object was updated since then.
  * `POINTER` token will return (when detokenizing) the latest values of the object.
* `ttl` - Time to live in seconds from now. If left empty, a default (configurable) TTL will be considered.
* `tags` - A list of tags (strings) to be attached to the token. The token can later be queried using the tags.
* `reversible` - Whether the token can be detokenized or not.
* `reuse_token_id` - If set to `true`, a `VALUE` token that holds the same information as an existing token, will receive the same ID. If set to `false`, the ID will never be reused.
* `scope` - Tokens under the same scope can have their ID reused. Tokens IDs in other scopes will not be considered for reusing.
* `fptemplate` - A template for ID generation of a certain format. Currently supported: `primary_account_number` which generates an ID with format of 16-digit PAN (credit card number). If this parameter is empty, the format of the ID is a UUID.
* `fpprops` - A list of property names to provide to the specified `fptemplate`. For `primary_account_number` only one property of type `CC_NUMBER` is required.

If this operation is called twice with the same object ID and is expected to return the same token ID (i.e. the same data is tokenized), then:
1. The token tags will be updated to the union of the previous tags and the tags of the current request.
2. If the TTL was explicitly set, then the token expiry will be updated accordingly. If not, the token expiry will be updated only if the new expiry date is after the current expiry.

The response for this operation will be an array with the length of `ObjectIDs`, where each element is the token ID correlating to the object in the same index.

To recover an object property's value from a token, use [Detokenize](/operations/detokenize).

To query and view the metadata of tokens, use [Search tokens](/operations/search-tokens).

To delete (invalidate) an existing token, use [Invalidate token](/operations/invalidate-token).

The role performing this operation must have both of the following:
- The `CapTokensWriter` capability.
- At least one allowing policy and no denying policies for the `tokenize` operation for each of the collection
  properties specified in the call.

See [identity and access management](/data-security/identity-and-access-management) for more information about how
capabilities are used to control access to operations and policies are used to control access to data.

Note: If the object ID or property name does not exist this operation fails.